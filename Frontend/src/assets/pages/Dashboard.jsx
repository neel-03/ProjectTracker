import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const mail = localStorage.getItem("mail");
    const role = localStorage.getItem("role");
    if (mail && role) {
      setUser({ mail, role });
    } else {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div>
      {localStorage.getItem("role")}
      <br />
      {localStorage.getItem("mail")}
    </div>
  );
}
