import "./ProfilePage.css";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

const ProfilePage = () => {
  const { currentUser, authenticateUser } = useContext(AuthContext);
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({
    username: currentUser?.username || "",
    profilePicture: currentUser?.profilePicture || "",
    padelClub: currentUser?.padelClub?.[0] || "",
  });
  const [clubs, setClubs] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loadingClubs, setLoadingClubs] = useState(false);

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    try {
      setLoadingClubs(true);
      const response = await axios.get("http://localhost:5005/padel/clubs");
      setClubs(response.data);
    } catch (err) {
      console.error("Error fetching clubs:", err);
    } finally {
      setLoadingClubs(false);
    }
  };

  const handleEdit = () => {
    setEdit(!edit);
    setError("");
    setSuccess("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        "http://localhost:5005/auth/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setSuccess("Profile updated successfully!");
      await authenticateUser();
      setEdit(false);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.errorMessage || "Error updating profile");
    }
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      {!edit ? (
        <div className="profile-view">
          <h1>Profile Page</h1>
          <h2>{currentUser.username}</h2>
          <img
            src={currentUser.profilePicture}
            alt="profile image"
            className="profile-picture"
          />

          <div className="profile-info-item">
            <label>Email</label>
            <p>{currentUser.email}</p>
          </div>

          {currentUser.padelClub && currentUser.padelClub.length > 0 && (
            <div className="profile-info-item">
              <label>Favorite Club</label>
              <p>{currentUser.padelClub[0]?.name || "Not selected"}</p>
            </div>
          )}

          <button onClick={handleEdit} className="edit-profile-button">
            ✏️ Edit Profile
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="profile-form">
          <h2>Edit Your Profile</h2>

          <label>
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </label>

          <label>
            Profile Picture URL:
            <input
              type="url"
              name="profilePicture"
              value={formData.profilePicture}
              onChange={handleInputChange}
              placeholder="https://example.com/image.jpg"
            />
          </label>

          <label>
            Favorite Padel Club:
            <select
              name="padelClub"
              value={formData.padelClub}
              onChange={handleInputChange}
              disabled={loadingClubs}
            >
              <option value="">Select a club</option>
              {clubs.map((club) => (
                <option key={club._id} value={club._id}>
                  {club.name}
                </option>
              ))}
            </select>
          </label>

          {formData.profilePicture && (
            <div className="preview">
              <p>Preview:</p>
              <img
                src={formData.profilePicture}
                alt="preview"
                className="profile-picture"
              />
            </div>
          )}

          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}

          <div className="button-group">
            <button type="submit" className="save-button">
              Save Changes
            </button>
            <button
              type="button"
              onClick={handleEdit}
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
export default ProfilePage;
