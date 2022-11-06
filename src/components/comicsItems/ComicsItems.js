import { useState, useEffect } from "react";
import "./ComicsItems.scss";
import useMarvelServise from "../../services/MarvelServise";
import Spinner from "../spiner/Spiner";
import Spiner2 from "../spiner2/Spiner2";
import { Link } from "react-router-dom";

const ComicsItems = () => {
  const [comicsItems, setcomicsItems] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(24);
  const [chaeEnded, setChaeEnded] = useState(false);
  const { loading, error, getAllComics } = useMarvelServise();

  useEffect(() => {
    request(offset, true);
  }, []);

  const request = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllComics(offset).then(onChatLoaded);
  };

  const onChatLoaded = (res) => {
    setcomicsItems([...comicsItems, ...res]);
    setOffset((offset) => offset + 8);
    setNewItemLoading(false);
  };

  const renderItems = (arr) => {
    const items = arr.map((item, i) => {
      return (
        <li className="comics__item" tabIndex={0} key={item.id}>
          <Link to={`/comics/${item.id}`}>
            <img src={item.thumbnail} alt={item.name} style={item.style} />
            <div className="comics__name">{item.name}</div>
            <div className="comics__price">{item.prices}</div>
          </Link>
        </li>
      );
    });

    return <ul className="comics__grid">{items}</ul>;
  };

  function removeDuplicates(arrComics) {
    const arr = arrComics.map((item) => {
      if (item.thumbnail.includes("image_not_available")) {
        item.style = { objectFit: "unset" };
      }

      return item;
    });

    const result = [];
    const duplicatesIndices = [];

    // Перебираем каждый элемент в исходном массиве
    arr.forEach((current, index) => {
      if (duplicatesIndices.includes(index)) return;

      result.push(current);

      // Сравниваем каждый элемент в массиве после текущего
      for (
        let comparisonIndex = index + 1;
        comparisonIndex < arr.length;
        comparisonIndex++
      ) {
        const comparison = arr[comparisonIndex];
        const currentKeys = Object.keys(current);
        const comparisonKeys = Object.keys(comparison);

        // Проверяем длину массивов
        if (currentKeys.length !== comparisonKeys.length) continue;

        // Проверяем значение ключей
        const currentKeysString = currentKeys.sort().join("").toLowerCase();
        const comparisonKeysString = comparisonKeys
          .sort()
          .join("")
          .toLowerCase();
        if (currentKeysString !== comparisonKeysString) continue;

        // Проверяем индексы ключей
        let valuesEqual = true;
        for (let i = 0; i < currentKeys.length; i++) {
          const key = currentKeys[i];
          if (current[key] !== comparison[key]) {
            valuesEqual = false;
            break;
          }
        }
        if (valuesEqual) duplicatesIndices.push(comparisonIndex);
      } // Конец цикла
    });
    return result;
  }

  const items = renderItems(removeDuplicates(comicsItems));

  const load = loading && !newItemLoading ? <Spinner /> : null;

  return (
    <>
      <div className="comics">
        {load}
        {error}
        {items}

        <button
          onClick={() => request(offset)}
          className="button button__main button__long"
          disabled={newItemLoading}
          style={{ display: chaeEnded ? "none" : "block" }}
        >
          <div className="inner">
            {newItemLoading ? <Spiner2 /> : "load more"}
          </div>
        </button>
      </div>
    </>
  );
};

export default ComicsItems;
