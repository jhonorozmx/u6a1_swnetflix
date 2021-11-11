import Axios from "axios";
import { useEffect, useState } from "react";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Movie from "../components/Movie";
//import Movie from "../components/Movie";

const HomeScreen = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const {
          data: { results },
        } = await Axios.get("https://swapi.dev/api/films");
        setMovies(results);
        setLoading(false);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, [setMovies, setLoading, setError]);

  return (
    <>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox type="error">{error}</MessageBox>
      ) : (
        <div className="middle-row">
          {movies.map((movie) => (
            <Movie key={movie.episode_id} movie={movie} />
          ))}
        </div>
      )}
    </>
  );
};

export default HomeScreen;
