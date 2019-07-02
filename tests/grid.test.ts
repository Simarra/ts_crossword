import { Grid } from '../src/grid';
import { WordListDescr } from '../src/words';


var test_words = new WordListDescr(['maison', 'table'], ['lieu ou habiter', 'surface plate']);
test_words.generate_word_descr_array();

describe("test Board generation", () => {
  test("Test grid len ", () => {
    let grid = new Grid(5, 6, test_words);
    grid.generate_board();
    expect(grid.board.length).toEqual(6);
    for (let row of grid.board) {
      expect(row.length).toEqual(5);
    }
  });
  test("Test show grid", () => {
    let grid = new Grid(5, 6, test_words);
    grid.generate_board();
    grid.show_grid_in_console();

  });
  test("test fill board", () => {
    let grid = new Grid(5, 6, test_words);
    grid.generate_board();
    grid.fill_board();



  });
});
