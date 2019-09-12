import { Direction } from '../src/src/components/directions';
import { enum_senses, enum_directions } from '../src/src/definitions'
import { convert_enum_to_list } from '../src/src/tools'

describe("Direction class tester", () => {
    test("Test Direction can init.", () => {
        let test_dirs = new Direction("left");
    });
    test("test sense is okay", () => {
        let test_dir = new Direction(enum_directions.left);
        expect(test_dir.str_current_sense === enum_senses.hor)
        test_dir = new Direction(enum_directions.right);
        expect(test_dir.str_current_sense === enum_senses.vert)
    });
    test("Test change direction change sense.", () => {
        let test_dir = new Direction(enum_directions.left);
        expect(test_dir.str_current_sense === enum_senses.hor)
        test_dir.str_current_direction = enum_directions.up
        expect(test_dir.str_current_sense === enum_senses.vert)
    });
    test("Test get opposite direction", () => {
        let test_dir = new Direction(enum_directions.left);
        let res: Direction = test_dir.get_opposite_direction()
        expect(res.str_current_direction === enum_directions.right)

        test_dir = new Direction(enum_directions.left);
        res = test_dir.get_opposite_direction()
        expect(res.str_current_direction === enum_directions.left)
    });
    test("Test direction generator", () => {
        var res_array = [];

        var test_dir = new Direction(enum_directions.left);
        for (let dir of test_dir.random_directions_gen()) {
            res_array.push(dir.str_current_direction);
        }
        expect(res_array.length === 4);
        expect(res_array[0] === enum_directions.left);

        for (let elt in convert_enum_to_list(enum_directions)) {
            expect(elt in res_array)
        }
    });
});