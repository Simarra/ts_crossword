import { Grid } from './grid';
import { WordListDescr } from './words';


export function generate_crossword(word_list: Array<string>, description_list: Array<string>, nb_rows: number, nb_cols: number): Grid{
    // Generate an array using words, descriptions, and cols and cell numbers.
  let words = new WordListDescr(word_list, description_list);
  let grid = new Grid(nb_rows, nb_cols, words);
  grid.fill_board()
  return grid;

};