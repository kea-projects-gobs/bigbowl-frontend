import bowling from "../../assets/bowling.png";
import dining from "../../assets/dining.png";
import airhockey from "../../assets/airhockey.png";

export default function LandingPage() {
  return (
    <div>
      <div>
        <h1 className="text-4xl font-bold text-center pb-5">Vi tilbyder</h1>
      </div>
      <div className="grid grid-cols-3">
        <div>
          <img className="image" src={bowling} alt="" />
          <h2 className="text-2xl font-bold text-center">Bowling</h2>
        </div>
        <div>
          <img className="px-2 image" src={airhockey} alt="" />
          <h2 className="text-2xl font-bold text-center">Air hockey</h2>
        </div>
        <div>
          <img className="image" src={dining} alt="" />
          <h2 className="text-2xl font-bold text-center">Spisning</h2>
        </div>
      </div>
    </div>
  );
}
