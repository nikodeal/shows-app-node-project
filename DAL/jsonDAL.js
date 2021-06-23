const jsonFile = require("jsonfile");

const usersFilePath = "data/users.json";
const showsFilePath = "data/newShows.json";

const readUsersData = () => {
  return new Promise((resolve, reject) => {
    jsonFile.readFile(usersFilePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
const updateUsersData = (obj) => {
  return new Promise((resolve, reject) => {
    jsonFile.writeFile(usersFilePath, obj, (err) => {
      err ? reject(err) : resolve('updated')
    });
  });
};
const readShowsData = () => {
  return new Promise((resolve, reject) => {
    jsonFile.readFile(showsFilePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
const updateShowsData = (obj) => {
  return new Promise((resolve, reject) => {
    jsonFile.writeFile(showsFilePath, obj, (err) => {
      if (err) reject(err);
    });
  });
};


module.exports = {
  readUsersData,
  updateUsersData,
  readShowsData,
  updateShowsData,


};
