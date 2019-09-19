import { shuffle } from "../tools";


export class WordListDescr {
    // example word list generated:
    //      [ [ 'maison', 'lieu ou habiter' ],
    //   [ 'table', 'surface plate' ] ]
    // ┌─────────┬──────────┬───────────────────┐
    // │ (index) │    0     │         1         │  2
    // ├─────────┼──────────┼───────────────────┤
    // │    0    │ 'maison' │ 'lieu ou habiter' │  false  // not written
    // │    1    │ 'table'  │  'surface plate'  │  true  // written
    // └─────────┴──────────┴───────────────────┘

    private words: Array<string>;
    private descr: Array<string>;
    public word_desc_array: Array<Array<any>>;


    static word_key = 0;
    static descr_key = 1;
    static written_key = 2;

    constructor(words: Array<string>, descr: Array<string>) {
        this.words = words;
        this.descr = descr;
        this.assert_word_descr_equals();
        this.word_desc_array = [];
        this.generate_word_descr_array();

    }

    public generate_word_descr_array() {
        for (let wd_idx in this.words) {

            let tmp_array: Array<any> = [];
            tmp_array.push(this.words[wd_idx])
            tmp_array.push(this.descr[wd_idx])
            tmp_array.push(false) // only used on easy mode.

            this.word_desc_array.push(tmp_array)

        }
    }

    public shuffle_words_descr(): WordListDescr{
        return shuffle(this.word_desc_array);
    }

    private assert_word_descr_equals() {
        if (this.words.length != this.descr.length) {
            throw new RangeError('Lenghts of words and desr are not equals');
        }
    }

    public not_written_words_desct() {
        let res_array:Array<any> = [];

        for (let elt of this.word_desc_array){
            if (elt)


        }
    }
}