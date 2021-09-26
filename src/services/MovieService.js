import axios from "axios";

import { API_URL } from "../constants/ApiUrlConstants";
let AuthToken="Bearer Wookie2019";
export const getMovieDataList = async () => {
 
  let request = await axios.get(
    `${API_URL.GET_MOVIE_LIST}`,

    {
      headers: {
        Authorization: AuthToken,
      },
    }
  );
  return request;
};