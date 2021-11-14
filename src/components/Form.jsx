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
            <label htmlFor="episode_id">Episode</label> <br />
            <input
              type="number"
              id="episode_id"
              placeholder="No. (7-10)"
              min="7"
              max="10"
              required
              onChange={(e) =>
                setMovieData({ ...movieData, episode_id: e.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="title">Title</label> <br />
            <input
              type="text"
              id="title"
              placeholder="E.g. The Force Awakens"
              minLength="4"
              maxLength="25"
              required
              onChange={(e) =>
                setMovieData({ ...movieData, title: e.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="producer">Producer</label> <br />
            <input
              type="text"
              id="producer"
              placeholder="E.g. J.J. Abrams"
              minLength="4"
              maxLength="25"
              required
              onChange={(e) =>
                setMovieData({ ...movieData, producer: e.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="release_date">Release date</label> <br />
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
            <label htmlFor="director">Director</label> <br />
            <input
              type="text"
              id="director"
              placeholder="E.g. J.J. Abrams"
              minLength="4"
              maxLength="25"
              required
              onChange={(e) =>
                setMovieData({ ...movieData, director: e.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="poster">Image of the poster</label> <br />
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
            <button type="submit" className={`primary large-btn ${theme}`}>
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
