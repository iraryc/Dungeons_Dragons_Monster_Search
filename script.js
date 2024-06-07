"use strict"

const monsterInput = document.getElementById("monsterInput");
const searchButton = document.getElementById("searchButton");
const monsterResult = document.getElementById("monsterResult");


searchButton.addEventListener("click", () => {
  const monsterName = monsterInput.value.toLowerCase();
  if (monsterName) {
    searchMonster(monsterName);
  } else {
    monsterResult.innerHTML = "Please enter a monster name.";
  }
});

function GrabMonsterDataFromAPI() {
  fetch("https://www.dnd5eapi.co/api/monsters")
      .then((response) => response.json())
      .then((data) => {
      coursesData = data;
      console.log(data);
      monsterDropDown(data);
      })
      .catch((error) => {
        console.error('Error fetching course data', error);
      });
}

function monsterDropDown(data){
  const monsterDropDown = document.getElementById("monsterDropDown");
  const fragment = document.createDocumentFragment();
  data.forEach(item => {
      const option = document.createElement("option");
      option.value = item.name;
      option.text = item.name;
      fragment.appendChild(option);
  });
  monsterDropDown.appendChild(fragment);

}
GrabMonsterDataFromAPI();

function searchMonster(monsterName) {
  monsterResult.innerHTML = "Searching...";

  axios
    .get(`https://www.dnd5eapi.co/api/monsters`)
    .then((response) => {
      const monsters = response.data.results;
      const matchedMonster = monsters.find(
        (monster) => monster.name.toLowerCase() === monsterName
      );

      if (matchedMonster) {
        axios
          .get("https://www.dnd5eapi.co" + matchedMonster.url)
          .then((monsterResponse) => {
            const monsterData = monsterResponse.data;
            monsterResult.innerHTML = `
              <h2>${monsterData.name}</h2>
              <p><strong>Index:</strong> ${monsterData.index}</p>
              <img src="https://www.enworld.org/attachments/pzo9500-10-chuffy-jpg.111691/" alt="monster image">
              <!-- You can display more monster details here -->
            `;
          })
          .catch((error) => {
            monsterResult.innerHTML = "Error fetching monster details.";
          });
      } else {
        monsterResult.innerHTML = "Monster not found.";
      }
    })
    .catch((error) => {
      monsterResult.innerHTML = "Error fetching monsters.";
    });
}