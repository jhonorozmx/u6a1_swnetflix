import PropTypes from "prop-types";
import { ThemeContext } from "../ThemeContext";
import { useContext } from "react";
import moviePosters from "../assets";

const Movie = ({ movieData, modalHandler, animationData }) => {
  const theme = useContext(ThemeContext);
  const { episode_id, title, director, release_date, opening_crawl } =
    movieData;

  const movieButtonHandler = () => {
    modalHandler({ show: true, type: "animation" });
    animationData({ episode_id, title, opening_crawl });
  };

  return (
    <div key={episode_id} className={`card ${theme}`}>
      <div className="card-image-container">
        <img
          className="medium"
          src={moviePosters[episode_id] || moviePosters.default}
          alt={title}
        />
      </div>
      <div className={`card-body ${theme}`}>
        <p>{title}</p>
        <p>{director}</p>
        <p>{release_date}</p>
        <button
          className={`primary medium-btn ${theme}`}
          onClick={movieButtonHandler}
        >
          See Opening
        </button>
      </div>
    </div>
  );
};

Movie.propTypes = {
  movieData: PropTypes.object.isRequired,
  modalHandler: PropTypes.func.isRequired,
  animationData: PropTypes.func.isRequired,
};

export default Movie;
