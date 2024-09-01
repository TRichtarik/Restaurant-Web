import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import logo from "../assets/images/coronaLogo.png";
import menuIcon from "../assets/icons/menu-svgrepo-com.svg";

type MenuLinkProps = {
  title: string;
  route: string;
  closeMenu: () => void;
};

const MenuLink: FC<MenuLinkProps> = ({ title, route, closeMenu }) => {
  return (
    <li onClick={closeMenu}>
      <Link
        to={route}
        className="block py-2 pl-3 pr-4 text-gray-900 md:hover:text-blue-700 md:p-0"
      >
        {title}
      </Link>
    </li>
  );
};

const NavigationBar: FC = () => {
  const { auth } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="relative">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-5">
        <Link to="/" className="flex items-center">
          <img src={logo} className="h-20 mr-6" alt="Corona Logo" />
          <span className="self-center text-4xl font-bold">Corona</span>
        </Link>

        <button
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 "
          onClick={toggleMenu}
        >
          <img src={menuIcon} alt="menu" className="w-6 h-6" />
        </button>

        <div
          className={`absolute top-0 right-0 h-full w-64 bg-white transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"} transition-transform  md:relative md:translate-x-0 md:w-auto md:bg-transparent md:shadow-none`}
        >
          <ul className="text-2xl font-bold flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent">
            <MenuLink route="homepage" title="Home" closeMenu={closeMenu} />
            <MenuLink route="restaurant" title="Restaurants" closeMenu={closeMenu} />
            <MenuLink route="order" title="My order" closeMenu={closeMenu} />
            <MenuLink route="account" title="Account" closeMenu={closeMenu} />
            {auth && auth.role === "MANAGER" ? (
              <MenuLink route="manager" title="Manager" closeMenu={closeMenu} />
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
