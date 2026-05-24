import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { memberList } from "./members";
import "./rolle.scss";

type RoleData = { memberKey: string; role: "morder" | "uskyldig" };

const Rolle = () => {
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [result, setResult] = useState<RoleData | null>(null);

  const handleDigit = async (d: string) => {
    if (pin.length >= 4 || loading) return;
    const next = pin + d;
    setPin(next);
    setError(false);
    if (next.length === 4) {
      setLoading(true);
      const snap = await getDoc(doc(db, "playerPins", next));
      setLoading(false);
      if (snap.exists()) {
        setResult(snap.data() as RoleData);
      } else {
        setError(true);
        setTimeout(() => setPin(""), 700);
      }
    }
  };

  if (result) {
    const isMorder = result.role === "morder";
    const name = memberList.find((m) => m.key === result.memberKey)?.name ?? "";
    return (
      <div className={`rolle-reveal rolle-reveal--${result.role}`}>
        <div className="rolle-reveal__content">
          <p className="rolle-reveal__greeting">{name}</p>
          <p className="rolle-reveal__label">du er...</p>
          <h1 className="rolle-reveal__role">
            {isMorder ? "MORDER" : "Uskyldig"}
          </h1>
          <div className="rolle-reveal__divider" />
          <p className="rolle-reveal__desc">
            {isMorder
              ? "Du er en av to mordere på denne turen. Skaff deg et våpen og begynn å eliminere de andre — men pass på at ingen ser deg."
              : "Du er en uskyldig reisende på Sicilia. Hold øynene åpne, stol ikke på alle, og finn ut hvem morderne er før det er for sent."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rolle-lock">
      <h1 className="rolle-lock__title">Din rolle</h1>
      <p className="rolle-lock__sub">Skriv inn PIN-koden du har fått</p>
      <div className={`rolle-lock__dots${error ? " rolle-lock__dots--error" : ""}${loading ? " rolle-lock__dots--loading" : ""}`}>
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={`rolle-lock__dot${i < pin.length ? " rolle-lock__dot--filled" : ""}`} />
        ))}
      </div>
      <div className="rolle-lock__pad">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((d) => (
          <button key={d} className="rolle-lock__key" onClick={() => handleDigit(d)}>{d}</button>
        ))}
        <span className="rolle-lock__key rolle-lock__key--empty" />
        <button className="rolle-lock__key" onClick={() => handleDigit("0")}>0</button>
        <button className="rolle-lock__key rolle-lock__key--back" onClick={() => setPin((p) => p.slice(0, -1))}>⌫</button>
      </div>
    </div>
  );
};

export default Rolle;
