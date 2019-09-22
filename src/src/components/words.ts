import { shuffle } from "../tools";
import { Position } from "../components/positions"
import { Direction } from "./directions";


export class WordProperties {
    idx: number;
    word: string;
    description: string;
    written: Boolean;
    _first_position: Position;
    _direction: Direction;

    public *iter_elts() {
        yield this.idx;
        yield this.word;
        yield this.description;
        yield this.written;
        yield this._first_position;
        yield this._direction;
    }

    get first_position(){
        return this._first_position;
    }

    set first_position(pos: Position){
        if (this.written === true){
            this._first_position = pos;
        } else{
            throw new Error( "A position can not be setted if word is not set as written");
        }
    }

    get direction(){
        return this._direction;
    }

    set direction(dir: Direction){
        if (this.written === true){
            this._direction = dir;
        } else{
            throw new Error( "A direction can not be setted if word is not set as written");
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

    public generate_word_descr_array() {
        for (let wd_idx in this.words) {

            let word_properties = new WordProperties();
            word_properties.idx = Number(wd_idx);
            word_properties.word = this.words[wd_idx];
            word_properties.description = this.descr[wd_idx];
            word_properties.written = false // only used on easy mode.
            word_properties._first_position = undefined;
            word_properties._direction = undefined;

            this.word_desc_array.push(word_properties);

        }
    }

    public shuffle_words_descr(): WordListDescr {
        return shuffle(this.word_desc_array);
    }

    private assert_word_descr_equals() {
        if (this.words.length != this.descr.length) {
            throw new RangeError('Lenghts of words and desr are not equals');
        }
    }

    public get_written_desc_array(): Array<any> {
        return this.get_written_or_not_word_descr_array(true);
    }

    public get_not_written_desc_array(): Array<any> {
        return this.get_written_or_not_word_descr_array(false);
    }

    private get_written_or_not_word_descr_array(bool: boolean): Array<any> {
        let res_array: Array<any> = [];

        for (let elt of this.word_desc_array) {
            if (elt.written === bool) {
                res_array.push(elt);
            }
            return res_array
        }
    }
}