import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Movie from "./Movie";

const Row = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    try {
      await axios.get(fetchUrl).then((response) => {
        setMovies(response.data.results);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [fetchUrl]);

  console.log(movies);
  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
      <div className="relative flex items-center">
        <div id={"slider"} className="flex">
          {movies.map((movie) => (
            <Movie key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Row;
