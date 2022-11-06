import { useState, useEffect } from "react";

import useMarvelServise from "../../services/MarvelServise";
import Spinner from "../spiner/Spiner";
import ErrorMasseg from "../errorMessag/ErrorMasseg";
import Skeleton from "../skeleton/Skeleton";
import "./charInfo.scss";

const CharInfo = (props) => {
  const charID = props.charId;
  const [char, setChar] = useState(null);
  const { loading, error, getCharacter, clearError } = useMarvelServise();

  useEffect(() => {
    updateChar();
  }, [charID]);

  const onChatLoaded = (charEL) => {
    setChar((char) => charEL);
  };

  const updateChar = () => {
    const { charId } = props;
    if (!charId) {
      return;
    }

    clearError();
    getCharacter(charId).then(onChatLoaded);
  };

  const skeleton = char || loading || error ? null : <Skeleton />;
  const errorMasseg = error ? <ErrorMasseg /> : null;
  const spiner = loading ? <Spinner /> : null;
  const content = !(loading || error || !char) ? <View char={char} /> : null;

  return (
    <div className="char__info">
      {skeleton}
      {errorMasseg}
      {spiner}
      {content}
    </div>
  );
};

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;
  const iNot = thumbnail.includes("image_not_available");

  return (
    <>
      <div className="char__basics">
        <img
          style={iNot ? { objectFit: "contain" } : null}
          src={thumbnail}
          alt={name}
        />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length > 0 ? null : "There is no comics with this character"}
        {comics.map((item, i) => {
          if (i > 9) return;
          return (
            <li key={i} className="char__comics-item">
              {item.name}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default CharInfo;
