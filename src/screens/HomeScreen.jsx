import Axios from "axios";
import { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Movie from "../components/Movie";
import Modal from "../components/Modal";
import Animation from "../components/Animation";
import Form from "../components/Form";

const HomeScreen = () => {
  // Context
  const theme = useContext(ThemeContext);

  // State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [movies, setMovies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [animationData, setAnimationData] = useState({});

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

  const modalHandler = ({ show, type }) => {
    setShowModal(show);
    setModalType(type);
  };

  const getAnimationData = (data) => {
    setAnimationData(data);
  };

  const formHandler = (formData) => {
    setMovies([...movies, formData]);
    setShowModal(false);
  };

  return (
    <div className="middle-row">
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox type="error" message={error} />
      ) : (
        <>
          {showModal && modalType === "animation" && (
            <Modal modalHandler={modalHandler}>
              <Animation content={animationData} />
            </Modal>
          )}
          {showModal && modalType === "form" && (
            <Modal modalHandler={modalHandler}>
              <Form formHandler={formHandler} />
            </Modal>
          )}
          {
            <div className="movies-container">
              {movies.map((movie) => (
                <Movie
                  key={movie.episode_id}
                  movieData={movie}
                  modalHandler={modalHandler}
                  animationData={getAnimationData}
                />
              ))}
            </div>
          }
          {
            <div className="add-new-movie">
              <button
                className={`primary large-btn ${theme}`}
                onClick={() => modalHandler({ show: true, type: "form" })}
              >
                Add film
              </button>
            </div>
          }
        </>
      )}
    </div>
  );
};

export default HomeScreen;
