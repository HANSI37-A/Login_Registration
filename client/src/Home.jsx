import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function Home() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    axios.get("http://localhost:5000/home", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        console.log(res.data);
        setMessage(res.data);
      })
      .catch(err => {
        console.error(err);
        navigate("/login");
      });

  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="text-center mt-5">
      <h1>Home Page</h1>

      {/* Show backend response */}
      <p>{message}</p>

      <button className="btn btn-danger" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Home;