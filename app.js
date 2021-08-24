// Dino constructor
function Dino(species, weight, height, diet, where, when, fact) {
  this.species = species;
  this.weight = weight;
  this.height = height;
  this.diet = diet;
  this.where = where;
  this.when = when;
  this.fact = fact;
}
// Global Objects
const dinoObjects = [];
const humanObject = {};

console.log(humanObject);

const mytest = new Dino(
  "Stegosaurus",
  11600,
  79,
  "herbavor",
  "North America, Europe, Asia",
  "Late Jurasic to Early Cretaceous",
  "The Stegosaurus had between 17 and 22 seperate places and flat spines."
);

// Compare Weight
Dino.prototype.compareWeight = function (humanWeight, dinoWeight, dinoName) {
  if (humanWeight > dinoWeight) {
    return `You are weighter than ${dinoName}`;
  } else if (dinoWeight > humanWeight) {
    return `${dinoName} is weighter than you`;
  } else if (dinoWeight === humanWeight) {
    return `You and ${dinoName} are the same weight`;
  }
};

// Compare Height
Dino.prototype.compareHeight = function (humanHeight, dinoHeight, dinoName) {
  if (humanHeight > dinoHeight) {
    return `You are taller than ${dinoName}`;
  } else if (dinoHeight > humanHeight) {
    return `${dinoName} is taller than you`;
  } else if (dinoHeight === humanHeight) {
    return `You and ${dinoName} are the same tall`;
  }
};

// Compare Diet
Dino.prototype.compareDiet = function (humanDiet, dinoDiet) {
    if (humanDiet === dinoDiet) {
      return `you and the ${this.species} are ${this.diet}s`;
    } else {
      return `While you prefer ${humanDiet}, The ${this.species} prefers a ${dinoDiet}`;
    } 
  };

Dino.prototype.tile = function () {
    console.log("this is tile !!!")
};

// Generate Facts
Dino.prototype.generateFacts=function() {

  let randomNumber = Math.floor(Math.random()*7)
    // switch
    switch(randomNumber) {
        case 1:
            return this.compareHeight(humanObject.inches,22, this.species)
        break;
        case 2:
          return this.compareWeight(humanObject.weight, this.weight, this.species);
        break;
        case 3 :
          return this.compareDiet(humanObject.diet, this.diet);
        
        case 4:
          return `The ${this.species} could be found in ${this.where}`;
        break;
        case 5:
          return `The ${this.species} lived in ${this.when}`;
        break;
        case 6 :
          return `${this.fact}`
        break;  
        default:
        return this.compareHeight(humanObject.inches,this.height, this.species)
        break;
    }

  }

// get dinasaurces from dino.json
async function getdata() {
  const response = await fetch("dino.json");
  const data = await response.json();
  return data;
}

//  Create dino tiles
const generatTiles = async () => {
  let theList = document.getElementById("grid");
  let the_data = await getdata();
  let getDino = '';
  const humanTale = `<div class='grid-item'><img src=images/human.png /></div>`

  the_data.Dinos.forEach((dino, index) => {
    const denoTile = new Dino(
      dino.species,
      dino.weight,
      dino.height,
      dino.diet,
      dino.where,
      dino.when,
      dino.fact
    );

    dinoObjects.push(denoTile)
    if (index === 4) {
        getDino += humanTale;
      }
      getDino += `<div class='grid-item'>
        <h3>${denoTile.species}</h3>
        <img src="images/${denoTile.species}.png" />
        <p>${denoTile.generateFacts()}</p>
        </div>
        `;
        denoTile.tile()
        console.log(denoTile.generateFacts(1))
  });
  

  return theList.innerHTML = getDino;
};

// Get data from form
(function pullData() {
  const form = document.getElementById("dino-compare");
  const btn = document.getElementById("btn");
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const feet = document.getElementById("feet").value;
    const inches = document.getElementById("inches").value;
    const weight = document.getElementById("weight").value;
    const diet = document.getElementById("diet").value;
    Object.assign(humanObject, {name, feet, inches, weight, diet});
    form.style.display = "none";
    generatTiles();
  });
})();
