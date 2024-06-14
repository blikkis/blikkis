import "./vision.scss";
import croc1 from "../assets/croc3.png";
import croc2 from "../assets/croc4.png";

const Vision = () => {
  return (
    <div className="club__vision" id="vision">
      <div className="club__vision__header">
        <h1>VISION</h1>
      </div>
      <div className="club__vision__content">
        <div className="club__vision__content__images">
          <img src={croc1} className="club__vision__content__images--croc1" />
          <img src={croc2} className="club__vision__content__images--croc2" />
        </div>
        <div className="club__vision__content__text">
          <p>
            CREATING AN ENVIRONMENT FOR <br /> EXCELLENT SOFTWARE DEVELOPMENT.{" "}
            <br /> BY THE BEST <br /> FOR THE BEST
          </p>
        </div>
      </div>
    </div>
  );
};

export default Vision;
