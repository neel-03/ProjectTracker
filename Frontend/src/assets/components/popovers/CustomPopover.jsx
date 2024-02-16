import React from "react";

export default function CustomPopover({ title, description }) {
  return (
    <>
      <h4 style={{ color: "#34c2ff" }}>{title}</h4>
      <br />
      <b>{description}</b>
    </>
  );
}
