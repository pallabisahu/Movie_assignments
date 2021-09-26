const stringSortingByChar = (str, char) => {
    if (
      str != null &&
      str != undefined &&
      str != "" &&
      str.length > char &&
      str.length != char
    ) {
      let sorted = str.slice(0, char);
  
      return sorted + "...";
    } else {
      return str;
    }
  };
  export  {stringSortingByChar};