import React, { useEffect, useState } from "react";

function HomePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    fetch("/api/auth/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!user) return <p>Please login to see your info.</p>;

  return (
    <div>
      <h2>Welcome, {user.firstName}!</h2>
      <p>Your email: {user.email}</p>
    </div>
  );
}

export default HomePage;
