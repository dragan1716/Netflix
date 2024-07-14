import React, { useEffect, useRef, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import { AiOutlineClose } from "react-icons/ai";

const SavedMovies = () => {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setMovies(doc.data()?.savedMovies);
    });
  }, [user?.email]);

  const movieRef = doc(db, "users", `${user?.email}`);
  const deleteMovie = async (id) => {
    try {
      const newMovies = movies.filter((movie) => movie.id !== id);
      await updateDoc(movieRef, {
        savedMovies: newMovies,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">My shows</h2>
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
            <div
              key={movie.id}
              className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2"
            >
              <img
                className="w-full h-auto block object-cover"
                src={`https://image.tmdb.org/t/p/original/${movie?.img}`}
                alt={movie?.title}
              />
              <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 text-white opacity-0 hover:opacity-100">
                <p className="whitespace-normal flex justify-center items-center font-bold px-2 h-full w-full top-[40%] text-center break-words">
                  {movie?.title}
                </p>
                <div
                  onClick={() => deleteMovie(movie.id)}
                  className="absolute top-4 right-4 "
                >
                  <AiOutlineClose />
                </div>
              </div>
            </div>
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

export default SavedMovies;
