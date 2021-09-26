import React, { Component } from "react";
import "./style.css";
import { getMovieDataList } from "../../services/MovieService";
import {stringSortingByChar} from "../../constants/Common";

class MovieTheater extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      moviesByGenre: [],
    };
  }

  componentDidMount() {
    this.getMovieList();
  }
  getMovieList = async () => {
    await getMovieDataList()
      .then((res) => {
        console.log("data", res.data.movies);
        this.setState({
          loading: false,
          data: res.data.movies,
        });
     
      })
      .catch((err) => {
        console.log("rejected", err.message);
      });
    this.filterByGenre();
  };

  filterByGenre = () => {
    let moviesByGenre = {};
    this.state.data.forEach((movie) => {
      movie.genres.forEach((genres) => {
        if (typeof moviesByGenre[genres] === "undefined") {
          moviesByGenre[genres] = [];
        }
        moviesByGenre[genres].push(movie);
      });
    });
    console.log(moviesByGenre);
   // this.setState({ moviesByGenre: moviesByGenre });
    this.props.getMovieListAction(moviesByGenre)
  };

  render() {
    let { movieData } = this.props;
    return (
      <div className="p-3 mb-2  parentDiv ">
        <div className="col-xl-2 col-lg-2">
          <p className="mt-4 movieHeaderText"> WOOKIE MOVIES </p>
        </div>
        <hr className="lineStyle"/>
        {Object.keys(movieData).map((genre) => (
          <div className=" mt-2">
            <div className="col-lg-2  movieTitle" key={genre}>Genre {genre}</div>
           <div className="row">
            {movieData[genre].map((movie) => (
                <div className="col-lg-4 col-xl-4">
              <div className="card movieCard ml-5 mt-2">
                <img
                  className="card-img-top moviePoster "
                  src={movie.poster}
                  alt="poster"
                ></img>
                <div className="card-body ">
                  <p className="card-title movieTitle">{movie.title}</p>
                  <p class="card-text" title={movie.overview}>{stringSortingByChar(movie.overview,80)}</p>
                </div>
              </div>
              </div>
            ))}
          </div>
          </div>
        ))}
       
      </div>
    );
  }
}
// const mapStateToProps = (state) => {
//     return {
//       moviesByGenre: state.movieDataReducer.movieData,
//     };
//   };
  
//   const mapDispatchToProps = (dispatch) => {
//     return bindActionCreators(
//       {
//         getMovieListAction,
//       },
//       dispatch
//     );
//   };
export default (MovieTheater);
