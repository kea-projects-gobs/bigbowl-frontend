import { useNavigate } from "react-router-dom";

const ConfirmComponent = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button
        onClick={() => {
          navigate("/sales");
        }}
      >
        Gå tilbage til salg
      </button>
    </div>
  );
};

export default ConfirmComponent;
