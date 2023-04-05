import { useState } from "react";
import { useSelector } from "react-redux";
import { selectMe } from "../../stores/myUserSlice";

import * as constant from "../../config/constant";

import Logo from "./Logo";
import TextButton from "./TextButton";
import Button from "../../components/button/Button";
import ProfileDropdown from "./ProfileDropdown";
import Modal from "../../components/modal/Modal";
import LoginForm from "../../features/auth/loginForm/LoginForm";
import SignupForm from "../../features/auth/signupForm/SignupForm";
import ForgotPasswordForm from "../../features/auth/forgotPassword/ForgotPasswordForm";
import ResendEmail from "../../features/auth/resendEmail/ResendEmail";

function Header() {
  const [modalLoginIsOpen, setModalLoginIsOpen] = useState(false);
  const [modalSignupIsOpen, setModalSignupIsOpen] = useState(false);
  const [modalForgotIsOpen, setModalForgotIsOpen] = useState(false);
  const [modalResendVerify, setModalResendVerify] = useState(false);
  const [modalResendForgot, setModalResendForgot] = useState(false);

  const openModalLogin = () => setModalLoginIsOpen(true);
  const closeModalLogin = () => setModalLoginIsOpen(false);

  const openModalSignup = () => setModalSignupIsOpen(true);
  const closeModalSignup = () => setModalSignupIsOpen(false);

  const openModalForgot = () => setModalForgotIsOpen(true);
  const closeModalForgot = () => setModalForgotIsOpen(false);

  const openModalResendVerify = () => setModalResendVerify(true);
  const closeModalResendVerify = () => setModalResendVerify(false);

  const openModalResendForgot = () => setModalResendForgot(true);
  const closeModalResendForgot = () => setModalResendForgot(false);

  const switchToModalSignup = () => {
    closeModalLogin();
    openModalSignup();
  };

  const switchToModalLogin = () => {
    closeModalSignup();
    openModalLogin();
  };

  const switchToModalForgot = () => {
    closeModalLogin();
    openModalForgot();
  };

  const myUser = useSelector(selectMe);

  return (
    <div className="nav col-8">
      <div className="nav-container">
        <Logo />
        <div className="text-button-group">
          <TextButton name="Home" to="/" />
          <TextButton name="Find a camp" to="/findacamp" />
          <TextButton name="Blog" to="/blog" />
          <TextButton name="Join camp" to="/join" />
        </div>

        <div className="auth-button-group">
          {myUser ? (
            <ProfileDropdown />
          ) : (
            <>
              <Button name="Login" className="btn-auth-login mx-5 h-40-px" onClick={openModalLogin} />
              <Button name="Signup" className="btn-auth-signup mx-5 h-40-px" onClick={openModalSignup} />
            </>
          )}
        </div>
      </div>
      <div className="text-button-outside-group">
        <TextButton name="Home" to="/" />
        <TextButton name="Find a camp" to="/findacamp" />
        <TextButton name="Blog" to="blog" />
        <TextButton name="Join camp" to="join" />
      </div>
      <Modal header="Login" isOpen={modalLoginIsOpen} closeModal={closeModalLogin}>
        <LoginForm
          switchToModalSignup={switchToModalSignup}
          switchToModalForgot={switchToModalForgot}
          closeModalLogin={closeModalLogin}
          openModalVerify={openModalResendVerify}
        />
      </Modal>
      <Modal header="Signup" isOpen={modalSignupIsOpen} closeModal={closeModalSignup}>
        <SignupForm
          switchToModalLogin={switchToModalLogin}
          closeModalSignup={closeModalSignup}
          openModalResendVerify={openModalResendVerify}
        />
      </Modal>
      <Modal header="Forgot password" isOpen={modalForgotIsOpen} closeModal={closeModalForgot}>
        <ForgotPasswordForm closeModalForgot={closeModalForgot} openModalResendForgot={openModalResendForgot} />
      </Modal>
      <Modal header="Signup successful" isOpen={modalResendVerify} closeModal={closeModalResendVerify}>
        <ResendEmail
          type={constant.VERIFY_SIGNUP}
          title="Account Registered"
          subTitle="Please verify your email to completed registration"
          buttonText="Resend Email Verification"
        />
      </Modal>
      <Modal header="Reset password" isOpen={modalResendForgot} closeModal={closeModalResendForgot}>
        <ResendEmail
          type={constant.RESET_PASSWORD}
          title="Forgot your password?"
          subTitle="An reset password link has been sent to your email"
          buttonText="Resend Email Reset Password"
        />
      </Modal>
    </div>
  );
}

export default Header;
