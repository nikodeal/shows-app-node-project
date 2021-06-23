const showsJsonDal = require("../DAL/jsonDAL");

exports.AddTvShow = async (obj, id) => {
  let flag;
  let showsInJsonFile = await showsJsonDal.readShowsData();

  const showsInJson = showsInJsonFile.data;
  const showsLength = showsInJson.length;

  try {
    let newMovie = {
      id: showsLength + 1,
      name: obj.name,
      language: obj.language,
      genres: obj.genres,
    };
    let temp = [...showsInJson, newMovie];
    let newObj = {
      data: temp,
    };
    await showsJsonDal.updateShowsData(newObj);
    flag = true;
  } catch (err) {
    console.log(err);
    flag = false;
  }

  return {
    flag,
    userId: id,
  };
};

exports.searchTvShows = async (obj) => {
  let showsInJsonFile = await showsJsonDal.readShowsData();
  let newArr = [];
  const showsInJson = showsInJsonFile.data;

  if (obj.name) {
    let tempArr = [],
      tempTwoArr = [];
    for (let i = 0; i < showsInJson.length; i++) {
      if (showsInJson[i].name.toLowerCase().includes(obj.name.toLowerCase())) {
        tempArr.push(showsInJson[i]);
      }
    }
    for (let x = 0; x < tempArr.length; x++) {
      for (let j = 0; j < tempArr[x].genres.length; j++) {
        if (tempArr[x].genres[j].toLowerCase() == obj.genre.toLowerCase()) {
          tempTwoArr.push(tempArr[x]);
        }
      }
    }
    for (let k = 0; k < tempTwoArr.length; k++) {
      if (tempTwoArr[k].language.toLowerCase() == obj.language.toLowerCase()) {
        newArr.push(tempTwoArr[k]);
      }
    }
  } else {
    let tempArr = [];
    for (let x = 0; x < showsInJson.length; x++) {
      for (let j = 0; j < showsInJson[x].genres.length; j++) {
        if (showsInJson[x].genres[j].toLowerCase() == obj.genre.toLowerCase()) {
          tempArr.push(showsInJson[x]);
        }
      }
    }
    for (let k = 0; k < tempArr.length; k++) {
      if (tempArr[k].language.toLowerCase() == obj.language.toLowerCase()) {
        newArr.push(tempArr[k]);
      }
    }
  }
  let genreSideArr = [];
  for (let x = 0; x < showsInJson.length; x++) {
    for (let j = 0; j < showsInJson[x].genres.length; j++) {
      if (showsInJson[x].genres[j].toLowerCase() == obj.genre.toLowerCase()) {
        if (genreSideArr.length < 13) {
          genreSideArr.push(showsInJson[x]);
        }
      }
    }
  }
  console.log(genreSideArr.length);
  return {
    filteredArr: newArr,
    genre: genreSideArr,
  };
};

exports.getSingleTvShow = async (id) => {
  let showsInJsonFile = await showsJsonDal.readShowsData();

  const showsInJson = showsInJsonFile.data;
  const findShow = showsInJson.find((x) => x.id == id);

  return findShow;
};
