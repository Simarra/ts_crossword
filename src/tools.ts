export function random_int(min_nb: number, max_nb: number) {
    let result = Math.floor(Math.random() * (+max_nb - +min_nb) + +min_nb);
    return result;
}

export function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export function* next_direction_generator(){
  // Generator wich create random direction.
  var dirs = ["right", "up", "down"];
  dirs = shuffle(dirs);
  for (let dir of dirs){
    yield dir;
  }

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
  Up = "up",
  Down = "down",
  Left = "left",
  Right = "right"
}

export enum enum_easy_directions{
  Up = "up",
  Down = "down",
  Right = "right"
}