import "./croc.scss";
import bigcroc from "../assets/marocroc.png";
const Croc = () => {
  return (
    <div className="club__croc" id="croc">
      <div className="club__croc__header">
        <h1>MAROCROC</h1>
      </div>
      <div className="club__croc__content">
        <img src={bigcroc} className="club__croc__content__image" />
      </div>
      <div className="club__croc__explanation">
        <p>
          A VERY RARE CROC IN MAROCCO. YOU DON'T KNOW HOW LUCKY YOU ARE TO SEE
          THIS CROC. <br />
          PHOTO BY 'RØNNA' DIRECTLY FROM MAROCCO. ENJOY.
        </p>
      </div>
    </div>
  );
};
export default Croc;
