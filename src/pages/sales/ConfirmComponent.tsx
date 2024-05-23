import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

const ConfirmComponent = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center mt-8">
      <Card className="w-[1090px] h-[200px] flex flex-col justify-center items-center bg-gray-100 text-xl">
        <CardHeader className="flex flex-col items-center">
          <CardTitle>Bekræftet</CardTitle>
          <CardDescription>Du har bekræftet salget</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button 
          onClick={() => navigate("/sales")}
          className="w-[200px] text-lg">
            Tilbage til salg
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
};

export default ConfirmComponent;
