import React from "react";
import img from "../assets/facebook-text.png";
import { MdAccountCircle } from "react-icons/md";

// import { Container } from './styles';

export default function Header() {
  return (
    <header>
      <img src={img} className="image-header"></img>

      <div className={"text-header"}>
        Meu Perfil
        <MdAccountCircle className="icon-account" />
      </div>
    </header>
  );
}
