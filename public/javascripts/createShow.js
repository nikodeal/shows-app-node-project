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

const createSingleDiv = (value) => {
  let myDiv = document.getElementById("checkBoxParentDiv");
  let div = document.createElement("div");
  div.classList = "divForCheckBox";
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = "genres[]";
  checkbox.value = value;
  checkbox.classList = "custom_css";
  let label = document.createElement("label");
  label.classList = "labelForCheckBox";
  label.appendChild(document.createTextNode(value));
  div.appendChild(checkbox);
  div.appendChild(label);
  myDiv.appendChild(div);
};

genresArr.forEach((element) => {
  return createSingleDiv(element)
});


