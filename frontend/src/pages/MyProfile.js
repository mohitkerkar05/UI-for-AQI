import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import "./MyProfile.css";

const MyProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [editMode, setEditMode] = useState(false); // 🔧 edit toggle

  const { user } = useUser();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/get-user-profile?mobile=${user.mobile}`
        );
        if (!res.ok) throw new Error("Failed to fetch user data");
        const data = await res.json();
        setUserProfile(data);
        setFormData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user?.mobile) {
      fetchProfile();
    }
  }, [user.mobile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSuccessMsg(null);
    setError(null);

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/update-user-profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mobile: user.mobile, ...formData }),
        }
      );
      if (!res.ok) throw new Error("Failed to update profile");

      const updatedData = await res.json();
      setUserProfile(updatedData);
      setFormData(updatedData);
      setSuccessMsg("Profile updated successfully!");
      setEditMode(false); // ✅ exit edit mode
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCancel = () => {
    setFormData(userProfile); // revert changes
    setEditMode(false);
    setError(null);
    setSuccessMsg(null);
  };
  // Add inside the component function, below handleCancel:

const handleDelete = async () => {
  if (!window.confirm("Are you sure you want to delete your profile? This action cannot be undone.")) return;

  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/delete-user-profile?mobile=${user.mobile}`,
      {
        method: "DELETE",
      }
    );
    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Failed to delete profile");

    alert("Profile deleted successfully!");
    // Optionally, redirect to login or homepage
    window.location.href = "/"; // adjust route as needed
  } catch (err) {
    setError(err.message);
  }
};


  return (
    <div className="profile-container">
      <h2>My Profile</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}

      {!loading && userProfile && (
        <>
          {!editMode ? (
            <>
              <div className="profile-card">
                {Object.entries(userProfile).map(([key, value]) => (
                  <div className="profile-field" key={key}>
                    <strong>{key}:</strong> <span>{value}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => setEditMode(true)}>Update My Profile</button>
              <button onClick={handleDelete} style={{ marginLeft: "10px", backgroundColor: "crimson", color: "white" }}>
  Delete My Profile
</button>

            </>
          ) : (
            <>
              <h3>Edit Profile</h3>
              <form className="profile-form" onSubmit={handleUpdate}>
                {Object.entries(formData).map(([key, value]) =>
                  key !== "mobile" ? (
                    <div key={key} className="form-group">
                      <label>{key}</label>
                      <input
                        type="text"
                        name={key}
                        value={value}
                        onChange={handleChange}
                      />
                    </div>
                  ) : (
                    <div key={key} className="form-group">
                      <label>{key} (read-only)</label>
                      <input type="text" name={key} value={value} disabled />
                    </div>
                  )
                )}
                <button type="submit">Confirm</button>
                <button type="button" onClick={handleCancel} style={{ marginLeft: "10px" }}>
                  Cancel
                </button>
              </form>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default MyProfile;
