import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import SignUpForm from "./routes/sign-up-form/sign-up-form.component";
import SignInForm from "./routes/sign-in-form/sign-in-form.component";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="/sign-up" element={<SignUpForm />} />
          <Route path="/sign-in" element={<SignInForm />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
