let pokemons = [];
let ability = [];
let loadedPokemon = [0];

let currentPokemon;
let lastContainerId;

async function init() {
  loader();
  await loadMorePokemon();
  loaderEnd();
}

function loader() {
  let background = document.getElementById("pokedex");
  background.classList.add("d-none");
}

function loaderEnd() {
  let background = document.getElementById("pokedex");
  let loader = document.getElementById("loader");
  loader.classList.add("d-none");
  background.classList.remove("d-none");
  document.getElementById("loaderBackground").classList.remove("d-none");
}

async function loadPokemons(x, y) {
  for (let p = y; p < x; p++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${p}`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    pokemons.push(currentPokemon);
    loadedPokemon[0]++;
  }
  renderPokemonInfo(x - 1, y - 1);
}

async function initLoadMorePokemon() {
  let button = document.getElementById("buttonRenderMorePokemon");
  let loadingSpinner = document.getElementById("spinnerLoaderMorePokemon");
  button.classList.add("d-none");
  loadingSpinner.classList.remove("d-none");
  await loadMorePokemon();
  loadingSpinner.classList.add("d-none");
  button.classList.remove("d-none");
}

async function loadMorePokemon() {
  let y = loadedPokemon[0] + 1;
  let x = y + 20;
  if (x == 139) {
    for (let i = y; i < 151; i++) {
      await loadPokemons(x, y);
    }
    displayNoneMorePokemonButton();
  } else {
    await loadPokemons(x, y);
  }
}

function renderMorePokemonInfo() {
  let y = loadedPokemon[0];
  let x = y + 20;

  if (x == 139) {
    for (let i = y; i < 151; i++) {
      helpfunctionRenderMorePokemonInfo(i);
    }
    displayNoneMorePokemonButton();
  } else {
    for (let i = y; i < x; i++) {
      helpfunctionRenderMorePokemonInfo(i);
    }
  }
}

async function loadEvolutionOfPokemon(pokemonId) {
  for (let j = 0; j < pokemons[i][2].length; j++) {
    const evolution = array[j];

    let url = `https://pokeapi.co/api/v2/evolution-chain/${pokemonId}`;
    let response = await fetch(url);
    evolutionOfCurrentPokemon = await response.json();
    evolutionOfCurrentPokemon.push(pokemonEvolution);
  }
}

async function renderPokemonInfo(x, y) {
  for (let i = y; i < x; i++) {
    let pokemonCard = document.getElementById("pokedex");
    let pokemonName = pokemons[i]["name"];
    let capitalizedWord = await toUpperCase(pokemonName);

    pokemonCard.innerHTML += templateRenderPokemonInfo(i, capitalizedWord);
    addBackgroundColorSmallCard(i, capitalizedWord);
  }
}

function displayNoneMorePokemonButton() {
  document.getElementById("buttonRenderMorePokemon").classList.add("d-none");
}

async function toUpperCase(pokemonName) {
  let word = pokemonName;
  let firstLetter = word.charAt(0);
  let firstLetterCap = firstLetter.toUpperCase();
  let remainingLetters = word.slice(1);
  let capitalizedWord = firstLetterCap + remainingLetters;
  return capitalizedWord;
}

function checkType(typeContainer, pokemonType) {
  let colorClass = typeColors[pokemonType] || "bg_default";
  typeContainer.classList.add(colorClass);
}

async function openPokemonCard(i, pokemonJSON) {
  let pokemonInfoCard = document.getElementById("pokemonCard");
  let openCardBackground = document.getElementById("openCardBackground");
  let pokedex = document.getElementById("pokedex");
  let name = await toUpperCase(pokemons[i]["name"]);
  pokemonInfoCard.classList.remove("d-none");
  openCardBackground.classList.remove("d-none");
  pokedex.classList.add("d-none");
  await openPokemonCardHTML(pokemonInfoCard, i, pokemonJSON, name);
  lastContainerId = `card${i}`;
  displayNoneMorePokemonButton();
}

async function openPokemonCardHTML(pokemonInfoCard, i, currentPokemon, name) {
  pokemonInfoCard.innerHTML = templateOpenPokemonCard(i, name);
  await loadInformation(i);
}

function closePokemonCard() {
  let pokemonInfoCard = document.getElementById("pokemonCard");
  pokemonInfoCard.innerHTML = ``;
}

function pokemonTypes(i) {
  checkType(i);
}

async function typeInformation(i) {
  let typeContainer = document.getElementById(`typeInfoBox${i}`);
  for (let j = 0; j < pokemons[i]["types"].length; j++) {
    const type = pokemons[i]["types"][j]["type"]["name"];
    let typeInfo = document.createElement("div"); 
    typeInfo.className = "type-container";
    typeInfo.innerHTML = `${type}`;
    typeInfo.classList.add("typeBox");
    typeContainer.appendChild(typeInfo); 
    await checkType(typeInfo, type); 
    await addBackgroundColor(i);
  }
}

function closeBackground() {
  let openCardBackground = document.getElementById("openCardBackground");
  let pokedex = document.getElementById("pokedex");
  openCardBackground.classList.add("d-none");
  pokedex.classList.remove("d-none");
  closePokemonCard();
  document.getElementById("buttonRenderMorePokemon").classList.remove("d-none");

  let lastContainer = document.getElementById(lastContainerId);
  lastContainer.scrollIntoView({
    behavior: "auto",
    block: "center",
  });
}

function addBackgroundColor(i) {
  let type = pokemons[i]["types"][0]["type"]["name"];
  let colorClass = typeColors[type] || "bg_default";
  let card = document.getElementById(`imageBackground${i}`);
  card.classList.add(colorClass);
}

function addBackgroundColorSmallCard(i) {
  let type = pokemons[i]["types"][0]["type"]["name"];
  let colorClass = typeColors[type] || "bg_default";
  let smallCard = document.getElementById(`imageBackgroundSmallCard${i}`);
  smallCard.classList.add(colorClass);
}

function filterPokemon() {
  let search = document.getElementById("search").value.toLowerCase();
  let pokemonCard = document.getElementById("pokedex");
  pokemonCard.innerHTML = "";

  if (search.trim() === "") {
    for (let i = 0; i < pokemons.length; i++) {
      renderSearchedPokemonInfo(i);
    }
  } else {
    for (let i = 0; i < pokemons.length; i++) {
      let pokemon = pokemons[i].name;

      if (pokemon.toLowerCase().includes(search)) {
        renderSearchedPokemonInfo(i);
      }
    }
  }
}

async function renderSearchedPokemonInfo(i) {
  let pokemonCard = document.getElementById("pokedex");
  let pokemonName = pokemons[i]["name"];
  let capitalizedWord = await toUpperCase(pokemonName);

  pokemonCard.innerHTML += templateRenderPokemonInfo(i, capitalizedWord);
  addBackgroundColorSmallCard(i, capitalizedWord);
}

function statBar(i) {
  let bar = document.getElementById("statusBar");
  bar.innerHTML = ``;
  for (let x = 0; x < pokemons[i]["stats"].length; x++) {
    let statValue = pokemons[i]["stats"][x]["base_stat"];
    bar.innerHTML += /*html*/ `
    <div class="statusBar">
      <div class="statusValueName">${pokemons[i]["stats"][x]["stat"]["name"]}
      </div>
      <progress id="progressBar" class="progressBar" max="150" value="${statValue}">
      </progress>
    </div>  
`;
  }
}

function loadStats(i) {
  let box = document.getElementById("statusBar");
  box.innerHTML = /*html*/ ``;
  statBar(i);
}

function loadInformation(i) {
  let box = document.getElementById("statusBar");
  box.innerHTML = ``;
  box.innerHTML = templateLoadInformation(i);
  typeInformation(i);
}

async function loadAbility(i) {
  let box = document.getElementById("statusBar");
  box.innerHTML = ``;

  for (let x = 0; x < pokemons[i]["abilities"].length; x++) {
    let ability = pokemons[i]["abilities"][x]["ability"]["name"];
    let url = pokemons[i]["abilities"][x]["ability"]["url"];
    box.innerHTML += /*html*/ `
    <div class="abilityContainer"><b>${ability}:</b></div>  
    <div class="abilityContainer" id="ability${x}"></div>
    `;
    await fetchAbilityUrl(url, x);
  }
}

async function fetchAbilityUrl(url, x) {
  let response = await fetch(url);
  currentAbility = await response.json();
  ability.push(currentAbility);

  document.getElementById(`ability${x}`).innerHTML = /*html*/ `
    <div>${ability[0]["flavor_text_entries"][0]["flavor_text"]}</div>
    `;
  ability.splice(0);
}

function helpFunctionForArrowRight(i) {
  if (i == pokemons.length-1) {
    let i = 0;
    openPokemonCard(i);
  } else {
    openPokemonCard(i + 1);
  }
}

function helpFunctionForArrowLeft(i) {
  if (i == 0) {
    let i = pokemons.length-1;
    openPokemonCard(i);
  } else {
    openPokemonCard(i - 1);
  }
}
