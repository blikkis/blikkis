import "./croc.scss";
import bigcroc from "../assets/croc5.png";
const Croc = () => {
  return (
    <div className="club__croc" id="croc">
      <div className="club__croc__header">
        <h1>CROC</h1>
      </div>
      <div className="club__croc__content">
        <img src={bigcroc} className="club__croc__content__image" />
      </div>
    </div>
  );
};
export default Croc;
