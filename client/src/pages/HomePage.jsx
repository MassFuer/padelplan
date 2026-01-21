import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage">
      <h1>Welcome to PadelPlan</h1>
      <p>
        Your ultimate platform to find and join padel clubs around the world!
      </p>
      <img src="/src/assets/padel-court.jpg" alt="Padel Court" />
      <section className="description">
        <h2>Discover Your Perfect Padel Club</h2>
        <p>
          Join thousands of players who have found their ideal padel clubs
          through our platform.
        </p>
      </section>
      <section className="weather">
        <h2>Check the Weather Before You Play</h2>
        <p>
          Get real-time weather updates for your location to plan your padel
          sessions accordingly.
        </p>
      </section>
    </div>
  );
};
export default HomePage;
