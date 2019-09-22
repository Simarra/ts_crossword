import { BaseGrid } from "./basegrid";
import { Cell } from '../components/cell'
import { Position } from '../components/positions'
import { Direction } from "../components/directions";
import { enum_directions } from "../definitions"
import { WordListDescr } from "../components/words";

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

            var words_desc_shuffled: WordListDescr = this.words.shuffle_words_descr();

            // fill first word
            let first_word_idx = 0;
            let first_word = this.words.word_desc_array[first_word_idx].word;
            let first_word_written: boolean = this.fill_first_word(first_word, first_word_idx)

            if (first_word_written === true) {
                this.words.word_desc_array[first_word_idx].written === true;


                for (let word_idx in words_desc_shuffled) {
                    let word = this.words.word_desc_array[word_idx].word;

                    // NOW TRY TO WRITE WORDS [1:]

                    // LETS FIND LETTERS INTERSECTIONS.

                    // get random position
                    let initial_position = this.get_random_position();
                    // Check letter on initial cell.
                    // let current_position =  new Position(initial_position.row, initial_position.col);
                    let current_position = this.get_next_position_on_grid(initial_position);



                }
            }



        }
    }

    protected fill_first_word(word: string, word_idx: number): boolean {
        let initial_position = this.get_random_position();
        let current_position = this.get_next_position_on_grid(initial_position);
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
                    for (let letter of word.slice(1)) {
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
                        this.write_word(word, current_position, direction, word_idx)
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
    ;

    protected get_next_position(position: Position, direction: string | Direction): Position {
        var dir: Direction;
        var str_dir: string;

        if (typeof direction === 'string') {
            dir = new Direction(direction);
        } else if (direction instanceof Direction) {
            dir = direction;
        }
        str_dir = dir.str_current_direction;

        if (str_dir === enum_directions.left) {
            return this.get_left_position(position);
        } else if (str_dir == enum_directions.right) {
            return this.get_right_position(position);
        } else if (str_dir == enum_directions.up) {
            return this.get_upper_position(position);
        }
        else {
            return this.get_bottom_position(position);
        }
    }


}
