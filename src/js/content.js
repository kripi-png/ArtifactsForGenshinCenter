


function main() {

  createAllSlots();


}









// create artifact slot elements for each character
const createAllSlots = function () {

  [...document.querySelector('.Farm_itemList__zk7_j').children].forEach( panel => {
    let name = panel.querySelector('.ItemPanel_itemName__3SNcx > p').innerHTML;
    console.log(name, isWeapon(panel));

    if ( !isWeapon(panel) ) {
      createSlotsForPanel(panel);
    }
  });
}

const createSlotsForPanel = function (panel) {

  let wrapperDiv = document.createElement('div');
  wrapperDiv.classList.add('artifactSlotsWrapper');

  let flowerSlot = document.createElement('div');
  flowerSlot.classList.add('artifactSlot', 'flowerSlot');
  flowerSlot.title = "Click here to select a flower!";
  wrapperDiv.appendChild(flowerSlot);

  let plumeSlot = document.createElement('div');
  plumeSlot.classList.add('artifactSlot', 'plumeSlot');
  plumeSlot.title = "Click here to select a plume!";
  wrapperDiv.appendChild(plumeSlot);

  let sandsSlot = document.createElement('div');
  sandsSlot.classList.add('artifactSlot', 'sandsSlot');
  sandsSlot.title = "Click here to select a sands!";
  wrapperDiv.appendChild(sandsSlot);

  let gobletSlot = document.createElement('div');
  gobletSlot.classList.add('artifactSlot', 'gobletSlot');
  gobletSlot.title = "Click here to select a goblet!";
  wrapperDiv.appendChild(gobletSlot);

  let circletSlot = document.createElement('div');
  circletSlot.classList.add('artifactSlot', 'circletSlot');
  circletSlot.title = "Click here to select a circlet!";
  wrapperDiv.appendChild(circletSlot);



  panel.querySelector('.ItemPanel_itemContent__1D5XB').appendChild(wrapperDiv);

}

function createHoverPopup() {

}

function saveToCookies(data) {
  return ;
}

function loadFromCookies() {
  return ;
}

// returns whether {panel} is a weapon by checking the source of the panel's image
// e.g. src='/images/weapons/regular/Deathmatch.png'
const isWeapon = function (panel) {
  return panel.querySelector('.ItemPanel_itemImage__2fZwL > img').src.includes('weapons');
}

const waitForCharacterList = setInterval(function() {
   if (document.querySelector('.Farm_itemList__zk7_j')) {
     clearInterval(waitForCharacterList);
     console.log("Character list loaded!");

     main();
   }
}, 100);
