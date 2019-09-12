import { Direction } from '../src/src/components/directions';
import {enum_senses, enum_directions} from '../src/src/definitions'

describe("Direction class tester", () => {
    test("Test Direction can init.", () => {
        let test_dirs = new Direction("left");
    });
    test("test sense is okay", () => {
        let test_dir = new Direction("left");
        expect(test_dir.str_current_sense === enum_senses.hor)
        test_dir = new Direction("right");
        expect(test_dir.str_current_sense === enum_senses.vert)
    });
    test("Test change direction change sense.", () => {
        let test_dir = new Direction("left");
        expect(test_dir.str_current_sense === enum_senses.hor)
        test_dir.str_current_direction = enum_directions.up
        expect(test_dir.str_current_sense === enum_senses.vert)
    });
});