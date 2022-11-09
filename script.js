document.body.style.backgroundColor = 'grey';
const display= document.getElementById("display");
const container= document.getElementById("container"); // 

function Graph(){
    return{
        board: new Map(),
        addVertices(size = 8){ //Create 8x8 grid
            for (let i=0; i<size; i++){
                for (let j=0; j<size; j++){
                    this.board.set( `${[i,j]}`,[]);
                
                }
            }   
        },

        addEdges(board=this.board){ //Add neighbors
            for (let [pos] of board){//for each tile
                const posArr = pos.split(','); //set coords 'i, j' to index ['i', 'j']; 
                const x = parseInt(posArr[0]); //convert to int 
                const y = parseInt(posArr[1]);
                const direction = {1: [x+1,y+2], 2:[x+2,y+1], 
                    4:[x+2,y-1], 5:[x+1,y-2], 7:[x-1,y-2],
                    8:[x-2,y-1], 10:[x-2,y+1], 11:[x-1,y+2]
                }

                for (let clock in direction){
                    const move = direction[clock].toString();
                    if (board.has(move) && !board.get(pos).includes(move)){ 
                        //Insert directions into tile 
                        this.board.get(pos).push(move);
                    }
                }
                //console.log(board);
            }

    },
    drawGraph(start, end, paths, board=this.board){
        const container= document.getElementById("container"); // 
        container.style.gridTemplateRows = `repeat(8,50px)`; // For each row, set to row width based on .grid class width 
        container.style.gridTemplateColumns = `repeat(8,50px)`; // Repeat for col
        container.style.display = 'grid';
        
        let color = true;
        let pathColor = ['salmon', 'khaki', 'palegreen', 'cadetblue', 'plum', 'peru',
            'rosybrown', 'gray', 'slategray', 'pink', 'lightpink', 'thistle', 'purple'];

        for (let [pos] of board){ 
            let cell = document.createElement('tile'); 
            if (pos[2]==0) {color=!color;} //stagger grid color 
            color? cell.style.backgroundColor ='white' : cell.style.backgroundColor ='black';
            
            for (let i=0; i<paths.length;i++){
                if (paths[i].includes(pos)){cell.style.backgroundColor = pathColor[i];
                cell.textContent = paths[i].indexOf(pos);
                cell.style.display = 'flex';
                cell.style.justifyContent = 'center';
                cell.style.alignItems = 'center';
            }
            }

            if (pos == start){cell.style.backgroundColor ='red'};
            if (pos == end){cell.style.backgroundColor ='green'};
            
            color = !color;
            cell.className = pos;
            cell.style.border = '1px solid black';

            cell.addEventListener('click', () => {
                if (!start){
                start = pos;
                cell.style.backgroundColor ='red'

                document.getElementById("display").innerHTML="";
                let descrip = document.createElement('display');
                display.textContent = 'Choose goal';
                display.append(descrip);
                
            }
                else if (!end){
                    end = pos; 
                    cell.style.backgroundColor ='green';
                    document.getElementById("container").innerHTML="";
                    this.moveKnight(start, end); 
                    g.resetBoard();
                }
            
            })

            container.append(cell);
            
        }
    },

    moveKnight(start, end){
        const paths = [];
        const visited = new Set();
        const queue = [];
        queue.push([start, [start] ]);
        while (queue.length){
            let [current, path] = queue.shift(); //input current node &
            visited.add(current); 
            if (current === end){
                paths.push(path); // path found
            }
            const neighbors = this.board.get(current); //gets neighbor values
            for (let pos of neighbors){
                if (!visited.has(pos)){
                    queue.push([pos, [...path,pos]]); //add next node + neighbors to queue
                }
            }
            }
        console.log(paths)
        this.drawGraph(start, end, paths);
    },

    resetBoard(board = this.board){ 
        let reset = document.createElement('button'); 
        reset.textContent = 'Reset Board';
        reset.addEventListener('click', () => {
            document.getElementById("container").innerHTML="";
            document.getElementById("display").innerHTML="";
            let descrip = document.createElement('display');
            descrip.textContent = 'Choose start';
            display.append(descrip);
            this.drawGraph('','',''); 


        })

        container.append(reset); 

    },



}
}




// drawGrid(9,9);

//moveKnight(grid, 3,3, [6,6]);

const g = new Graph();
g.addVertices();
g.addEdges(); 
g.moveKnight( '0,0', '5,5')
g.resetBoard();
