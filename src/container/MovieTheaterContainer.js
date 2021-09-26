import { connect } from "react-redux";
//import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import MovieTheater from "../../src/component/movietheater/MovieTheater";
import  getMovieListAction  from "../../src/store/action/MovieAction";

const mapStateToProps = (state) => {
  return {
    movieData: state.movieDataReducer.movieData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getMovieListAction,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieTheater);
