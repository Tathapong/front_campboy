import { useState } from "react";
import { useSelector } from "react-redux";
import { selectMe } from "../../stores/myUserSlice";

import Button from "../../components/button/Button";
import Modal from "../../components/modal/Modal";

import Logo from "./Logo";
import TextButton from "./TextButton";
import ProfileDropdown from "./ProfileDropdown";

import LoginForm from "../../features/auth/loginForm/LoginForm";
import SignupForm from "../../features/auth/signup/SignupForm";
import ForgotPasswordForm from "../../features/auth/forgotPassword/ForgotPasswordForm";
import ResendEmail from "../../features/auth/resendEmail/ResendEmail";

import * as constant from "../../config/constant";

function Header() {
  const [modalLoginIsOpen, setModalLoginIsOpen] = useState(false);
  const [modalSignupIsOpen, setModalSignupIsOpen] = useState(false);
  const [modalForgotIsOpen, setModalForgotIsOpen] = useState(false);
  const [modalResendVerify, setModalResendVerify] = useState(false);
  const [modalResendForgot, setModalResendForgot] = useState(false);

  function openModalLogin() {
    setModalLoginIsOpen(true);
  }
  function closeModalLogin() {
    setModalLoginIsOpen(false);
  }

  function openModalSignup() {
    setModalSignupIsOpen(true);
  }
  function closeModalSignup() {
    setModalSignupIsOpen(false);
  }

  function openModalForgot() {
    setModalForgotIsOpen(true);
  }
  function closeModalForgot() {
    setModalForgotIsOpen(false);
  }

  function openModalResendVerify() {
    setModalResendVerify(true);
  }
  function closeModalResendVerify() {
    setModalResendVerify(false);
  }

  function openModalResendForgot() {
    setModalResendForgot(true);
  }
  function closeModalResendForgot() {
    setModalResendForgot(false);
  }

  function switchToModalSignup() {
    closeModalLogin();
    openModalSignup();
  }

  function switchToModalLogin() {
    closeModalSignup();
    openModalLogin();
  }

  function switchToModalForgot() {
    closeModalLogin();
    openModalForgot();
  }

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

      <Modal header="Login" className="modal-login" isOpen={modalLoginIsOpen} closeModal={closeModalLogin}>
        <LoginForm
          switchToModalSignup={switchToModalSignup}
          switchToModalForgot={switchToModalForgot}
          closeModalLogin={closeModalLogin}
          openModalVerify={openModalResendVerify}
        />
      </Modal>

      <Modal header="Signup" className="modal-signup" isOpen={modalSignupIsOpen} closeModal={closeModalSignup}>
        <SignupForm
          switchToModalLogin={switchToModalLogin}
          closeModalSignup={closeModalSignup}
          openModalResendVerify={openModalResendVerify}
        />
      </Modal>

      <Modal
        header="Forgot password"
        className="modal-forgot-password"
        isOpen={modalForgotIsOpen}
        closeModal={closeModalForgot}
      >
        <ForgotPasswordForm closeModalForgot={closeModalForgot} openModalResendForgot={openModalResendForgot} />
      </Modal>

      <Modal
        header="Signup successful"
        className="modal-resend-email"
        isOpen={modalResendVerify}
        closeModal={closeModalResendVerify}
      >
        <ResendEmail
          type={constant.VERIFY_SIGNUP}
          title="Account Registered"
          subTitle="Please verify your email to completed registration"
          buttonText="Resend Email Verification"
        />
      </Modal>

      <Modal
        header="Reset password"
        className="modal-resend-email"
        isOpen={modalResendForgot}
        closeModal={closeModalResendForgot}
      >
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
