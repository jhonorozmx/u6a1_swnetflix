import Axios from "axios";
import { useEffect, useState } from "react";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Movie from "../components/Movie";
import Opening from "../components/Opening";

const HomeScreen = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});

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

  const modalHandler = ({ showModal, modalContent }) => {
    setShowModal(showModal);
    setModalContent(modalContent);
  };

  return (
    <>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox type="error" message={error} />
      ) : (
        <div className="middle-row">
          {showModal && (
            <Opening modalContent={modalContent} modalHandler={modalHandler} />
          )}
          {movies.map((movie) => (
            <Movie
              key={movie.episode_id}
              movie={movie}
              modalHandler={modalHandler}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default HomeScreen;
