import "./top.scss";
import croc from "../assets/croc.png";
const Top = () => {
  return (
    <div className="club__top" id="top">
      <div className="club__top__headline">
        <h1>
          BLIKKIS <br /> CLUB
        </h1>
        <p className="club__top__headline--blinker">WE ARE BACK</p>
      </div>
      <div className="club__top__image">
        <img src={croc} />
      </div>
    </div>
  );
};
export default Top;
