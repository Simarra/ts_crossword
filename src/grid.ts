import { Cell } from './cell';
import { WordListDescr } from './words';

export class Grid {
    nb_col: number;
    nb_row: number;
    words: WordListDescr;
    board: Array<Array<Cell>>;

    constructor(nb_col: number, nb_row: number, words: WordListDescr) {
        this.nb_col = nb_col;
        this.nb_row = nb_row;
        this.words = words;
        this.generate_board();
    }

    protected generate_board() {
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

    }



}