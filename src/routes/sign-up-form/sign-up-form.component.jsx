import { useState } from "react";
import FormInput from "../../components/form-input/form-input.component";
import "./sign-up-form.styles.jsx";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../components/button/button.component";
import { useNavigate } from "react-router-dom";
import {
  AuthenticationContainer,
  SignUpContainer,
  ButtonsContainer,
  ToggleContainer,
  ToggleLink,
} from "./sign-up-form.styles";
import { useDispatch } from "react-redux";
import {
  googleSignInStart,
  signUpStart,
} from "../../store/user/user.action.js";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const navigate = useNavigate();
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("password do not match");
      return;
    }
    try {
      dispatch(signUpStart(email, password, displayName));
      resetFormFields();
      navigate("/sign-in");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Email already in use");
      } else {
        console.log("user creation error", error);
      }
    }
  };

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
    navigate("/");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <AuthenticationContainer>
      <SignUpContainer>
        <h2>Don't have an account</h2>
        <span>Sign up with your email and password</span>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Display Name"
            type="text"
            required
            onChange={handleChange}
            name="displayName"
            value={displayName}
          />
          <FormInput
            label="Email"
            type="email"
            required
            onChange={handleChange}
            name="email"
            value={email}
          />
          <FormInput
            label="Password"
            type="password"
            required
            onChange={handleChange}
            name="password"
            value={password}
          />
          <FormInput
            label="Confirm Password"
            type="password"
            required
            onChange={handleChange}
            name="confirmPassword"
            value={confirmPassword}
          />
          <ButtonsContainer>
            <Button type="submit">Sign Up</Button>
            <Button
              type="button"
              onClick={signInWithGoogle}
              buttonType={BUTTON_TYPE_CLASSES.google}
            >
              Sign In With Google
            </Button>
          </ButtonsContainer>
        </form>
        <ToggleContainer>
          <p>Have an account?</p>
          <ToggleLink to="/sign-in">Sign in</ToggleLink>
        </ToggleContainer>
      </SignUpContainer>
    </AuthenticationContainer>
  );
};

export default SignUpForm;
