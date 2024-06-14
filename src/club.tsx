import "./club.scss";
import About from "./pieces/about";
import Bottom from "./pieces/bottom";
import Croc from "./pieces/croc";
import Menu from "./pieces/menu";
import Top from "./pieces/top";
import Vision from "./pieces/vision";

const Club = () => {
  return (
    <div className="club">
      <Top />
      <Menu />
      <About />
      <Vision />
      <Croc />
      <Bottom />
    </div>
  );
};

export default Club;
