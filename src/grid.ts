import { Cell } from './cell';
import { WordListDescr } from './words';
import { random_int, shuffle } from './tools'


export class Position {
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
        for (let iter = 0; iter < this.ITERATIONS; iter++) {

            // Generate the Board
            this.generate_board()

            // Iterate over words list
            for (let word_row of this.words.word_desc_array) {
                let word = word_row[0];
                // get random position
                let initial_position = this.get_random_position();
                // clone the position
                let current_position = new Position(initial_position.row, initial_position.col)
                let direction_array = this.get_randomized_directions();
            };
        };
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


    public get_cell(cell_pos: Position): Cell {
        let result = this.board[cell_pos.row][cell_pos.col];
        return result;
    };

    public get_next_cell(direction: string): Cell {
        // method used to move one cell on a direction.
        if (direction === "right") {
            return new Cell();

        }
    };

    private format_pos(row: number, col: number): Position {
        let result = new Position(row, col);
        return result;
    };

    private get_random_position(): Position {
        let min = 0;
        let col_max = this.nb_col;
        let row_max = this.nb_row;

        //ugly
        let rd_row = random_int(min, row_max);
        let rd_col = random_int(min, col_max);

        let result = new Position(rd_row, rd_col);
        return result;
    };

    private iterate_over_grid(position: Position): Position {
        // Method used to iterate on the grid.

        if (position.col >= this.nb_col){
            position.col = 0;
            position.row += 1;
        } else if () {
            // TODO : Finish it.

        }
        

        return position;
    };

    private get_randomized_directions(): Array<string> {
        // Get suffled directions.
        let dirs = shuffle(['left', 'up', 'wright', 'down']);
        return dirs;
    };
}