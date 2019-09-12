import { Direction } from '../src/src/components/directions';
import { enum_senses, enum_directions, enum_easy_directions } from '../src/src/definitions'
import { convert_enum_to_list } from '../src/src/tools'

describe("Direction class tester", () => {
    test("Test Direction can init.", () => {
        let test_dirs = new Direction("left");
    });


    test("test sense is okay", () => {
        let test_dir = new Direction(enum_directions.left);
        expect(test_dir.str_current_sense).toEqual(enum_senses.hor)
        test_dir = new Direction(enum_directions.up);
        expect(test_dir.str_current_sense).toEqual(enum_senses.vert)
    });


    test("Test change direction change sense.", () => {
        let test_dir = new Direction(enum_directions.left);
        expect(test_dir.str_current_sense).toEqual(enum_senses.hor)
        test_dir.str_current_direction = enum_directions.up
        expect(test_dir.str_current_sense).toEqual(enum_senses.vert)
    });


    test("Test get opposite direction", () => {
        let test_dir = new Direction(enum_directions.left);
        let res: Direction = test_dir.get_opposite_direction();
        expect(res.str_current_direction).toEqual(enum_directions.right)

        test_dir = new Direction(enum_directions.right);
        res = test_dir.get_opposite_direction()
        expect(res.str_current_direction).toEqual(enum_directions.left)
    });


    test("Test direction generator", () => {
        var res_array = [];

        var test_dir = new Direction(enum_directions.left);
        for (let dir of test_dir.random_directions_gen()) {
            res_array.push(dir.str_current_direction);
        }
        expect(res_array.length).toEqual(4);
        expect(res_array[0]).toEqual(enum_directions.left);

        for (let elt of convert_enum_to_list(enum_directions)) {
            expect(res_array).toContain(elt)
        }
    });


    test("Test easy direction generator", () => {
        var res_array = [];

        var test_dir = new Direction(enum_directions.left);
        for (let dir of test_dir.random_easy_directions_gen()) {
            res_array.push(dir.str_current_direction);
        }
        expect(res_array.length).toEqual(4);
        expect(res_array[0]).toEqual(enum_directions.left);

        for (let elt of convert_enum_to_list(enum_easy_directions)) {
            expect(res_array).toContain(elt)
        }
    });
});