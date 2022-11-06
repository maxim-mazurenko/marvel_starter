import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spiner/Spiner";

const ErrorPage = lazy(() => import("../pages/ErrorPage"));
const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const SingleComicPage = lazy(() => import("../pages/SingleComicPage"));

const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/comics" element={<ComicsPage />} />
              <Route path="/comics/:comicId" element={<SingleComicPage />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

/* import {useState, useReducer} from 'react';


function reducer (state, action) {
        switch (action.type) {
            case 'toggle':
                return {count: state.count, autoplay: !state.autoplay};
            case 'slow': 
                return {count: state.count, autoplay: 300};
            case 'fast':
                return {count: state.count, autoplay: 700};
            case 'increment':
                return {count: state.count + 1};
            case 'decrement':
                return {count: state.count - 1};
            default:
                throw new Error();
        }
} */

/* const Slider = () => {
    const [slide, dispatch] = useReducer(reducer, {count: 0, autoplay: false}); */
/* const [autoplay, dispatch] = useReducer(reducer, {autoplay: false}); */

/*  function changeSlide(i) {
        setSlide(slide => slide + i);
    } */

/*     return ( 
        <>
            <div className="slider w-50 m-auto">
                <img className="d-block w-100" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" />
                <div className="text-center mt-5">Active slide {slide.count} <br/> {slide.autoplay ? 'auto' : null} {slide.autoplay}</div>
                <div className="buttons mt-3">
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => dispatch({type: 'decrement'})}>-1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => dispatch({type: 'increment'})}>+1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => dispatch({type: 'toggle'})}>toggle autoplay</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => dispatch({type: 'slow'})}>slow autoplay</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => dispatch({type: 'fast'})}>fast autoplay</button>
                </div>
            </div>
        </>
    )
} */

/* function App() {
    return (
        <Slider/>
    );
} */

export default App;
