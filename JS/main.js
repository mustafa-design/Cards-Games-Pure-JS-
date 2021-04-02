document.querySelector(".control-buttons span").onclick = function () {
    var yourName = prompt("What is your name?");

    if (yourName == null || yourName == "") {
        document.querySelector(".name span").innerHTML = "Unknown"
    } else {
        document.querySelector(".name span").innerHTML = yourName;
    }

    document.querySelector(".control-buttons").remove();
};

// Effect duration
var duration = 1000,
    blocksContainer = document.querySelector(".memory-game-blocks"),
    blocks = Array.from(blocksContainer.children),
    orderRange = [...Array(blocks.length).keys()];
    // OR
    // var orderRange = Array.from(Array(blocks.length).keys());

shuffle(orderRange);

// Add order css propety to game blocks
blocks.forEach((block, index) => {

    // Add css order property
    block.style.order = orderRange[index];

    // Add click event
    block.addEventListener('click', function () {

        // Trigger the flip block function
        flipBlock(block);

    })

})

// Flip block function
function flipBlock(selectedBlock) {

    // Add class is-flipped
    selectedBlock.classList.add('is-flipped');

    // Collect all flipped cards
    var allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

    // If there is two selected blocks
    if (allFlippedBlocks.length === 2) {

        // Stop clicking function
        stopClicking();

        // Check matched blocks function
        matchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
    }

};

function stopClicking() {
    blocksContainer.classList.add('no-clicking');

    setTimeout(() => {
        blocksContainer.classList.remove('no-clicking');
    }, duration)

};

// check matched blocks
var triesElement = document.querySelector('.tries span');

function matchedBlocks(firstBlock, secondBlock) {


    if (firstBlock.dataset.images === secondBlock.dataset.images) {

        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');

    } else {

        triesElement.innerHTML = parseInt(triesElement.innerHTML) - 1;

        setTimeout(() => {

            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');

        }, duration)

    }

}

// console.log(triesElement.innerHTML === "20");
// function failed() {
//     if (triesElement.innerHTML === "19"){
//         console.log("failed");
//     }
// }
// failed();

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

console.log(shuffle(orderRange));