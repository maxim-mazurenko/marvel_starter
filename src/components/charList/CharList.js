import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./charList.scss";
import useMarvelServise from "../../services/MarvelServise";
import Spinner from "../spiner/Spiner";
import ErrorMasseg from "../errorMessag/ErrorMasseg";
import Spiner2 from "../spiner2/Spiner2";

const CharList = (props) => {
  const [charList, setCharList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [chaeEnded, setChaeEnded] = useState(true);
  const { loading, error, getAllCharacters } = useMarvelServise();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllCharacters(offset).then(onCharLoading);
  };

  const onCharLoading = (res) => {
    let ended = false;
    if (res.length < 9) {
      ended = true;
    }

    setCharList([...charList, ...res]);
    setNewItemLoading(false);
    setOffset((offset) => offset + 9);
    setChaeEnded(ended);
  };

  const itemRefs = useRef([]);

  const focusOnItem = (id) => {
    itemRefs.current.forEach((item) =>
      item.classList.remove("char__item_selected")
    );
    itemRefs.current[id].classList.add("char__item_selected");
    itemRefs.current[id].focus();
  };

  function renderItems(arr) {
    const items = arr.map((item, i) => {
      return (
        <li
          className="char__item"
          tabIndex={0}
          ref={(el) => {
            itemRefs.current[i] = el;
          }}
          key={item.id}
          onClick={() => {
            props.onSelectedChar(item.id);
            focusOnItem(i);
          }}
          onKeyPress={(e) => {
            if (e.key === " " || e.key === "Enter") {
              props.onSelectedChar(item.id);
              focusOnItem(i);
            }
          }}
        >
          <img src={item.thumbnail} alt={item.name} style={item.style} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });
    // А эта конструкция вынесена для центровки спиннера/ошибки
    return <ul className="char__grid">{items}</ul>;
  }

  const newCharList = charList.map((item) => {
    if (item.thumbnail.includes("image_not_available")) {
      item.style = { objectFit: "unset" };
    }

    return item;
  });

  const items = renderItems(newCharList);

  const errorMasseg = error ? <ErrorMasseg /> : null;
  const spiner = loading && !newItemLoading ? <Spinner /> : null;

  return (
    <div className="char__list">
      {spiner}
      {errorMasseg}
      {items}

      <button
        onClick={() => onRequest(offset)}
        className="button button__main button__long"
        disabled={newItemLoading}
        style={{ display: chaeEnded ? "none" : "block" }}
      >
        <div className="inner">
          {newItemLoading ? <Spiner2 /> : "load more"}
        </div>
      </button>
    </div>
  );
};

CharList.propTypes = {
  onSelectedChar: PropTypes.func.isRequired,
};

export default CharList;
