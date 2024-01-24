import React from "react";
import logo from "/src/assets/images/logo.png"
const Logo = () => {
  return (
    <>
      <a href="/" className="flex ms-2 md:me-24">
        <img
          src={logo}
          className="h-8 me-3"
          alt="Logo"
        />
        <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
          FARMBOOK CAO
        </span>
      </a>
    </>
  );
};

export default Logo;
