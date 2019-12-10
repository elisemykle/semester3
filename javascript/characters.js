const characterList = document.getElementById("characterList");
const player1Select = document.getElementById("player1Select");
player1Select.addEventListener("click", function(){
    selectPlayer(0);
})
const player2Select = document.getElementById("player2Select");
player2Select.addEventListener("click", function() {
    selectPlayer(1);
})
const ids = [583, 1303, 955, 1052, 148, 216, 1709, 2069, 238, 1319];//1319
let characters = [];
currentPlayer = 0;

//API call
function charCall() {
    let url = "https://anapioficeandfire.com/api/characters/";
    for (let char of ids) {
        fetch(url + char + "?time=" + (new Date()).getTime + "")
            .then(response => response.json())
            .then(function (data) {
                characters.push(data);
                if (characters.length === 10) {
                    createCharacters(characters);
                }
            })
            .catch(error => console.log(error));
    }
}//function charCall
charCall();

function createCharacters(characters){
    characterList.innerHTML = "";
    let i = 0;
    for (let char of characters) {
        console.log(char);
        let characterWrapper = document.createElement("div");
        characterWrapper.classList.add("item");
        characterWrapper.setAttribute("id", "character" + (i+1));

        //Character Image //
        let characterImage = document.createElement("img");
        characterImage.src = "img/characterimg/" + char.name + ".png";
        characterImage.alt = "image of " + char.name + " from game of thrones";
        characterImage.addEventListener("click", function(){
            selectCharacter(char, characterWrapper);
        })
        characterWrapper.appendChild(characterImage);
        //End of Character Image //

        // Character name
        let characterName = document.createElement("h3");
        characterName.innerHTML = char.name;
        characterWrapper.appendChild(characterName);
        // End of Character name

        let characterContent = document.createElement("div");
        characterContent.classList.add("contentWrapper");

        // Character name
        let contentName = document.createElement("h3");
        contentName.classList.add("characterName");
        contentName.classList.add("content");
        contentName.innerHTML = char.name;
        characterContent.appendChild(contentName);
        // End of Character name


    // Character Gender //
        let contentGender = document.createElement("div");
        contentGender.classList.add("characterGender");
        contentGender.classList.add("content");

        let contentGenderLabel = document.createElement("strong");
        contentGenderLabel.innerHTML = "Gender : ";

        let contentGenderText = document.createElement("span");
        if (char.gender){
            contentGenderText.innerHTML = char.gender;
        } else{
            contentGenderText.innerHTML = "Unknown";
        }
        contentGender.appendChild(contentGenderLabel);
        contentGender.appendChild(contentGenderText);
        characterContent.appendChild(contentGender);
        // Character Gender end

        // Character Aliases
        let contentAliases = document.createElement("div");
        contentAliases.classList.add("characterAliases");
        contentAliases.classList.add("content");

        let contentAliasesLabel = document.createElement("strong");
        contentAliasesLabel.innerHTML = "Aliases: ";

        let contentAliasesText = document.createElement("span");
        if (char.aliases){
            for (let alias of char.aliases){
                if (alias !== char.aliases[char.aliases.lenght-1]){
                    contentAliasesText.innerHTML += alias + ", ";
                } else{
                    contentAliasesText.innerHTML += alias;
                }
            }
        } else{
            contentAliasesText.innerHTML = "Unknown / none";
        }
        contentAliases.appendChild(contentAliasesLabel);
        contentAliases.appendChild(contentAliasesText);
        characterContent.appendChild(contentAliases);
        // Characters Aliases end

        // Character Title
        let contentTitle = document.createElement("div");
        contentTitle.classList.add("characterTitle");
        contentTitle.classList.add("content");

        let contentTitleLabel = document.createElement("strong");
        contentTitleLabel.innerHTML = "Titles: ";

        let contentTitleText = document.createElement("span");
        if (char.titles[0] !== ""){
            for (let title of char.titles) {
                if (title !== char.titles[char.titles.length-1]) {
                    contentTitleText.innerHTML += title + ", ";
                } else{
                    contentTitleText.innerHTML += title;
                }
            }
        } else {
            contentTitleText.innerHTML = "none";
        }
        contentTitle.appendChild(contentTitleLabel);
        contentTitle.appendChild(contentTitleText);
        characterContent.appendChild(contentTitle);
        // Character Title end

        // Character Allegiances
        let contentAllegiances = document.createElement("div");
        contentAllegiances.classList.add("characterAllegiances");
        contentAllegiances.classList.add ("content");

        let contentAllegiancesLabel = document.createElement("strong");
        contentAllegiancesLabel.innerHTML = "Allegiances: ";

        let contentAllegiancesText = document.createElement("span");
        if (char.allegiances){
            let allegianceList = [];
            for (let allegiance  of char.allegiances) {
                fetch(allegiance)
                    .then(response => response.json())
                    .then(function (data) {
                        allegianceList.push(data);
                        if (allegiance === char.allegiances[char.allegiances.length-1]) {
                            createAllegiances();
                        }
                    })
            }
            function createAllegiances() {
                for (let allegiance of allegianceList) {
                    if (allegiance !== allegianceList[allegianceList.length -1]) {
                        contentAllegiancesText.innerHTML += allegiance.name + ", "
                    } else {
                        contentAllegiancesText.innerHTML += allegiance.name;
                    }
                    console.log(contentAllegiancesText);
                }
            }
        } else{
            contentAllegiancesText.innerHTML = "Unknown";
        }
        contentAllegiances.appendChild(contentAllegiancesLabel);
        contentAllegiances.appendChild(contentAllegiancesText);
        characterContent.appendChild(contentAllegiances);
        // Character Allegiances end

        // Character Culture
        let contentCulture = document.createElement("div");
        contentCulture.classList.add("characterCulture");
        contentCulture.classList.add("content");

        let contentCultureLabel = document.createElement("strong");
        contentCultureLabel.innerHTML = "Culture: ";

        let contentCultureText = document.createElement("span");
        if (char.culture){
            contentCultureText.innerHTML = char.culture;
        } else{
            contentCultureText.innerHTML = "Unknown";
        }
        contentCulture.appendChild(contentCultureLabel);
        contentCulture.appendChild(contentCultureText);
        characterContent.appendChild(contentCulture);
        //End of Character Culture

        // Character Born
        let contentBorn = document.createElement("div");
        contentBorn.classList.add("characterBorn");
        contentBorn.classList.add("content");

        let contentBornLabel = document.createElement("strong");
        contentBornLabel.innerHTML = "Born: ";

        let contentBornText= document.createElement("span");
        if (char.born){
                contentBornText.innerHTML = char.born;
        } else{
            contentBornText.innerHTML = "Unknown";
        }
        contentBorn.appendChild(contentBornLabel);
        contentBorn.appendChild(contentBornText);
        characterContent.appendChild(contentBorn);


        // Character button
        let characterButton = document.createElement("button");
        characterButton.type = "button";
        characterButton.classList.add("readMore");
        characterButton.innerHTML = "READ MORE";
        characterButton.addEventListener("click", function () {
            openReadMore(characterWrapper   , characterButton)
        })
        characterWrapper.appendChild(characterButton);
        // End of Character button

        characterWrapper.appendChild(characterContent);
        characterList.appendChild(characterWrapper);
        // Characters Born end

        i++;
    }
}

function openReadMore(element, button) {
    console.log(element, button);
    element.classList.toggle("showReadMore");
}

var header = document.getElementById("playerbuttons");
var btns = header.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  this.className += " active";
  });
}

function selectPlayer(player) {
    currentPlayer = player;
}

var charSelected = [];
function selectCharacter(character, element){
    let preCharSelected = document.getElementsByClassName('player' + (currentPlayer+1) + "char")[0];
    if (preCharSelected) {
        preCharSelected.classList.remove("player" + (currentPlayer+1) + "char");
        preCharSelected.classList.remove("charSelected");
    }
    charSelected[currentPlayer] = {player:currentPlayer, name: character.name, pawn: "img/players/" + character.name + ".png"};
    element.classList.add("player" + (currentPlayer+1) + "char");
    element.classList.add("charSelected");
}

function startGame(){
    console.log(charSelected.length);
    if (charSelected.length === 2) {
        localStorage.setItem("players", JSON.stringify(charSelected));
        window.location = "board.html";
    }
}
