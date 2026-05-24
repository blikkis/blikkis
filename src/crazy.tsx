import "./crazy.scss";
import crazy from "./assets/IMG_6654.png";
import calm from "./assets/bear.png";
import bb from "./assets/bb.svg";
const Club = () => {
  return (
    <div className="all">
      <div className="crazy">
        <a
          className="part1"
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(255, 0, 0, 0.3), rgba(255, 0, 0, 0.3)), url(${crazy})`,
            backgroundSize: "cover",
          }}
          href="http://www.hjet.land"
        >
          <h1>FØLER DU DEG GÆRN?</h1>
        </a>
        <a
          className="part2"
          style={{
            backgroundImage: `linear-gradient(0deg, rgb(60, 179, 113, 0.3), rgb(60, 179, 113, 0.3)), url(${calm})`,
            backgroundSize: "cover",
          }}
          href="http://www.bustbyte.no"
        >
          <h1>ELLER BARE LURER DU PÅ NOE?</h1>
        </a>
      </div>
      <div className="bb">
        <img src={bb} />
      </div>
    </div>
  );
};

export default Club;
