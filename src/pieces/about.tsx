import "./about.scss";
import croc2 from "../assets/croc2.png";
const About = () => {
  return (
    <div className="club__about" id="about">
      <div className="club__about__header">
        <h1>ABOUT</h1>
      </div>
      <div className="club__about__content">
        <img src={croc2} />
        <p>NOT MUCH HERE YET</p>
        <p className="club__about__content--big">
          WE ARE TRYING OUR BEST TO CREATE <br /> AN "ABOUT PAGE" BUT ITS NOT
          EASY. <br /> LOOKING FORWARD TO MORE TEXT HERE. <br /> WE HOPE YOU
          ENJOY YOUR STAY, FRIEND
        </p>
      </div>
    </div>
  );
};

export default About;
