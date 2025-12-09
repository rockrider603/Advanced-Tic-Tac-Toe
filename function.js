
let smallboxes = document.querySelectorAll(".box");
let bigboxes = document.querySelectorAll(".big-box");
let turnO = true;
let parentgame = document.querySelector(".game");
let changedbox;
let check = Array(9).fill("");

// const classToIndex = {
//     zero: 0, one: 1, two: 2, three: 3, four: 4, 
//     five: 5, six: 6, seven: 7, eight: 8
// };

let win_patterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
];

function clickOK() {
    let rulebtn = document.getElementById("okbutton");

    rulebtn.addEventListener("click", () => {
        // hide rules
        document.getElementById("mainrules").classList.add("hidden");

        // show game board
        document.getElementById("mainboard").classList.remove("hidden");
    });
}

function attachSmallBoxListeners() {
    smallboxes.forEach((smallbox) => {
        smallbox.addEventListener("click", () => {
            let parent = smallbox.parentElement;

            if (!parent.classList.contains("highlight")) {
                return;
            }

            if (turnO) {
                smallbox.innerText = "O";
                turnO = false;
            } else {
                smallbox.innerText = "X";
                turnO = true;
            }

            smallbox.disabled = true;

            let key = smallbox.classList[1];
            let nextindex = classToIndex[key];

            if (changedbox) {
                changedbox.classList.remove("highlight");
            }

            changedbox = bigboxes[nextindex];
            if (changedbox) {
                changedbox.classList.add("highlight");
            }

            for (let i = 0; i < 9; i++) {
                if (i !== nextindex) bigboxes[i].classList.remove("highlight");
            }

            let winner_small_box = checkSmallBoxWinner(parent);
            if (winner_small_box) {
                let boxIndex = classToIndex[parent.classList[1]];
                check[boxIndex] = winner_small_box;
                markBigBox(parent, winner_small_box);
                let bigWinner = checkbigboxwinnerFromArray(check);

                if (bigWinner) {
                    document.getElementById("winner").innerText = `Winner is ${bigWinner}`;
                    document.getElementById("reset-btn").innerText="New Game";
                    for(let el of smallboxes){
                        el.disabled=true;
                    }
                }
            }

            if (changedbox && changedbox.classList.contains("X_Y-style")) {
                chooseblue();
            }

            checkhighlightclass();
        });
    });
}


function checkSmallBoxWinner(bigbox) {
    const cell = bigbox.querySelectorAll(".box");
    //map is used to change the contents of the array according to whats inside it.
    let arr = Array.from(cell).map(c => c.innerText);
    for (let pattern of win_patterns) {
        let [a, b, c] = pattern;
        if (arr[a] != "" && arr[a] == arr[b] && arr[b] == arr[c]) {

            return arr[a];
        }

    }
    return null;

}
/* mark big box objective:
1. remove the current css and mark the winner in that particular cell.
*/
function markBigBox(bigBox, winner) {
    // let child = bigBox.children;
    while(bigBox.firstChild){
        bigBox.removeChild(bigBox.firstChild);
    }
    bigBox.innerText = winner;
    bigBox.classList.add("X_Y-style");
}

// since all the big boxes are inside the game div, we take the values of the box elements from the game div
function checkbigboxwinner(game) {
    const cell = game.querySelectorAll(".big-box");
    let arr = Array.from(cell).map(c => c.innerText);
    for (let pattern of win_patterns) {
        let [a, b, c] = pattern;
        if (arr[a] != "" && arr[a] === arr[b] && arr[b] === arr[c]) {
            console.log(`${arr[a]} is winner`);
            return arr[a];
        }
    }
    return null;
}

function checkbigboxwinnerFromArray(arr) {
    for (let pattern of win_patterns) {
        let [a, b, c] = pattern;

        if (arr[a] !== "" && arr[a] === arr[b] && arr[b] === arr[c]) {
            return arr[a];
        }
    }
    return null;
}


function clickblue(baap) {
    for (let i = 0; i < 9; i++) {
        if (i === classToIndex[baap]) continue;
        // console.log(bigboxes[i].children[0]);
        for (let j = 0; j < 9; j++) {
            bigboxes[i].children[j].addEventListener("click", () => { alert("you can play only in the blue coloured box") });
            bigboxes[i].children[j].disabled = true;
        }
    }
}

function checkhighlightclass() {
    for (let i = 0; i < 9; i++) {
        const isHighlighted = bigboxes[i].classList.contains("highlight");
        const cells = bigboxes[i].querySelectorAll(".box"); // SAFE!

        cells.forEach(cell => {
            if (isHighlighted) {
                cell.classList.remove("buttondisabled");
            } else {
                cell.classList.add("buttondisabled");
            }
        });
    }
}





function chooseblue() {
    for (let i = 0; i < 9; i++) {
        bigboxes[i].classList.remove("highlight");

        if (bigboxes[i].classList.contains("X_Y-style")) {
            continue;
        } else {
            bigboxes[i].classList.add("highlight");
        }
    }
}


function numberToWord(n) {
    const words = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight"];
    return words[n];
}

function clearBoard() {
    for (let i = 0; i < 9; i++) {
        const bigbox = bigboxes[i];
        
        bigbox.classList.remove("X_Y-style");
        bigbox.innerText = "";
        
        if (!bigbox.classList.contains("highlight")) {
            bigbox.classList.add("highlight");
        }
        
        while (bigbox.firstChild) {
            bigbox.removeChild(bigbox.firstChild);
        }
        
        for (let j = 0; j < 9; j++) {
            const btn = document.createElement("button");
            btn.classList.add("box");
            let className = numberToWord(j);
            btn.classList.add(className);
            bigbox.appendChild(btn);
        }
    }
    
    smallboxes = document.querySelectorAll(".box");
    attachSmallBoxListeners();
    checkhighlightclass();
}

function resetGame() {
    clearBoard();

    turnO = true;
    check = Array(9).fill("");
    changedbox = null;
    document.getElementById("winner").innerText = "Winner";
    document.getElementById("reset-btn").innerText="Reset";
}

function newGame() {
    resetGame();
}
