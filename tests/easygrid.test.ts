// Must add test of get next direction.
import { GridEasy } from '../src/src/grids/easygrid';
import { WordListDescr } from '../src/src/components/words';
import { Position } from '../src/src/components/positions'
import { Direction } from '../src/src/components/directions';
import { enum_directions } from '../src/src/definitions';


class TestClass extends GridEasy {
    public get_next_position_on_grid(position: Position) {
        return super.get_next_position_on_grid(position);
    };

    public get_right_position(position: Position) {
        return super.get_right_position(position);
    };

    public get_left_position(position: Position) {
        return super.get_left_position(position);
    };

    public get_upper_position(position: Position) {
        return super.get_upper_position(position);
    };

    public get_bottom_position(position: Position) {
        return super.get_bottom_position(position);
    };

    public get_next_position(position: Position, direction: string | Direction) {
        return super.get_next_position(position, direction);
    };

    public check_cell_letter_match(position: Position, letter: string) {
        return super.check_cell_letter_match(position, letter);
    };
}

var test_words = new WordListDescr(['maison', 'table'], ['lieu ou habiter', 'surface plate']);
// test_words.generate_word_descr_array();



describe("test Board generation", () => {
    test("Test grid len ", () => {
        let grid = new GridEasy(6, 5, test_words);
        grid.generate_board();
        expect(grid.board.length).toEqual(6);
        for (let row of grid.board) {
            expect(row.length).toEqual(5);
        }
    })
    
  test("test get next row new positions", () => {
    let grid = new TestClass(5, 6, test_words);
    grid.generate_board();
    let pos = new Position(2,5)
    let result = grid.get_next_position_on_grid(pos)
    let expected_pos = new Position(3,0)
    expect(result).toEqual(expected_pos)
  });
  
  test("Test right position", () => {
    let grid = new TestClass(5, 6, test_words);
    grid.generate_board();
    let pos = new Position(1,1);
    let result = grid.get_right_position(pos);
    let expected_pos = new Position(1,2);
    expect(result).toEqual(expected_pos);
  });
  test("Test left position", () => {
    let grid = new TestClass(5, 6, test_words);
    grid.generate_board();
    let pos = new Position(1,1);
    let result = grid.get_left_position(pos);
    let expected_pos = new Position(1,0);
    expect(result).toEqual(expected_pos);
  });
  test("Test upper position", () => {
    let grid = new TestClass(5, 6, test_words);
    grid.generate_board();
    let pos = new Position(1,1);
    let result = grid.get_upper_position(pos);
    let expected_pos = new Position(0,1);
    expect(result).toEqual(expected_pos);
  });
  test("Test bottom position", () => {
    let grid = new TestClass(5, 6, test_words);
    grid.generate_board();
    let pos = new Position(1,1);
    let result = grid.get_bottom_position(pos);
    let expected_pos = new Position(2,1);
    expect(result).toEqual(expected_pos);
  });
  test("Get next position", () => {
    let grid = new TestClass(5, 6, test_words);
    grid.generate_board();
    let pos:Position = new Position(1,1);
    let dir:Direction = new Direction(enum_directions.left);
    let res:Position = grid.get_next_position(pos, dir);
    let expected_pos = new Position(1,0);
    expect(res).toEqual(expected_pos);

    
  });
}

)
