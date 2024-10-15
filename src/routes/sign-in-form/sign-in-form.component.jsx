import { useState } from "react";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../components/button/button.component";
import FormInput from "../../components/form-input/form-input.component";
import {
  AuthenticationContainer,
  SignInContainer,
  ButtonsContainer,
  ToggleContainer,
  ToggleLink,
} from "./sign-in-form.styles";

import { useDispatch } from "react-redux";
import { emailSignInStart, googleSignInStart } from "../../store/user/user.action";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const dispatch = useDispatch();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      dispatch(emailSignInStart(email, password));
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          alert("Wrong user");
          break;
        case "auth/invalid-credential":
          alert("Wrong password");
          break;
        default:
          console.log(error);
      }
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormFields((prevFormFields) => ({ ...prevFormFields, [name]: value }));
  };

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
  };

  return (
    <AuthenticationContainer>
      <SignInContainer>
        <h2>Already have an account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={handleSubmit}>
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
          <ButtonsContainer>
            <Button type="submit">Sign IN</Button>
            <Button
              type="button"
              onClick={signInWithGoogle}
              buttonType={BUTTON_TYPE_CLASSES.google}
            >
              Sign IN With Google
            </Button>
          </ButtonsContainer>
        </form>
        <ToggleContainer>
          <p>Don't have an account?</p>
          <ToggleLink to="/sign-up">Sign up</ToggleLink>
        </ToggleContainer>
      </SignInContainer>
    </AuthenticationContainer>
  );
};

export default SignInForm;
