import { shuffle } from "../tools";
import { Position } from "../components/positions"


export class WordListDescr {

    private words: Array<string>;
    private descr: Array<string>;
    public word_desc_array: Array<Map<string, string|Boolean|Position>>;


    constructor(words: Array<string>, descr: Array<string>) {
        this.words = words;
        this.descr = descr;
        this.assert_word_descr_equals();
        this.word_desc_array = [];
        this.generate_word_descr_array();

    }

    public generate_word_descr_array() {
        for (let wd_idx in this.words) {

            let tmp_dict = new Map<string, string|Boolean|Position>();
            tmp_dict.set("idx", wd_idx);
            tmp_dict.set("word", this.words[wd_idx]);
            tmp_dict.set("description", this.descr[wd_idx]);
            tmp_dict.set("written", false) // only used on easy mode.
            tmp_dict.set("position", undefined);

            this.word_desc_array.push(tmp_dict);

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
            if (elt.get("written") === bool) {
                res_array.push(elt);
            }
            return res_array
        }
    }
}