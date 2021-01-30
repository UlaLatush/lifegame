let dots = [];
let divs = [];
let ROWS = 0;
let COLS = 0;
const CELL_SIZE = 20;
let button = document.getElementsByClassName('next')[0];

function onCellClick(event) {
    let parentDiv = event.path[0];
    parentDiv.style = "width: " + CELL_SIZE + "px; height: " + CELL_SIZE + "px; border: 1px dotted grey; background-color: red;";
    let index = parseInt(parentDiv.dataset.row) * COLS + parseInt(parentDiv.dataset.col);
    console.log(index);
    dots[index] = true;
    drawField(dots);
}

button.addEventListener('click', onNextClick);

function onNextClick() {

    let newDots = [];
    for(let i = 0; i < ROWS*COLS; i++) {
        let x = i%COLS;
        let y = Math.floor(i/COLS);
        let neighbours = 0;

        for(let b = y - 1; b <= y+1; b++) {
            for(let a = x - 1; a <= x+1; a++) {
                let position = b*COLS + a;
                if(a >= 0 && a < COLS && b >= 0 && b < ROWS && (a !== x || b !== y )){
                    if(dots[position]) {
                        neighbours++;
                    }
                }
            }
        }

        if(neighbours === 3) {
            newDots.push(true);
        } else if (neighbours === 2 && dots[i] === true) {
            newDots.push(true);
        } else {
            newDots.push(false);
        }

    }

    dots = newDots;
    drawField(newDots);
}

function fillDiv(i) {
    divs[i].style = "width: " + CELL_SIZE + "px; height: " + CELL_SIZE + "px; border: 1px dotted grey; background-color: red;";
}

function clearDiv(i) {
    divs[i].style = "width: " + CELL_SIZE + "px; height: " + CELL_SIZE + "px; border: 1px dotted grey; background-color: none;";
}

function drawField(array) {
    for (let i = 0; i < array.length; i++) {
        if(array[i] === true) {
            fillDiv(i);
        }else{
            clearDiv(i);
        }
    }
}


function initializeField() {

    let body = window.document.body;
    let outerDiv = document.getElementById("outerDiv");
    let w = body.clientWidth;
    let h = window.innerHeight;

    let s = "width: " + CELL_SIZE + "px; height: " + CELL_SIZE + "px; border: 1px dotted grey;";

    COLS = Math.floor(w / CELL_SIZE);
    ROWS = Math.floor(h / CELL_SIZE);

    let div = outerDiv.firstChild;

    for (let j = 0; j < ROWS; j++) {
        let rowDiv = document.createElement('div');
        rowDiv.style = "display: flex; flex-direction: row;";
        outerDiv.insertAdjacentElement('beforeend', rowDiv);
        for (let i = 0; i < COLS; i++) {
            let newDiv = document.createElement('div');
            newDiv.style = s;
            newDiv.dataset.col = i;
            newDiv.dataset.row = j;
            rowDiv.insertAdjacentElement('beforeend', newDiv);

            rowDiv.addEventListener('mouseup', onCellClick);
            dots.push(false);
            divs.push(newDiv);
        }

    }

}

initializeField();
