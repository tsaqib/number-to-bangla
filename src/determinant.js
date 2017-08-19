
/* ES6 version contributed by Swagata Prateek */
const determinant = {
    '': (numLength) => numLength < 3,
    'শত': (numLength) => numLength == 3,
    'হাজার': (numLength) => numLength == 4,
    'অজুত': (numLength) => numLength == 5,
    'লাখ': (numLength) => numLength == 6,
    'নিজুত': (numLength) => numLength == 7,
    'কোটি': (numLength) => numLength >= 8
};

export default determinant;