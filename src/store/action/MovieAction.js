import * as actionTypes from "../../constants/ActionType";

//action for get movie data
function getMovieListAction(data) {
  return (dispatch) => {
    return dispatch({ type: actionTypes.GET_MOVIE_DATA, data });
  };
};



export default getMovieListAction;