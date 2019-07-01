import { Cell } from './cell';
import { WordListDescr } from './words';

export class Grid {
    nb_col: number;
    nb_row: number;
    words: WordListDescr;

    constructor(nb_col: number, nb_row: number, words: WordListDescr) {
        this.nb_col = nb_col;
        this.nb_row = nb_row;
        this.words = words;
    }

    protected generate_word_list() {
        // Generate word list
        
    }



}