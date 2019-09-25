import { BaseGrid } from "./basegrid";
import { Cell } from '../components/cell'
import { Position } from '../components/positions'
import { Direction } from "../components/directions";
import { enum_directions } from "../definitions"
import { WordListDescr, WordProperties } from "../components/words";

export class GridEasy extends BaseGrid {

    public fill_board() {
        // Filling the grid using an algo wich try to respect a number of cells and rows.
        // Some letters without any relations can be close to each others.
        // The algo aims to have all words with intersections, and with no words wich means nothing.
        // Only up down and left directions are kept.

        for (let iter = 0; iter < this.ITERATIONS; iter++) {
            console.log("Essai: " + iter.toString());

            this.generate_board();
            var word_written: Boolean;

            // SHUFFLE AND RESET WORD DESCR ARRAY
            this.words.reset_word_descr_array()
            this.words.shuffle_words_descr();

            // FILL FIRST WORD
            let first_word_idx = 0;
            let first_word = this.words.word_desc_array[first_word_idx];
            let first_word_written: boolean = this.fill_first_word(first_word, first_word_idx)
            // END FILL FIRST WORD
            if (first_word_written === true) {
                this.find_matching_letter_between_not_written_and_written_word();
            }

            // NOW TRY TO WRITE WORDS [1:]



        }
    }

    protected fill_first_word(word: WordProperties, word_idx: number): boolean {
        let initial_position = this.get_random_position();
        let current_position = this.get_next_position_on_grid(initial_position);
        let str_word: string = word.word;
        let word_written: boolean = false;
        while ((current_position.col != initial_position.col) || (current_position.row != initial_position.row)) {

            current_position = this.get_next_position_on_grid(current_position);
            let first_cell_match = this.check_cell_letter_match(current_position, word[0], true);

            if (first_cell_match === true) {
                let dir = new Direction();
                for (let direction of dir.random_easy_directions_gen()) {
                    // if word written var to set?
                    let pos = new Position(current_position.row, current_position.col);

                    // ty to write all letters
                    for (let letter of str_word.slice(1)) {
                        word_written = true;
                        pos = this.get_next_position(pos, direction);
                        if (pos.col != -1) {
                            let match: boolean = this.check_cell_letter_match(pos, letter);
                            if (match === false) {
                                word_written = false;
                                break;
                            };
                        } else {
                            word_written = false;
                            // current_position = this.get_next_position_on_grid(current_position);
                            break;

                        }

                    }

                    if (word_written === true) {
                        this.write_word(word, current_position, direction, word_idx);
                        return true;
                    }
                }

            } else {
                // go to next iteration if no first cell match. Should not happends on first word.
            }
        }
        // If failed to find a good first letter.
        return false;
    }

    protected find_matching_letter_between_not_written_and_written_word() {
        let all_word_written_tested_and_failed = false;
        while (all_word_written_tested_and_failed === false) {
            for (let word_written of this.words.written_words()) {
                for (let word_not_written of this.words.not_written_words()) {

                }








            }
        }
    }

}
