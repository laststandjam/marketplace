import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  state = {
    movies: [],
  };

  async componentDidMount() {
    const movies = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`,
    );
    const moviesJson = await movies.json();
    this.setState({
      movies: moviesJson.results,
    });
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.movies.map((m, i) => (
            <li key={i}>
              <Link to={`/movies/${m.id}`}>{m.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Home;
