import { WordListDescr } from '../words';
import { Cell, Position, enum_easy_directions, enum_directions, enum_senses } from '../definitions'
import { random_int, shuffle } from '../tools'


export class Direction {
    protected _str_current_dir: string;
    protected _str_current_sense: string;

    constructor(first_dir: string) {
        if (first_dir == undefined) {
            first_dir = this.get_randomized_direction()._str_current_dir;
        }
        else if (!(first_dir in enum_directions)) {
            throw new Error("The direction provided is wrong:  " + first_dir);

        }
        this.direction_sense_mapper(first_dir);
        this._str_current_dir = first_dir;
    }


    public get_randomized_direction(): Direction {
        // Get suffled directions.
        let dirs = shuffle(['up', 'right', 'down']);
        let res = dirs[random_int(0, 3)];
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

    get str_current_dir(){
        return this._str_current_dir;
    }

    set str_current_dir(new_dir: any) {
        var str_dir: string;
        if (new_dir instanceof Direction){
            str_dir = new_dir.str_current_dir;
        } else if (typeof new_dir === "string") {
            str_dir = new_dir;
        }
        this.check_dir_validity(str_dir);
        this._str_current_dir = str_dir;
        this.direction_sense_mapper(str_dir);
    }

    protected check_dir_validity(str_dir: string){
        if (!(str_dir in enum_directions)){
            throw new Error("direction must be a direction, not: " + str_dir)
        }
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

    private get_opposite_direction(direction: string): string {
        if (direction === "left") {
            return "right";
        };
        if (direction === "right") {
            return "left";
        };
        if (direction === "up") {
            return "down";
        };
        if (direction === "down") {
            return "up";
        };
    }

    private get_opposite_sense(direction: string): string {
        if (direction === "left" || direction === "right") {
            return "up";
        };
        if (direction === "top" || direction === "up") {
        };
    }


}