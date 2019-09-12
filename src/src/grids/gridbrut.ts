import { WordListDescr } from '../components/words';
import { enum_easy_directions, enum_directions } from '../definitions'
import { Cell } from '../components/cell'
import { Position } from '../components/positions'
import { random_int, shuffle } from '../tools'
import { BaseGrid } from './basegrid'


export class GridBrut extends BaseGrid {
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


    public fill_board() {
        // Filling the grid using an algo wich try to respect a number of cells and rows.
        // Some letters without any relations can be close to each others.
        // Iterate
        for (let iter = 0; iter < this.ITERATIONS; iter++) {
            console.log(iter);

            // Generate the Board
            this.generate_board();

            var word_written: Boolean;

            // Iterate over words list
            for (let word_idx in this.words.word_desc_array) {
                let word = this.words.word_desc_array[word_idx][0];

                // get random position
                let initial_position = this.get_random_position();
                // Check letter on initial cell.
                // let current_position =  new Position(initial_position.row, initial_position.col);
                let current_position = this.get_next_position_on_grid(initial_position);
                word_written = false;
                // Examine current position.
                while ((current_position.col != initial_position.col) || (current_position.row != initial_position.row)) {
                    if (word_written === true) {// TODO: HERE THE DEBUGGER STOP WHILE INFITE LOOP
                        // the word has been written. Exit loop.
                        break;
                    } else {
                        current_position = this.get_next_position_on_grid(current_position);
                    };
                    let first_cell_match = this.check_cell_letter_match(current_position, word[0], true);
                    // first cell can not having already and idx.
                    if (first_cell_match === true) {
                        // try all directions randomly
                        for (let direction of this.get_randomized_directions()) {
                            // FIXME: Here is the error: a new current position without first letter checking can be returned.
                            if (word_written === false) {
                                let pos: Position = new Position(current_position.row, current_position.col);

                                // try to write all letters
                                for (let letter of word.slice(1)) {
                                    word_written = true;
                                    pos = this.get_next_position(pos, direction);
                                    if (pos.col != -1) {
                                        // TODO: PUT HERE check for first letter.
                                        let match: boolean = this.check_cell_letter_match(pos, letter);
                                        if (match === false) {
                                            word_written = false;
                                            // current_position = this.get_next_position_on_grid(current_position);
                                            break;
                                        };
                                    } else {
                                        word_written = false;
                                        // current_position = this.get_next_position_on_grid(current_position);
                                        break;

                                    };
                                };

                                if (word_written === true) {
                                    // TODO: FIX THIS. THE UGGLIEST THING EVER DONE.
                                    // This is done because couldnt resolve bug of idx overwitten.
                                    this.write_word(word, current_position, direction, +word_idx);
                                    break;

                                };
                            } else {
                                // if all directions failed, go to a next first position.
                                break
                            };
                        } // END for loop direction.
                    } else {
                        // current_position = this.get_next_position_on_grid(current_position);
                        word_written = false;
                    };
                };
                if (word_written === false) {
                    // if a word failed to write, go to the next iteration.
                    break;

                };
            };
            if (word_written === true) {
                if (this.check_idx_are_presents() === false) {
                    word_written = false;
                } else {
                    break;
                }
            };
            if (word_written === false && iter === this.ITERATIONS) {
                throw new Error("Board couldn't be filled.");
            }
            // check that all indexes are presents. If not, iterate again. TODO 
        };
        if (word_written === false) {
            throw new Error("Board couldn't be filled.");

        }
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

    protected check_cell_letter_match(position: Position, letter: string, first_cell: boolean = false) {
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


    protected get_randomized_directions(): Array<string> {
        // Get suffled directions.
        let dirs = shuffle(['left', 'up', 'right', 'down']);
        return dirs;
    };

    protected write_word(word: string, first_cell_pos: Position, direction: string, idx: number) {
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

    protected get_next_position(position: Position, direction: string) {
        // Get closest next position using a direction.
        if (direction === "left") {
            return this.get_left_position(position);
        } else if (direction == "right") {
            return this.get_right_position(position);
        } else if (direction == "up") {
            return this.get_upper_position(position);
        }
        else {
            return this.get_bottom_position(position);
        }
    }
}

