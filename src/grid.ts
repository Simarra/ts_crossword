import { Cell } from './cell';
import { WordListDescr } from './words';


export class position {
    // interface used to standardise cell position.
    row: number;
    col: number;

    constructor(row: number, col: number) {
        this.row = row;
        this.col = col;

    };
};


export class Grid {
    // Core class: the board handler.

    //  Generate a grid
    //  Take next word
    //  Take random position.
    //  Take random direction.
    //  Test if word can be written
    //  If so write it. 
    //       If no, try next direction
    //       If no, Do the same on next cell
    //       If fail, go to next iteration
        //       If all cells failed, raise
    // Go to next word
    ITERATIONS: number = 50;
    nb_col: number;
    nb_row: number;
    words: WordListDescr;
    board: Array<Array<Cell>>;

    constructor(nb_col: number, nb_row: number, words: WordListDescr) {
        this.nb_col = nb_col;
        this.nb_row = nb_row;
        this.words = words;
    }

    public fill_board() {
        // Core method wich gen letters on the board.

        
        // Iterate

        // Generate the Board
        this.generate_board()


    };


    public show_grid_in_console(): void {
        // print the grid in console.
        for (let row of this.board) {
            let tmp_array = row.map(x => x.letter);
            console.info(tmp_array.join(" | "));
        }

    };

    public generate_board(): void {
        // Generate the board structure
        let row_it: number;
        this.board = [];
        for (let row_it = 0; row_it < this.nb_row; row_it++) {
            let tmp_row = new Array(this.nb_col);
            for (let col_it = 0; col_it < this.nb_col; col_it++) {
                tmp_row[col_it] = new Cell();
            }
            this.board.push(tmp_row);
        }
    };


    public get_cell(cell_pos: position): Cell {
        let result = this.board[cell_pos.row][cell_pos.col];
        return result;
    };

    public get_next_cell(direction: string): Cell {
        // method used to move one cell on a direction.
        if (direction === "right") {
            return new Cell();

        }
    };

    private format_pos(row: number, col: number): position {
        let result = new position(row, col);
        return result;
    };



}