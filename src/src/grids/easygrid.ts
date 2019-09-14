import { BaseGrid } from "./basegrid";
import { Cell } from '../components/cell'
import { Position } from '../components/positions'
import { Direction } from "../components/directions";
import { enum_directions } from "../definitions"

export class GridEasy extends BaseGrid {

    public fill_board() {
        // Filling the grid using an algo wich try to respect a number of cells and rows.
        // Some letters without any relations can be close to each others.
        // The algo aims to have all words with intersections, and with no words wich means nothing.
        // Only up down and left directions are kept.

        // Iterate
    }

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

}
