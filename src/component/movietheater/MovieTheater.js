import React, { Component } from "react";
import "./style.css";
import { getMovieDataList } from "../../services/MovieService";
import { stringSortingByChar } from "../../constants/Common";
import moment from "moment";
class MovieTheater extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [], //storing the movie data
      loading: false,
    };
  }

  componentDidMount() {
    this.getMovieList();
  }

  //call get api for fetching data
  getMovieList = async () => {
    this.setState({ loading: true });
    //calling api for getting movies list
    await getMovieDataList()
      .then((res) => {
        this.setState({
          loading: false,
          data: res.data.movies,
        });
      })
      .catch((err) => {
        this.setState({ loading: true });
        console.log("Rejected Request", err.message);
      });
    this.genreMovieGrouping();
  };

  //filter the movies data according to genre
  genreMovieGrouping = () => {
    let moviesByGenre = {};
    this.state.data.forEach((movie) => {
      movie.genres.forEach((genres) => {
        if (typeof moviesByGenre[genres] === "undefined") {
          moviesByGenre[genres] = [];
        }
        moviesByGenre[genres].push(movie);
      });
    });

    this.props.getMovieListAction(moviesByGenre);
  };

  render() {
    let { movieData = {} } = this.props;
    let { loading = "" } = this.state;
    return (
      <div className="p-3 mb-2  parentDiv ">
        <div className="col-xl-2 col-lg-2">
          <p className="mt-4 movieHeaderText"> WOOKIE MOVIES </p>
        </div>
        <hr className="lineStyle" />
        {loading ? <span className="text-secondary">Loading...</span> : ""}

        {Object.keys(movieData).map((genre) => (
          <div className=" mt-2">
            <div className="col-lg-2  col-xl-2 genre" key={genre}>
              Genre {genre}
            </div>
            <div className="row">
              {movieData[genre].map((movie) => (
                <div className="col-lg-4 col-xl-4">
                  <div className="card movieCard ml-5 mt-3">
                    <img
                      className="card-img-top moviePoster "
                      src={movie.poster}
                      alt="poster"
                    ></img>
                    <div className="card-body ">
                      <p className="card-title movieTitle">{movie.title}</p>
                      <p className="card-title imdbRating">
                        IMDB RATING : {movie.imdb_rating}
                      </p>
                      <p className="card-title imdbRating">
                        {moment(movie.released_on).format("DD-MM-YYYY")}
                      </p>
                      <p className="card-title imdbRating">{movie.length}</p>
                      <p class="card-text description" title={movie.overview}>
                        {stringSortingByChar(movie.overview, 80)}
                      </p>
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
export default MovieTheater;
