export class WordListDescr {
    words: Array<string>;
    descr: Array<string>;
    word_desc_array: Array<Array<string>>;

    constructor(words: Array<string>, descr: Array<string>) {
        this.words = words;
        this.descr = descr;
        this.assert_word_descr_equals();
        console.table(words);
        console.table(descr);

    }

    public generate_word_descr_array() {
        for (let wd of this.words) {
            console.log(wd);

        }
    }

    private assert_word_descr_equals() {
        if (this.words.length != this.descr.length) {
            throw new RangeError('Lenghts of words and desr are not equals');
        }
    }
}