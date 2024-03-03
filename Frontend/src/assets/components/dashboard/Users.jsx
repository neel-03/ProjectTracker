import React from "react";
import MyNavbar from "../Navbar";

export default function Users({ user, active }) {
  return (
    <>
      <MyNavbar user={user} active={active} />
      <div>Users</div>
    </>
  );
}
