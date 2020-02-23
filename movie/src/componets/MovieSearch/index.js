import React, {Component} from 'react';
import {BeatLOader} from 'react-spinners'

class MovieSearch extends Component{
    state ={
        search: '',
        movies:[],
    }
    handleChange = e => this.setState({[target.name]: e.target.value})

    handleSubmit= async e =>{
        e.preventDefault()
        try {
            const movie = await fetch("=${process.env.REACT_APP_TMDB_API_KEY}")
            const movieJson = await movie.Json()
            this.setState({
                movies: movieJson.results,
                search: "",
            })
        } catch (error) {
            console.log(error)
        }
    } 
    render(){
    return(
        <div>
            <form onSubmit={this.handleSubmit}>
            <input placeholder="movie title" value={this.state.search} name="search"/>
            <button type='submit' handleSubmit={handleSubmit}>Search</button>
        </form>
        </div>
        
    ) }
}

export default MovieSearch