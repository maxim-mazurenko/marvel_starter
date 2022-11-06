import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useMarvelServise from "../../services/MarvelServise";
import Spinner from "../spiner/Spiner";
import ErrorMasseg from "../errorMessag/ErrorMasseg";
import "./singleComic.scss";

const SingleComicPage = () => {
  const { comicId } = useParams();
  const [comic, setComic] = useState(null);
  const { loading, error, getComic, clearError } = useMarvelServise();

  useEffect(() => {
    updateComic();
  }, [comicId]);

  const updateComic = () => {
    clearError();
    getComic(comicId).then(onComicLoaded);
  };

  const onComicLoaded = (comic) => {
    setComic(comic);
  };

  const errorMasseg = error ? <ErrorMasseg /> : null;
  const spiner = loading ? <Spinner /> : null;
  const content = !(loading || error || !comic) ? <View comic={comic} /> : null;

  return (
    <>
      {errorMasseg}
      {spiner}
      {content}
    </>
  );
};

const View = ({ comic }) => {
  const { title, description, prices, thumbnail, language, pageCount } = comic;

  return (
    <div className="single-comic">
      <img src={thumbnail} alt={title} className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr">{pageCount}</p>
        <p className="single-comic__descr">Language: {language}</p>
        <div className="single-comic__price">{prices}$</div>
      </div>
      <Link to="/comics" className="single-comic__back">
        Back to all
      </Link>
    </div>
  );
};

export default SingleComicPage;
