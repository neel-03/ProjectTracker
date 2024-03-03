import React from "react";
import MyNavbar from "../Navbar";

export default function Projects({ user, active }) {
  return (
    <>
      <MyNavbar user={user} active={active} />
      <div>Projects</div>
    </>
  );
}
