import { useEffect, useState } from "react";
import axios from "axios";
import "./ClubListPage.css";

const ClubListPage = () => {
  const [clubs, setClubs] = useState([]);
  const fetchClubs = async () => {
    try {
      const response = await axios.get("http://localhost:5005/padel/clubs");
      setClubs(response.data);
    } catch (error) {
      console.error("Error fetching clubs:", error);
    }
  };

  useEffect(() => {
    fetchClubs();
  }, []);

  return (
    <div className="club-list-page">
      <h2>Club List Page</h2>
      {/* Club list content goes here */}
      {clubs.map((club) => (
        <div key={club._id} className="club-card">
          <h3>Name: {club.name}</h3>
          <img src={club.image} />
          <h4>Description: {club.description}</h4>
          <p>Location: {club.address}</p>
          <div className="padel-courts">
            <h4>Padel Courts:</h4>
            {club.padelCourts.map((court) => (
              <div key={court._id} className="padel-court">
                <p>Name: {court.title}</p>
                <p>Type: {court.type}</p>
                <p>Court Number: {court.courtNumber}</p>
              </div>
            ))}
          </div>
          <p>Number of Courts: {club.numberOfCourts}</p>
        </div>
      ))}
    </div>
  );
};
export default ClubListPage;
