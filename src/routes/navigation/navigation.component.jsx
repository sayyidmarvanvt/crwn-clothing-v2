import { Fragment, useContext } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { UserContext } from "../../context/user.context";
import "./navigation.styles.scss";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { ReactComponent as CrownLogo } from "../../assets/crown.svg";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const location = useLocation();
  const isSignInPage = location.pathname === "/sign-in";
  const signOutHandler = async () => {
    await signOutUser();
  };

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrownLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutHandler}>
              SIGN OUT
            </span>
          ) : (
            <Link
              className="nav-link"
              to={isSignInPage ? "/sign-up" : "/sign-in"}
            >
              {isSignInPage ? "SIGN UP" : "SIGN IN"}
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
