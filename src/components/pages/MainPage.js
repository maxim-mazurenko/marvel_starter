import { useState } from "react";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundery from "../errorBoundary/ErrorBoundery";
import decoration from "../../resources/img/vision.png";

const MainPage = () => {
  const [selecredChar, setSelecredChar] = useState(null);

  const onSelectedChar = (id) => {
    setSelecredChar(id);
  };

  return (
    <>
      <ErrorBoundery>
        <RandomChar />
      </ErrorBoundery>

      <div className="char__content">
        <ErrorBoundery>
          <CharList onSelectedChar={onSelectedChar} />
        </ErrorBoundery>

        <ErrorBoundery>
          <CharInfo charId={selecredChar} />
        </ErrorBoundery>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  );
};

export default MainPage;
