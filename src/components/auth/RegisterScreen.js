import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import validator from "validator";
import { useDispatch, useSelector } from "react-redux";
import { setUiError, removeUiError } from "../../actions/ui";
import { registerWithEmailPassword } from "../../actions/auth";
import { Button } from "@chakra-ui/react";

const RegisterScreen = () => {
  const initialUser = {
    nick: "",
    name: "",
    lastname: "",
    email: "",
    password: "",
    password2: "",
    dni: "",
    birthday: "",
    phone: "",
  };

  const [formValues, handleInputChange, reset] = useForm(initialUser);

  const {
    nick,
    name,
    lastname,
    email,
    password,
    password2,
    dni,
    birthday,
    phone,
  } = formValues;

  const dispatch = useDispatch();
  const { msgError, isLogin } = useSelector((state) => state.ui);

  const handleRegister = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      dispatch(registerWithEmailPassword(email, password, name));
      reset();
    }
  };

  const [focus, setFocus] = useState(false);

  const isFormValid = () => {
    // validator.isEmpty(name , { ignore_whitespace: true })
    if (name.trim().length < 2) {
      dispatch(setUiError("Please, introduce a complete name"));
      return false;
    } else if (lastname.trim().length < 2) {
      dispatch(setUiError("Please, introduce a complete surname"));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setUiError("Please, introduce a valid email"));
      return false;
    } else if (password !== password2 || password.length < 6) {
      dispatch(setUiError("Password must be at least 6 characters long"));
      return false;
    } else if (validator.isAfter(birthday)) {
      dispatch(setUiError("Date cannot be equal or greater than current day"));
      return false;
    } else if (validator.isEmpty(dni.toString(), { ignore_whitespace: true })) {
      dispatch(setUiError("ID muts be a valid combinaion of numbers"));
      return false;
    }

    dispatch(removeUiError());
    return true;
  };

  return (
    <>
      <form
        onSubmit={handleRegister}
        className="animate__animated animate__fadeIn animate__fast"
      >
        <h3 className="auth__title mb-5">Register</h3>

        {msgError && <div className="auth__alert-error">{msgError}</div>}
        <input
          className="auth__input"
          type="text"
          placeholder="Nick"
          name="nick"
          autoComplete="off"
          onChange={handleInputChange}
          value={nick}
          required
        />
        <input
          className="auth__input"
          type="text"
          placeholder="Name"
          name="name"
          autoComplete="off"
          onChange={handleInputChange}
          value={name}
          required
        />
        <input
          className="auth__input"
          type="text"
          placeholder="LastName"
          name="lastname"
          autoComplete="off"
          onChange={handleInputChange}
          value={lastname}
          required
        />
        <input
          className="auth__input"
          type="email"
          placeholder="Email"
          name="email"
          autoComplete="off"
          onChange={handleInputChange}
          value={email}
          required
        />
        <input
          className="auth__input"
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleInputChange}
          value={password}
          required
        />
        <input
          className="auth__input"
          type="password"
          placeholder="Repeat your password"
          name="password2"
          onChange={handleInputChange}
          value={password2}
          required
        />
        <input
          className="auth__input"
          type="number"
          placeholder="DNI"
          name="dni"
          autoComplete="off"
          onChange={handleInputChange}
          value={dni}
          required
        />
        <input
          className="auth__input"
          type={focus ? "date" : "text"}
          onFocus={() => setFocus(!focus)}
          placeholder="Birthday"
          name="birthday"
          autoComplete="off"
          onChange={handleInputChange}
          value={birthday}
          required
        />
        <input
          className="auth__input"
          type="tel"
          placeholder="Phone"
          name="phone"
          onChange={handleInputChange}
          value={phone}
          required
        />

        <Button
          isLoading={isLogin}
          loadingText="Get ready!"
          color="white"
          type="submit"
          bg="primary"
          borderRadius="2px"
          w="100%"
          height="32px"
          fontSize="12px"
          py="7px"
          px="10px"
          mb="20px"
          _focus={{ outline: "none" }}
          _hover={{ bg: "dark_primary" }}
        >
          Register
        </Button>

        <Link className="link" to="/auth/login">
          Already registered?
        </Link>
      </form>
    </>
  );
};

export default RegisterScreen;
