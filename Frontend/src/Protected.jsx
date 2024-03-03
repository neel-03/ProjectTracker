import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "rsuite";

export default function Protected({ Component, active }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");
    const email = localStorage.getItem("email");
    if (!token || !username || !role || !email) {
      navigate("/");
    } else {
      setUser({
        token,
        username,
        role,
        email
      });
      setLoading(false);
    }
  }, []);
  return (
    <>
      {loading && <Loader center size="md" content="Please Wait..." />}
      {!loading && <Component user={user} active={active} />}
    </>
  );
}
