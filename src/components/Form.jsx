import PropTypes from "prop-types";
import { ThemeContext } from "../ThemeContext.js";
import { useState, useContext, useEffect } from "react";
import Axios from "axios";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Form = ({ formHandler }) => {
  // Context
  const theme = useContext(ThemeContext);

  // State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [movieData, setMovieData] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const {
          data: { results },
        } = await Axios.get("https://swapi.dev/api/planets");
        setPlanets(results);
        setLoading(false);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, [setPlanets, setLoading, setError]);

  const submitHandler = (e) => {
    e.preventDefault();
    formHandler(movieData);
  };

  const formatDate = (date) => {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  return (
    <div className="form-container">
      <h1>Add a New Film</h1>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox type="error" message={error} />
      ) : (
        <form className={`add-movie-form ${theme}`} onSubmit={submitHandler}>
          <div>
            <label htmlFor="episode_id">Episode</label>
            <input
              type="number"
              id="episode_id"
              placeholder="Episode No."
              min="7"
              max="10"
              required
              onChange={(e) =>
                setMovieData({ ...movieData, episode_id: e.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              placeholder="Title"
              minLength="4"
              maxLength="25"
              required
              onChange={(e) =>
                setMovieData({ ...movieData, title: e.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="producer">Producer</label>
            <input
              type="text"
              id="producer"
              placeholder="Producer"
              minLength="4"
              maxLength="25"
              required
              onChange={(e) =>
                setMovieData({ ...movieData, producer: e.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="release_date">Release date</label>
            <DatePicker
              id="release_date"
              selected={startDate}
              onChange={(date) => {
                const formattedDate = formatDate(date);
                setStartDate(date);
                setMovieData({ ...movieData, release_date: formattedDate });
              }}
            />
          </div>

          <div>
            <label htmlFor="director">Director</label>
            <input
              type="text"
              id="director"
              placeholder="Director"
              minLength="4"
              maxLength="25"
              required
              onChange={(e) =>
                setMovieData({ ...movieData, director: e.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="poster">Image of the poster</label>
            <input
              type="file"
              id="poster"
              accept="image/*"
              onChange={(e) =>
                setMovieData({ ...movieData, poster: e.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="planet-list">Planet: </label>
            <select
              name="planet-list"
              id="planet-list"
              onChange={(e) =>
                setMovieData({ ...movieData, planet: e.target.value })
              }
            >
              {planets.map((planet, index) => (
                <option key={index} value={planet.name}>
                  {planet.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <button type="submit" className={`primary medium-btn ${theme}`}>
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

Form.propTypes = {
  formHandler: PropTypes.func.isRequired,
};

export default Form;
