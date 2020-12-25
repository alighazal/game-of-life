let create2DArray = (cols, rows) => {

    let Grid = new Array(cols);

    for (let i = 0; i < cols; i++) {
        Grid[i] = new Array(rows);
    }

    return Grid;

}


let countNeighbors =  (grid, x, y) => {

    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for(let j = -1; j < 2; j++){

            let col = (x + i + cols) % cols;
            let row = (y + j + rows) % rows;
            sum += grid[col][row];

        }
    }
    sum -= grid[x][y];
    return sum;
}


let rows;
let cols;
let resolution = 20; 
let grid;
let next;

let slider;

function setup() {
    createCanvas(500 , 500);
    textSize(15);
    
    rows = width / resolution;
    cols = height / resolution;

    grid = create2DArray(rows, cols);

    for (let i = 0; i < rows; i++) { 
        for (let j = 0; j < cols; j++) {

            grid[i][j] = floor(random(2));

        }
    } 

    slider = createSlider(10, 1000, 100);

}


function draw() {
    background(0);

    let val = slider.value();

    for (let i = 0; i < rows; i++) { 
        for (let j = 0; j < cols; j++) {
            
            let x = i * resolution;
            let y = j * resolution;
            
            if (grid[i][j] == 1){
                
                fill(255);
                stroke(0);
                
                rect(x,y , resolution - 1 , resolution - 1 );
                
            }
        }
    }

    let next = create2DArray(cols, rows);
    
    // Compute next based on grid
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
        let state = grid[i][j];
        // Count live neighbors!
        let sum = 0;
        let neighbors = countNeighbors(grid, i, j);

        if (state == 0 && neighbors == 3) {
            next[i][j] = 1;
        } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
            next[i][j] = 0;
        } else {
            next[i][j] = state;
        }
        }
    }

    setTimeout ( ()=> {
       
        grid = next;

    }, val);

}


