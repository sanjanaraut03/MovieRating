import { Route,BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Movie from './pages/movieDetail/movie';
import MovieList from './components/movieList/MovieList';


function App() {
  return (
    <div className="App">
      <Router>
        <Header/> <br></br>
        <Routes>
          <Route index element ={<Home/>}></Route>
          <Route path='movie/:id' element = {<Movie/>}></Route>
          <Route path='movies/:type' element = {<MovieList />}></Route>
          <Route path='/*' element = {<h1> Error page</h1>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
