import { useState } from "react";
import Button from "../../components/button/button.component";
import FormInput from "../../components/form-input/form-input.component";
import "./sign-in-form.styles.scss";
import { Link } from "react-router-dom";
import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(email, password);
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
    await signInWithGooglePopup();
  };

  return (
    <div className="authentication-container">
      <div className="sign-in-container">
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
          <div className="buttons-container">
            <Button type="submit">Sign IN</Button>
            <Button
              type="button"
              onClick={signInWithGoogle}
              buttonType="google"
            >
              Sign IN With Google
            </Button>
          </div>
        </form>
        <div className="toggle-container">
          <p>Don't have an account?</p>
          <Link className="toggle-link" to="/sign-up">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
