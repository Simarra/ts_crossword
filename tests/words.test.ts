import { WordListDescr } from '../src/words'

describe("test words class", () => {
  test("Test word result is not empty", () => {
    let test_words = new WordListDescr(['maison', 'table'], ['lieu ou habiter', 'surface plate']);
    test_words.generate_word_descr_array();
    expect(test_words.word_desc_array.length).toEqual(2);
  });
});