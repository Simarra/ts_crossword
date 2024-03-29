export class WordListDescr {
    // example word list generated:
    //      [ [ 'maison', 'lieu ou habiter' ],
    //   [ 'table', 'surface plate' ] ]
    // ┌─────────┬──────────┬───────────────────┐
    // │ (index) │    0     │         1         │
    // ├─────────┼──────────┼───────────────────┤
    // │    0    │ 'maison' │ 'lieu ou habiter' │
    // │    1    │ 'table'  │  'surface plate'  │
    // └─────────┴──────────┴───────────────────┘

    private words: Array<string>;
    private descr: Array<string>;
    public word_desc_array: Array<Array<string>>;

    constructor(words: Array<string>, descr: Array<string>) {
        this.words = words;
        this.descr = descr;
        this.assert_word_descr_equals();
        this.word_desc_array = [];
        this.generate_word_descr_array();
    }

    public generate_word_descr_array() {
        for (let wd_idx in this.words) {

            let tmp_array: Array<string> = [];
            tmp_array.push(this.words[wd_idx])
            tmp_array.push(this.descr[wd_idx])

            this.word_desc_array.push(tmp_array)

        }
    }

    private assert_word_descr_equals() {
        if (this.words.length != this.descr.length) {
            throw new RangeError('Lenghts of words and desr are not equals');
        }
    }
}