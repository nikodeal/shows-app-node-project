const usersJsonDal = require("../DAL/jsonDAL");

exports.logUser = async (obj) => {
  let flag;
  let resp = await usersJsonDal.readUsersData();
  const findUser = resp.data.find((x) => x.username == obj.username);
  if (findUser) {
    if (findUser.password === obj.password) {
      flag = true;
    } else {
      flag = false;
    }
  } else {
    flag = false;
  }

  return {
    flag,
    id: findUser.id,
  };
};

exports.getUsers = async () => {
  let resp = await usersJsonDal.readUsersData();
  let data = resp.data;
  return data;
};
exports.getSingleUser = async (id) => {
  let flag;
  let resp = await usersJsonDal.readUsersData();
  const user = resp.data.find((x) => x.id == id);
  if (user) {
    flag = true;
  } else {
    flag = false;
  }

  return {
    flag,
    user,
  };
};
exports.deleteUser = async (id) => {
  try {
    let resp = await usersJsonDal.readUsersData();
    let arrData = resp.data;
    let newArr = [];

    for (let i = 0; i < arrData.length; i++) {
      if (arrData[i].id == id && i != 0) {
        console.log("found user");
      } else {
        newArr.push(arrData[i]);
      }
    }
    let temp = {
      data: newArr,
    };
   const usersJson = await usersJsonDal.updateUsersData(temp);
    return true;
  } catch (err) {
    console.log(err);
  }
};
exports.addUser = async (obj, type) => {
  let resp = await usersJsonDal.readUsersData();
  let arrData = resp.data;
  if (type === "add") {
    let newObj = {
      id: arrData.length + 1,
      username: obj.username,
      password: obj.password,
      isAdmin: false,
      
    };
    let newArr = arrData
    
    newArr.push(newObj)
  
    let temp = {
      data: newArr,
    };
   
    await usersJsonDal.updateUsersData(temp);
  }
  if (type === "edit") {
    for (let i = 0; i < arrData.length; i++) {
      if (arrData[i].id == obj.id && i != 0) {
        let newObj = {
          id: arrData[i].id,
          username: obj.username,
          password: obj.password,
          isAdmin: false,
         
        };
        arrData[i] = newObj;
        newArr = arrData;
        let temp = {
          data: newArr,
        };
        await usersJsonDal.updateUsersData(temp);
        break;
      }
    }
  }
};
