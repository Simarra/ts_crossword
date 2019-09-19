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
            console.log("Essai: " + iter.toString);

            this.generate_board();
            var word_written: Boolean;

            var words_desc_shuffled: WordListDescr = this.words.shuffle_words_descr();

            for (let word_idx in words_desc_shuffled) {
                let word = this.words.word_desc_array[word_idx][0];

                // get random position
                let initial_position = this.get_random_position();
                // Check letter on initial cell.
                // let current_position =  new Position(initial_position.row, initial_position.col);
                let current_position = this.get_next_position_on_grid(initial_position);
                word_written = false;



            }



        }
    }

    protected fill_first_word(word: string) {
        let initial_position = this.get_random_position();
        let current_position = this.get_next_position_on_grid(initial_position);

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
