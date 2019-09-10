import { WordListDescr } from '../src/src/components/words';

describe("test words class", () => {
  test("Test word result is not empty", () => {
    let test_words = new WordListDescr(['maison', 'table'], ['lieu ou habiter', 'surface plate']);
    expect(test_words.word_desc_array.length).toEqual(2);
  });
});