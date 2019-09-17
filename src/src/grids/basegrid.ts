import { WordListDescr } from '../components/words';
import { enum_easy_directions, enum_directions } from '../definitions'
import { Cell } from '../components/cell'
import { Position } from '../components/positions'
import { random_int, shuffle } from '../tools'
import { Direction } from '../components/directions';


export class BaseGrid {
    // Core class wich must be subclassed.

    // Contains commons for daughters grids. 
    ITERATIONS: number = 500;
    nb_col: number;
    nb_row: number;
    words: WordListDescr;
    board: Array<Array<Cell>>;

    constructor(nb_row: number, nb_col: number, words: WordListDescr) {
        this.nb_col = nb_col - 1;
        this.nb_row = nb_row - 1;
        this.words = words;
    }



    public fill_board() {
        // Filling the grid using an algo wich try to respect a number of cells and rows.
        // Some letters without any relations can be close to each others.
        // Iterate
        throw new Error("Not implemented.")
    }


    public show_grid_in_console(): void {
        // print the grid in console.
        let res_array: Array<string> = [];
        let res: string = '';
        for (let row of this.board) {
            let tmp_array = row.map(x => x.letter);
            let tmp_str: string = tmp_array.join(" | ");
            res_array.push(tmp_str);
            console.log(res_array.join("\n"))
        }
    };


    public check_idx_are_presents() {
        let idx_getted: number = 0;
        let idx_expected: number = this.words.word_desc_array.length;

        // Get idx from descr


        // Get idx from board
        for (let row of this.board) {
            for (let cell of row) {
                if (cell["idx"] || cell["idx"] === 0) {
                    idx_getted += 1;
                };
            }
        }

        if (idx_getted === idx_expected) {
            return true
        } else {
            return false
        }

    };

    public export_to_json() {
        // Export to JSON 
        throw new Error("Not implemented")
    };

    public get_array_of_items(item_to_get: string) {
        // Extract cell content and return an array usable.
        // item_to_get: letter, idx, direction 
        let tmp_array = [];//: Array<Array<string>>;
        for (let row of this.board) {
            let tmp_row = row.map(x => x[item_to_get]);
            tmp_array.push(tmp_row)
        };
        return tmp_array;
    };


    public generate_board(): void {
        // Generate the board structure
        let row_it: number;
        this.board = [];
        for (let row_it = 0; row_it < this.nb_row + 1; row_it++) {
            let tmp_row = new Array(this.nb_col + 1);
            for (let col_it = 0; col_it < this.nb_col + 1; col_it++) {
                tmp_row[col_it] = new Cell();
            }
            this.board.push(tmp_row);
        }
    };


    protected get_cell(cell_pos: Position): Cell {
        let result = this.board[cell_pos.row][cell_pos.col];
        return result;
    };


    protected check_cell_letter_match(position: Position, letter: string, first_cell: boolean = false): boolean {
        let cell = this.get_cell(position);
        let ret: boolean;
        if ((cell.letter === letter) || (cell.letter == null)) {
            ret = true;
        } else {
            ret = false;
        }
        if ((first_cell === true) && (cell.idx || cell.idx === 0)) {
            ret = false;
        };
        return ret;
    };

    protected format_pos(row: number, col: number): Position {
        let result = new Position(row, col);
        return result;
    };

    protected get_random_position(): Position {
        let min = 0;
        let col_max = this.nb_col;
        let row_max = this.nb_row;

        //ugly
        let rd_row = random_int(min, row_max);
        let rd_col = random_int(min, col_max);

        let result = new Position(rd_row, rd_col);
        return result;
    };

    protected get_next_position_on_grid(position: Position): Position {
        // Method used to iterate on the grid.
        let pos = new Position(position.row, position.col);

        if ((pos.col === this.nb_col) && (pos.row === this.nb_row)) {
            pos.col = 0;
            pos.row = 0;
        } else if (pos.col === this.nb_col) {
            pos.col = 0;
            pos.row += 1;
        } else {
            pos.col += 1;
        }
        return pos;
    };


    protected get_right_position(position: Position) {
        let pos = new Position(position.row, position.col)
        if (pos.col === this.nb_col) {
            pos.col = -1;
        } else { pos.col += 1 }
        return pos
    };

    protected get_left_position(position: Position) {
        let pos = new Position(position.row, position.col)
        if (pos.col === 0) {
            pos.col = -1;
        } else { pos.col -= 1 }
        return pos
    };

    protected get_upper_position(position: Position) {
        let pos = new Position(position.row, position.col)
        if (pos.row === 0) {
            pos.col = -1;
        } else { pos.row -= 1 }
        return pos
    };

    protected get_bottom_position(position: Position) {
        let pos = new Position(position.row, position.col)
        if (pos.row === this.nb_row) {
            pos.col = -1;
        } else { pos.row += 1 }
        return pos
    };
    protected write_word(word: string, first_cell_pos: Position, direction: string|Direction, idx: number) {
        // Write the word on the array.
        // Write first cell
        let cell: Cell;
        cell = this.get_cell(first_cell_pos);

        if (cell.idx) {
            throw new Error("Trying to write index on existing index.")
        }

        cell.idx = idx;
        cell.letter = word[0];
        cell.direction = direction;
        let pos = new Position(first_cell_pos.row, first_cell_pos.col)
        // write other elts.
        for (let letter of word.slice(1)) {
            pos = this.get_next_position(pos, direction);
            cell = this.get_cell(pos);
            cell.letter = letter;
        }
    };

    protected get_next_position(position: Position, direction: string | Direction): Position {
        // Get closest next position using a direction.
        throw new Error("Not implemented");
    }
}

