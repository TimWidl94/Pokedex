function templateOpenPokemonCard(i, name) {
  return `
    <div class="card mb-3 openCard" id="card${i}">
    <div class="imageBackground" id="imageBackground${i}">  
    <button class="buttonNextPokemon" onclick="helpFunctionForArrowLeft(${i})">
    <img class="arrowButton" src="./image/arrowLeft.png"></img>
    </button>
      <img class="openImage" src="${pokemons[i]["sprites"]["other"]["official-artwork"]["front_default"]}" class="card-img-top" alt="${currentPokemon}">
      <button class="buttonNextPokemon" onclick="helpFunctionForArrowRight(${i})">
      <img class="arrowButton" src="./image/arrowRight.png"></img>
      </button>
      </div>
    <div class="mainBody"> 
      <div class="buttonListLeft flexColum">
        <button class="attributeButton rotate-text buttonInformation" id="" onclick="loadInformation(${i})">Information</button>
        <button class="attributeButton rotate-text buttonStats" id="" onclick="loadStats(${i})">Stats</button>
        <button class="attributeButton rotate-text buttonAbilities" id="" onclick="loadAbility(${i})">Abilities</button>
      </div>
      <div class="cardMainBody">
        <div class="" id="showContainer">
          <h3 class="card-title">${name}</h3>
        </div>  
        <div id="statusBar"> </div>
      </div>
      <div class="helpContainer"></div>
    </div>
    <div class="numberContainer">
      <p class="number" id="number${i}">Nr. <b>${pokemons[i]["id"]}</b></p>
    </div>    
  </div> 
    
    `;
}

function templateRenderPokemonInfo(i, name) {
  return `
    <div class="card" id="card${i}" style="width: 18rem;" onclick="openPokemonCard(${i})">
      <div class="imgContainer">
        <img src="${pokemons[i]["sprites"]["other"]["official-artwork"]["front_default"]}" class="card-img-top" alt="${currentPokemon}" id="imageBackgroundSmallCard${i}">
      </div>  
    <div class="card-body">
      <h5 class="card-title">${name}</h5>
      <!-- <div class="card-text" id="typeInfoBox${i}"></div> -->
      <p class="number" id="number${i}">Nr. <b>${pokemons[i]["id"]}</b></p>
    </div>
  </div>`;
}

function templateLoadInformation(i) {
  return `
<div class="card-text" id="typeInfoBox${i}"></div>
  <div class="heightWeightBox">
    <div class="weightHeightContainer"> 
      <p>Height:</p>
      <p>${pokemons[i]["height"]}</p>
    </div> 
    <div class="weightHeightContainer"> 
      <p>Weight:</p>
      <p>${pokemons[i]["weight"]}</p>
    </div> 
  </div>
</div>
`;
}
