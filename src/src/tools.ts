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

export function convert_enum_to_list(enm): Array<string>{
  var res = Object.keys(enm).map(key => enm[key]) 
  return res;
  }

export function arrayRemove(arr, value) {

   return arr.filter(function(ele){
       return ele != value;
   });

}