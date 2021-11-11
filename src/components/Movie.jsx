import PropTypes from "prop-types";

const Movie = ({ movie, childToParent }) => {
  return (
    <div key={movie.episode_id} className="card">
      <div className="card-image-container">
        <img
          className="medium"
          src={
            process.env.PUBLIC_URL + `/images/poster${movie.episode_id}.webp`
          }
          alt={movie.title}
        />
      </div>
      <div className="card-body">
        <p>{movie.title}</p>
        <p>{movie.director}</p>
        <p>{movie.release_date}</p>
        <button className="primary-btn" onClick={() => childToParent(true)}>
          See Opening
        </button>
      </div>
    </div>
  );
};

Movie.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default Movie;
