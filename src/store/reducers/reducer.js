import * as actionTypes from "../../constants/ActionType";

const initialState = {
  movieData: {},
};


//reducer for get data
export default function movieDataReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_MOVIE_DATA:
 
      return {
        ...state,
        movieData: {...action.data},
      };

    default:
      return state;
  }
}
