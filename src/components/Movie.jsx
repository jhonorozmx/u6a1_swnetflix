import PropTypes from "prop-types";

const Movie = ({ movie }) => {
  const img = `poster${movie.episode_id}.webp`;
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
        <h2>{movie.title}</h2>
        <p>{movie.director}</p>
        <p>{movie.release_date}</p>
      </div>
    </div>
  );
};

Movie.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default Movie;
