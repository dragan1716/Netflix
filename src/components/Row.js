import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Movie from "./Movie";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Row = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const scrollRef = useRef(null);

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

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  // Korak 2: Funkcija za skrolovanje desno
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  console.log(movies);

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={scrollLeft}
          className="rounded-full ml-1 opacity-50 hover:opacity-100 text-black absolute bg-gray-300 z-10 cursor-pointer hidden group-hover:block"
          size={40}
        />
        <div
          ref={scrollRef}
          id={"slider"}
          className="h-full w-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies.map((movie) => (
            <Movie key={movie.id} movie={movie} />
          ))}
        </div>
        <MdChevronRight
          onClick={scrollRight}
          size={40}
          className="rounded-full opacity-50 hover:opacity-100 text-black absolute bg-gray-300 z-10 right-2 cursor-pointer hidden group-hover:block"
        />
      </div>
    </>
  );
};

export default Row;
