const genresArr = [
  "drama",
  "western",
  "comedy",
  "war",
  "action",
  "adventure",
  "history",
  "crime",
  "science-fiction",
  "legal",
  "family",
  "romance",
  "thriller",
  "fantasy",
  "supernatural",
  "horror",
  "mystery",
  "sports",
];
const langsArr = [
  "english",
  "japanese",
  "chinese",
  "spanish",
  "hindi",
  "hebrew",
  "arabic",
  "portuguese",
  "russian",
  "german",
  "french",
];
const genreSelectId = "genreSelect";
const langSelectId ="langSelect"
const generateOptions = (selectId, value) => {
  let mySelect = document.getElementById(selectId);
  let option = document.createElement("option");
  option.text = value;
  option.value = value;
  mySelect.appendChild(option);
};

genresArr.forEach((element) => {
  return generateOptions(genreSelectId, element);
});

langsArr.forEach((element) => {
  return generateOptions(langSelectId, element);
});
