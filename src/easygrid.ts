import { Cell } from './cell';
import { WordListDescr } from './words';
import { random_int, shuffle, Position, enum_easy_directions, enum_directions } from './tools'



export class Direction {
    current_dir: string;

    constructor(first_dir: string = undefined) {
        if (first_dir == undefined) {
            console.log("SET A RADOM DIR")
        }
        this.current_dir = first_dir;
    }


    protected get_randomized_directions(): Array<string> {
        // Get suffled directions.
        let dirs = shuffle(['up', 'right', 'down']);
        let res = dirs[random_int(0, 3)];
        return dirs;
    }

    protected direction_sense_mapper(str_dir: enum_easy_directions) {

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