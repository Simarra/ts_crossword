import { GridBrut  } from './src/grids/gridbrut';
import { WordListDescr } from './src/words';


export function generate_crossword_using_brute_force(word_list: Array<string>, description_list: Array<string>, nb_rows: number, nb_cols: number): GridBrut{
    // Generate an array using words, descriptions, and cols and cell numbers.
  let words = new WordListDescr(word_list, description_list);
  let grid = new GridBrut(nb_rows, nb_cols, words);
  grid.fill_board()
  return grid;

};


