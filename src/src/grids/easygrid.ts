import { BaseGrid } from "./basegrid";
import { Cell } from '../components/cell'
import { Position } from '../components/positions'
import { Direction } from "../components/directions";
import { enum_directions } from "../definitions"

export class GridEasy extends BaseGrid{

    public fill_board() {
        // Filling the grid using an algo wich try to respect a number of cells and rows.
        // Some letters without any relations can be close to each others.
        // The algo aims to have all words with intersections, and with no words wich means nothing.
        // Only up down and left directions are kept.

        // Iterate
    }

    protected get_next_position(position: Position, direction: string | Direction ){
        var dir:Direction;
        var str_dir:string;

        if (typeof direction === 'string'){
            dir = new Direction(direction);
        } else if (direction instanceof Direction){
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
