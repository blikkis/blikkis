import { useState, useEffect } from "react";
import { doc, onSnapshot, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { memberList, defaultStatuses, MemberStatuses } from "./members";
import "./mysteriet.scss";

import oscar from "./assets/oscar.png";
import mike from "./assets/mike.png";
import vikanes from "./assets/vikanes.png";
import tutt from "./assets/tutt.png";
import fosse from "./assets/fosse.png";
import annema from "./assets/annema.png";
import lars from "./assets/lars.png";
import affen from "./assets/affen.png";
import fred from "./assets/fred.png";
import syver from "./assets/syver.png";
import sondre from "./assets/sondre.png";
import hanna from "./assets/hanna.png";
import bjærn from "./assets/bjærn.png";
import simen from "./assets/simen.png";

const images: Record<string, string> = {
  oscar, mike, vikanes, tutt, fosse, annema, lars,
  affen, fred, syver, sondre, hanna, bjærn, simen,
};

const gameDoc = () => doc(db, "game", "members");

const Mysteriet = () => {
  const [tab, setTab] = useState<"info" | "status">("info");
  const [statuses, setStatuses] = useState<MemberStatuses>(defaultStatuses);

  useEffect(() => {
    getDoc(gameDoc()).then((snap) => {
      if (!snap.exists()) setDoc(gameDoc(), defaultStatuses);
    });

    return onSnapshot(gameDoc(), (snap) => {
      if (snap.exists()) setStatuses(snap.data() as MemberStatuses);
    });
  }, []);

  return (
    <div className="mysteriet">
      <div className="mysteriet__blood-top" />

      <header className="mysteriet__hero">
        <p className="mysteriet__eyebrow">En kveld du aldri vil glemme</p>
        <h1 className="mysteriet__title">Mysteriet<br />på Sicilia</h1>
        <div className="mysteriet__divider" />
        <p className="mysteriet__tagline">[Undertittel / dato / sted kommer her]</p>
      </header>

      <nav className="mysteriet__tabs">
        <button
          className={`mysteriet__tab ${tab === "info" ? "mysteriet__tab--active" : ""}`}
          onClick={() => setTab("info")}
        >
          Info
        </button>
        <button
          className={`mysteriet__tab ${tab === "status" ? "mysteriet__tab--active" : ""}`}
          onClick={() => setTab("status")}
        >
          Status
        </button>
      </nav>

      {tab === "info" && (
        <main className="mysteriet__content">
          <section className="mysteriet__section">
            <h2>Hva skjedde?</h2>
            <p>14 unge programmerere skulle glad og lykkelig på tur til Sicilia, men lite viste de at det var to mordere blant de.. 👀 Klarer de tolv andre å finne ut av hvem morderne er før de alle er borte? La oss håpe det</p>
          </section>

          <section className="mysteriet__section">
            <h2>Slik spiller du</h2>
            <p>To personer vil snart få beskjed om at de er morderne. Resten vil være de uskyldige på reisen. Hva er det morderne gjør? Først og fremst må de skaffe seg et våpen, og ha en måte å tydelig bruke det våpenet. Eksempler kan være at de har en vannpistol og sier "pang pang" eller at de har en tryllestav og sier "Avada kadavra" og "du er død". Dette kan kun skje når morderen er helt alene med en av de uskyldige reisende - for om det er et vitne til drapet, så kan de sladre. Simen var det uheldige første offeret, og har gjenoppstått som gjenferd og game master. Det er denne personen et vitne kan sladre til, som vil føre til at Simen tar sin hevn på morderen, og morderen selv dør. Alt må selvfølgelig skje i person. Morderne må si i person til Simen at de dør. Hvem som helst har lov til å kalle inn til et EMERGENCY MEETING hvor man kan stemme ut noen. Dette kan dog bare skje to ganger i løpet av turen, og alle levende får en stemme hver.</p>
          </section>

          <a href="/rolle" className="mysteriet__rolle-link">
            Sjekk din rolle
          </a>
        </main>
      )}

      {tab === "status" && (
        <main className="mysteriet__content">
          <div className="mysteriet__grid">
            {memberList.map(({ name, key }) => {
              const dead = statuses[key] ?? false;
              return (
                <div key={key} className={`mysteriet__profile${dead ? " mysteriet__profile--dead" : ""}`}>
                  <img className="mysteriet__profile-photo" src={images[key]} alt={name} />
                  <span className="mysteriet__profile-name">{name}</span>
                  <span className={`mysteriet__profile-status${dead ? " mysteriet__profile-status--dead" : ""}`}>
                    {dead ? "Død" : "I live"}
                  </span>
                </div>
              );
            })}
          </div>
        </main>
      )}

      <footer className="mysteriet__footer">
        <div className="mysteriet__blood-bottom" />
        <p>Ingen er uskyldig.</p>
      </footer>
    </div>
  );
};

export default Mysteriet;
