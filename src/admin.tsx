import { useState, useEffect } from "react";
import { doc, onSnapshot, updateDoc, collection, writeBatch, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { memberList, MemberStatuses } from "./members";
import "./admin.scss";

const ADMIN_PIN = "1349";

const gameDoc = () => doc(db, "game", "members");

type Assignment = { pin: string; role: "morder" | "uskyldig" };
type Assignments = Record<string, Assignment>;

const Admin = () => {
  const [pin, setPin] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);
  const [adminTab, setAdminTab] = useState<"status" | "roller">("status");
  const [statuses, setStatuses] = useState<MemberStatuses>({});
  const [assignments, setAssignments] = useState<Assignments>({});
  const [generating, setGenerating] = useState(false);
  const [generateError, setGenerateError] = useState("");

  useEffect(() => {
    if (!unlocked) return;

    const unsubStatus = onSnapshot(gameDoc(), (snap) => {
      if (snap.exists()) setStatuses(snap.data() as MemberStatuses);
    });

    const unsubRoller = onSnapshot(collection(db, "playerRoles"), (snap) => {
      const data: Assignments = {};
      snap.forEach((d) => { data[d.id] = d.data() as Assignment; });
      setAssignments(data);
    });

    return () => { unsubStatus(); unsubRoller(); };
  }, [unlocked]);

  const handleDigit = (d: string) => {
    if (pin.length >= 4) return;
    const next = pin + d;
    setPin(next);
    setError(false);
    if (next.length === 4) {
      if (next === ADMIN_PIN) {
        setUnlocked(true);
      } else {
        setError(true);
        setTimeout(() => setPin(""), 700);
      }
    }
  };

  const toggleStatus = async (key: string) => {
    await updateDoc(gameDoc(), { [key]: !statuses[key] });
  };

  const generateAll = async () => {
    setGenerating(true);
    setGenerateError("");
    try {
      const batch = writeBatch(db);

      const existingPins = await getDocs(collection(db, "playerPins"));
      existingPins.forEach((d) => batch.delete(d.ref));

      const shuffled = [...memberList].sort(() => Math.random() - 0.5);
      const murderers = new Set([shuffled[0].key, shuffled[1].key]);
      const usedPins = new Set<string>();

      for (const { key } of memberList) {
        let memberPin: string;
        do {
          memberPin = Math.floor(1000 + Math.random() * 9000).toString();
        } while (usedPins.has(memberPin));
        usedPins.add(memberPin);

        const role: "morder" | "uskyldig" = murderers.has(key) ? "morder" : "uskyldig";
        batch.set(doc(db, "playerRoles", key), { pin: memberPin, role });
        batch.set(doc(db, "playerPins", memberPin), { memberKey: key, role });
      }

      await batch.commit();
    } catch (e) {
      setGenerateError("Feil: " + (e instanceof Error ? e.message : String(e)));
    }
    setGenerating(false);
  };

  const toggleRole = async (key: string) => {
    const current = assignments[key];
    if (!current) return;
    const newRole: "morder" | "uskyldig" = current.role === "morder" ? "uskyldig" : "morder";
    const batch = writeBatch(db);
    batch.update(doc(db, "playerRoles", key), { role: newRole });
    batch.update(doc(db, "playerPins", current.pin), { role: newRole });
    await batch.commit();
  };

  if (!unlocked) {
    return (
      <div className="admin-lock">
        <h1 className="admin-lock__title">Admin</h1>
        <div className={`admin-lock__dots${error ? " admin-lock__dots--error" : ""}`}>
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className={`admin-lock__dot${i < pin.length ? " admin-lock__dot--filled" : ""}`} />
          ))}
        </div>
        <div className="admin-lock__pad">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((d) => (
            <button key={d} className="admin-lock__key" onClick={() => handleDigit(d)}>{d}</button>
          ))}
          <span className="admin-lock__key admin-lock__key--empty" />
          <button className="admin-lock__key" onClick={() => handleDigit("0")}>0</button>
          <button className="admin-lock__key admin-lock__key--back" onClick={() => setPin((p) => p.slice(0, -1))}>⌫</button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin">
      <nav className="admin__tabs">
        <button className={`admin__tab${adminTab === "status" ? " admin__tab--active" : ""}`} onClick={() => setAdminTab("status")}>Status</button>
        <button className={`admin__tab${adminTab === "roller" ? " admin__tab--active" : ""}`} onClick={() => setAdminTab("roller")}>Roller</button>
      </nav>

      {adminTab === "status" && (
        <div className="admin__list">
          {memberList.map(({ name, key }) => {
            const dead = statuses[key] ?? false;
            return (
              <button key={key} className={`admin__row${dead ? " admin__row--dead" : ""}`} onClick={() => toggleStatus(key)}>
                <span className="admin__name">{name}</span>
                <span className="admin__status">{dead ? "Død" : "I live"}</span>
              </button>
            );
          })}
        </div>
      )}

      {adminTab === "roller" && (
        <div className="admin__roller">
          <button className="admin__generate" onClick={generateAll} disabled={generating}>
            {generating ? "Genererer..." : "Generer roller + PINs tilfeldig"}
          </button>
          {generateError && <p className="admin__error">{generateError}</p>}
          <div className="admin__list">
            {memberList.map(({ name, key }) => {
              const a = assignments[key];
              const isMorder = a?.role === "morder";
              return (
                <div key={key} className={`admin__row admin__row--info${isMorder ? " admin__row--morder" : ""}`}>
                  <span className="admin__name">{name}</span>
                  <div className="admin__row-right">
                    <span className={`admin__status${isMorder ? " admin__status--morder" : ""}`}>
                      {a ? (isMorder ? "Morder" : "Uskyldig") : "—"}
                    </span>
                    {a && <span className="admin__pin">{a.pin}</span>}
                    {a && (
                      <button className="admin__toggle" onClick={() => toggleRole(key)}>↕</button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
