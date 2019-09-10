export class Cell {
    letter: string;
    idx: number;
    direction: string;
    // constructor(letter: string) {
    //     if (letter === '') {
    //         this.letter = '';}
    // }
}
export class Position {
    // interface used to standardise cell position.
    row: number;
    col: number;

    constructor(row: number, col: number) {
        this.row = row;
        this.col = col;

    };
};

export enum enum_directions{
  up = "up",
  down = "down",
  left = "left",
  right = "right"
}

export enum enum_easy_directions{
  up = "up",
  down = "down",
  right = "right"
}

export enum enum_senses {
    vert = "vertical",
    hor = "horizontal"
}