import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="not-found-page">
      <div className="item-1">404</div>
      <div className="item-2">Oops, page not found</div>
      <div className="item-3">
        It’s looking like you may have taken a wrong turn. Don’t worry ... It happen to the most of us
      </div>
      <Button name="GO BACK TO HOMEPAGE" onClick={() => navigate("/")}></Button>
    </div>
  );
}

export default NotFound;
