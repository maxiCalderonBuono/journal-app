import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { startGoogleLogin } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";
import validator from "validator";
import { setUiError, removeUiError } from "../../actions/ui";
import { startLoginWithEmailPassword } from "../../actions/auth";
import { Button } from "@chakra-ui/react";

const LoginScreen = () => {
  const dispatch = useDispatch();

  const { msgError, isLogin } = useSelector((state) => state.ui);

  const [formValues, handleInputChange] = useForm({
    email: "",
    password: "",
  });

  const { email, password } = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch(startLoginWithEmailPassword(email, password));
    }
  };

  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin());
  };

  const isFormValid = () => {
    if (!validator.isEmail(email)) {
      dispatch(setUiError("Please, introduce a valid email"));
      return false;
    } else if (password.length < 6) {
      dispatch(setUiError("Password must be at least 6 characters long"));
      return false;
    }

    dispatch(removeUiError());
    return true;
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="animate__animated animate__fadeIn animate__fast"
      >
        <h3 className="auth__title mb-5">Login</h3>
        {msgError && <div className="auth__alert-error">{msgError}</div>}
        <input
          className="auth__input"
          type="text"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleInputChange}
          autoComplete="off"
        />
        <input
          className="auth__input"
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleInputChange}
        />
        <Button
          isLoading={isLogin}
          color="white"
          loadingText="Get ready!"
          type="submit"
          bg="primary"
          borderRadius="2px"
          w="100%"
          height="32px"
          fontSize="12px"
          py="7px"
          px="10px"
          _focus={{ outline: "none" }}
          _hover={{ bg: "dark_primary" }}
        >
          Login
        </Button>

        <div className="auth__social-networks">
          <p>Login with social networks</p>
          <div className="google-btn" onClick={handleGoogleLogin}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>
        <Link className="link" to="/auth/register">
          Create new account
        </Link>
      </form>
    </>
  );
};

export default LoginScreen;
