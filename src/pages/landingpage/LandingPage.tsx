import bowling from "@/assets/bowling.png";
import dining from "@/assets/dining.png";
import airhockey from "@/assets/airhockey.png";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <h1 className="pb-5 text-4xl font-bold text-center">Vi tilbyder</h1>
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
          <h2 className="text-2xl font-bold text-center">Middag</h2>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <Button className="py-6 text-3xl" onClick={() => navigate("/booking")}>
          Reservér nu
        </Button>
      </div>
    </div>
  );
}
