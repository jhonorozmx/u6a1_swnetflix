import PropTypes from "prop-types";
import moviePosters from "../assets";

const Movie = ({ movie, modalHandler }) => {
  const episodes = {
    1: "Episode I",
    2: "Episode II",
    3: "Episode III",
    4: "Episode IV",
    5: "Episode V",
    6: "Episode VI",
  };

  return (
    <div key={movie.episode_id} className="card">
      <div className="card-image-container">
        <img
          className="medium"
          src={moviePosters[movie.episode_id]}
          alt={movie.title}
        />
      </div>
      <div className="card-body">
        <p>{movie.title}</p>
        <p>{movie.director}</p>
        <p>{movie.release_date}</p>
        <button
          className="primary-btn"
          onClick={() =>
            modalHandler({
              showModal: true,
              modalContent: {
                episode: episodes[movie.episode_id],
                title: movie.title,
                intro: movie.opening_crawl,
              },
            })
          }
        >
          See Opening
        </button>
      </div>
    </div>
  );
};

Movie.propTypes = {
  movie: PropTypes.object.isRequired,
  modalHandler: PropTypes.func.isRequired,
};

export default Movie;
