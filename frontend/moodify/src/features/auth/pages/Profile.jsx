import React from "react";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import "../style/profile.scss";

const Profile = () => {
  const { user, logoutHandler } = useAuth();

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-avatar">
          {user?.username?.[0]?.toUpperCase() || "M"}
        </div>
        <h1>{user?.username || user?.name || "Moodify User"}</h1>
        <p>{user?.email || "No email available"}</p>

        <div className="profile-actions">
          <Link to="/" className="profile-button profile-home">
            Home
          </Link>
          <button
            className="profile-button profile-logout"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
