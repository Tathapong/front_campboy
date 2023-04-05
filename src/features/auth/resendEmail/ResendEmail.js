import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import Button from "../../../components/button/Button";
import { getResendEmail } from "../../../utilities/localStorage";
import * as authService from "../../../api/authApi";
import * as constant from "../../../config/constant";

function ResendEmail(props) {
  const { title, subTitle, buttonText, type } = props;

  const [disabled, setDisabled] = useState(false);
  const [timer, setTimer] = useState("");
  const email = getResendEmail();

  useEffect(() => {
    let id;
    if (disabled) {
      if (timer > 0) {
        id = setInterval(() => {
          setTimer((prev) => prev - 1);
        }, 1000);
      } else {
        setDisabled(false);
        setTimer("");
        clearInterval(id);
      }
    }
    return () => clearInterval(id);
  }, [timer]);

  const handleResendEmail = async () => {
    try {
      setDisabled(true);
      await authService.sendEmail({ email, type });

      if (type === constant.VERIFY_SIGNUP) toast.success("Verification email have sent");
      else if (type === constant.RESET_PASSWORD) toast.success("Reset password have sent to your email");

      setTimer(60);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
  return (
    <div className="verify-auth-form">
      <i class="fa-sharp fa-solid fa-circle-check icon"></i>
      <div className="email">{email}</div>
      <div>{title}</div>
      <div>{subTitle}</div>
      {disabled ? <div>{timer}</div> : ""}
      <Button className={disabled ? "btn-disabled" : ""} disabled={disabled} onClick={handleResendEmail}>
        {buttonText}
      </Button>
    </div>
  );
}

export default ResendEmail;
