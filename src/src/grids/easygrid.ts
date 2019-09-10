import { WordListDescr } from '../words';
import { Cell, Position, enum_easy_directions, enum_directions, enum_senses } from '../definitions'
import { random_int, shuffle, convert_enum_to_list, arrayRemove } from '../tools'


export class Direction {
    protected _str_current_direction: string;
    protected _str_current_sense: string;

    constructor(first_dir: string) {
        if (first_dir == undefined) {
            first_dir = this.get_randomized_writing_direction()._str_current_direction;
        }
        else if (!(first_dir in enum_directions)) {
            throw new Error("The direction provided is wrong:  " + first_dir);

        }
        this.direction_sense_mapper(first_dir);
        this._str_current_direction = first_dir;
    }


    public get_randomized_writing_direction(): Direction {
        // Get suffled directions with only using the directions
        // used to write (from left to right but no right to left)
        let dirs: Array<string> = convert_enum_to_list(enum_easy_directions);
        dirs = shuffle(dirs);
        let res = dirs[random_int(0, 2)];
        return new Direction(res);
    }

    protected direction_sense_mapper(str_dir: string) {
        if (str_dir in [enum_directions.up, enum_directions.down]) {
            this._str_current_sense = enum_senses.vert;
        }
        else {
            this._str_current_sense = enum_senses.hor;
        }
    }

    get str_current_direction() {
        return this._str_current_direction;
    }

    get str_current_sense() {
        return this._str_current_sense;
    }

    set str_current_sense(arg: any) {
        throw new Error("Manual setting of sense not permitted.")
    }

    set str_current_dir(new_dir: any) {
        var str_dir: string;
        if (new_dir instanceof Direction) {
            str_dir = new_dir.str_current_direction;
        } else if (typeof new_dir === "string") {
            str_dir = new_dir;
        }
        this.check_dir_validity(str_dir);
        this._str_current_direction = str_dir;
        this.direction_sense_mapper(str_dir);
    }

    protected check_dir_validity(dir: any) {
        // Check validity of a direction. Can be a string
        // or a Direction object.
        var str_dir: string;
        if (dir instanceof Direction) {
            str_dir = dir._str_current_direction;
        }
        else if (typeof dir != "string") {
            str_dir = dir;
        }
        else {
            throw new Error("Invalid type for the direction tested.")

        }
        if (!(dir in enum_directions)) {
            throw new Error("direction must be a direction, not: " + dir)
        }
    }

    public *random_directions_gen() {
        // Generator wich provides senses string items
        // Use easy direction(from left to right but no right to left)
        var dirs: Array<string> = convert_enum_to_list(enum_easy_directions);
        dirs = arrayRemove(dirs, this._str_current_direction);
        dirs = shuffle(dirs);
        yield new Direction(this._str_current_direction);
        for (let elt of dirs) {
            yield new Direction(elt);
        }

    }

    public get_opposite_direction(): Direction {

        if (this.str_current_direction === enum_directions.left) {
            return new Direction(enum_directions.right);
        };
        if (this.str_current_direction === enum_directions.right) {
            return new Direction(enum_directions.left);
        };
        if (this.str_current_direction === enum_directions.up) {
            return new Direction(enum_directions.down);
        };
        if (this.str_current_direction === enum_directions.down) {
            return new Direction(enum_directions.up);
        };
    }



    public get_opposite_sense_as_str(): string {
        if (this.str_current_direction === enum_directions.left || this.str_current_direction === enum_directions.right) {
            return enum_senses.hor;
        };
        if (this.str_current_direction === enum_directions.up || this.str_current_direction === enum_directions.up) {
            return enum_senses.vert;
        };
    }

}

export class GridEasy {

    public fill_board() {
        // Filling the grid using an algo wich try to respect a number of cells and rows.
        // Some letters without any relations can be close to each others.
        // The algo aims to have all words with intersections, and with no words wich means nothing.
        // Only up down and left directions are kept.

        // Iterate
    }




}