import { Fragment } from "react";
import { Outlet, useLocation } from "react-router-dom";
import {
  NavigationContainer,
  LogoContainer,
  NavLink,
  NavLinks,
} from "./navigation.styles";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { ReactComponent as CrownLogo } from "../../assets/crown.svg";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);

  const signOutHandler = async () => {
    await signOutUser();
  };

  const location = useLocation();
  const isSignInPage = location.pathname === "/sign-in";
  const isCheckoutPage = location.pathname === "/checkout";

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrownLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={signOutHandler}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to={isSignInPage ? "/sign-up" : "/sign-in"}>
              {isSignInPage ? "SIGN UP" : "SIGN IN"}
            </NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && !isCheckoutPage && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
