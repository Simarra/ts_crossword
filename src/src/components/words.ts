import { shuffle } from "../tools";
import { Position } from "../components/positions"
import { Direction } from "./directions";


export class WordProperties {
    public idx: number;
    public word: string;
    public description: string;
    public written: Boolean;
    private _first_position: Position;
    private _direction: Direction;

    public *iter_elts() {
        yield this.idx;
        yield this.word;
        yield this.description;
        yield this.written;
        yield this._first_position;
        yield this._direction;
    }

    get first_position() {
        return this._first_position;
    }

    set first_position(pos: Position) {
        if (this.written === true) {
            this._first_position = pos;
        } else {
            throw new Error("A position can not be setted if word is not set as written");
        }
    }

    get direction() {
        return this._direction;
    }

    set direction(dir: Direction) {
        if (this.written === true) {
            this._direction = dir;
        } else {
            throw new Error("A direction can not be setted if word is not set as written");
        }
    }
}

export class WordListDescr {

    private words: Array<string>;
    private descr: Array<string>;
    public word_desc_array: Array<WordProperties>;


    constructor(words: Array<string>, descr: Array<string>) {
        this.words = words;
        this.descr = descr;
        this.assert_word_descr_equals();
        this.word_desc_array = [];
        this.generate_word_descr_array();

    }

    private generate_word_descr_array() {
        for (let wd_idx in this.words) {

            let word_properties = new WordProperties();
            word_properties.idx = Number(wd_idx);
            word_properties.word = this.words[wd_idx];
            word_properties.description = this.descr[wd_idx];
            word_properties.written = false // only used on easy mode.
            // word_properties.first_position = undefined;
            // word_properties.direction = undefined;

            this.word_desc_array.push(word_properties);

        }
    }


    public *[Symbol.iterator]() {
        // Iterate on the class will iterate on the word desc array.
        for (let elt of this.word_desc_array) {
            yield elt;
        }
    }

    public reset_word_descr_array() {
        // Usefull to reset the desc array when doing iteration tries.
        this.word_desc_array = [];
        this.generate_word_descr_array();
    }

    public shuffle_words_descr(): void {
        this.word_desc_array = shuffle(this.word_desc_array);
    }

    private assert_word_descr_equals() {
        if (this.words.length != this.descr.length) {
            throw new RangeError('Lenghts of words and desr are not equals');
        }
    }

    public written_words(): Array<WordProperties> {
        let res = this.word_desc_array.filter(word => word.written === true);
        return res;
    }

    public not_written_words(): Array<WordProperties> {
        let res = this.word_desc_array.filter(word => word.written === false);
        return res;
    }

    public get_word(str_word: string): WordProperties {
        let res = this.word_desc_array.filter(word => word.word = str_word)[0];
        return res;
    }



}