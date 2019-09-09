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

export class Direction {
    current_dir: string;

    constructor(first_dir: string=undefined) {
        if (first_dir == undefined){
            console.log("SET A RADOM DIR")
        }
        this.current_dir = first_dir;
    }

    
    protected get_randomized_directions(): Array<string> {
        // Get suffled directions.
        let dirs = shuffle(['up', 'right', 'down']);
        let res = dirs[random_int(0,3)];
        return dirs;
    }

    protected direction_sense_mapper(str_dir: "up" | "down" | "left" | "right"){

    }



}