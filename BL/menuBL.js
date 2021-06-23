const showsJsonDal = require("../DAL/jsonDAL");
const restTvShowsDal = require("../DAL/restDAL");

exports.loadTvShows = async () => {
  let flag;
  let showsInJsonFile = await showsJsonDal.readShowsData();

const showsInJson = showsInJsonFile.data
const showsLength = showsInJson.length
console.log(showsLength);
  if (showsLength > 5) {
    flag = false;
  } else {
    let tvShowFromRest = await restTvShowsDal.getTvShows();
    let arrayOfShows = tvShowFromRest.data;
    let deconstructedShows = arrayOfShows.map((show, i) => {
      let obj = {
        id: i+1,
        name: show.name,
        genres: show.genres,
        language: show.language,
        image: show.image.original,
      };
      return obj;
    });
    let combineArr = [...deconstructedShows];
    showsInJsonFile.data.forEach((element) => {
      combineArr.push(element);
    });

    let newObj = {
      data: combineArr,
    };
    await showsJsonDal.updateShowsData(newObj);
    flag = true;
  }

  return flag;
};
