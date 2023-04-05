import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as authService from "../../../api/authApi";

import Loading from "../../../components/spinner/Loading";
import Button from "../../../components/button/Button";

function VerifyEmail() {
  const { hashedToken, userId } = useParams();
  const navigate = useNavigate();

  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const verify = async () => {
      try {
        await authService.verifyEmail({ userId, hashedToken });
        setVerified(true);
      } catch (error) {
        console.log(error.response.data.message);
        alert(error.response.data.message);
        setInterval(() => navigate("/"), 5000);
      }
    };
    verify();
  }, [hashedToken]);

  return (
    <>
      {verified ? (
        <div className="verify-confirm">
          <i class="fa-sharp fa-solid fa-circle-check icon"></i>
          <div>Verification Completed</div>
          <div>Congratulations! You have been successfully verified</div>
          <Button onClick={() => navigate("/")}>OK</Button>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default VerifyEmail;
