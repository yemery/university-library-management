import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const GoBack = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-2">
      <FaLongArrowAltLeft
        className="cursor-pointer"
        onClick={() => navigate(-1)}
      />
      Go back
    </div>
  );
};

export default GoBack;
