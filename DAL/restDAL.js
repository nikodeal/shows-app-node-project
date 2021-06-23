const axios = require('axios')

url = 'https://api.tvmaze.com/shows'

const getTvShows = () =>{
 return axios.get(url)
}

const getShowById = (id) =>{
  return axios.get(`${url}/${id}`)
 }


 module.exports = {getTvShows, getShowById}