// Written by Tanzim Saqib. Web: http://tanzimsaqib.com
// Repo: https://github.com/tsaqib/number-to-bangla
// Description: A simple JavaScript utility to convert from numbers to words in Bangla.
// Because there was simply no other could be found on the internet, but someone needed it.

var NumToBanglaRec = {
    numtow: {
        '0': 'শুন্য',
        '1': 'এক',
        '2': 'দুই',
        '3': 'তিন',
        '4': 'চার',
        '5': 'পাঁচ',
        '6': 'ছয়',
        '7': 'সাত',
        '8': 'আট',
        '9': 'নয়',
        '10': 'দশ',
        '11': 'এগারো',
        '12': 'বারো',
        '13': 'তেরো',
        '14': 'চৌদ্দ',
        '15': 'পনেরো',
        '16': 'ষোল',
        '17': 'সতেরো',
        '18': 'আঠারো',
        '19': 'ঊনিশ',
        '20': 'বিশ',
        '21': 'একুশ',
        '22': 'বাইশ',
        '23': 'তেইশ',
        '24': 'চব্বিশ',
        '25': 'পঁচিশ',
        '26': 'ছাব্বিশ',
        '27': 'সাতাশ',
        '28': 'আঠাশ',
        '29': 'ঊনত্রিশ',
        '30': 'ত্রিশ',
        '31': 'একত্রিশ',
        '32': 'বত্রিশ',
        '33': 'তেত্রিশ',
        '34': 'চৌত্রিশ',
        '35': 'পঁয়ত্রিশ',
        '36': 'ছত্রিশ',
        '37': 'সাইত্রিশ',
        '38': 'আটত্রিশ',
        '39': 'ঊনচল্লিশ',
        '40': 'চল্লিশ',
        '41': 'একচল্লিশ',
        '42': 'বিয়াল্লিশ',
        '43': 'তেতাল্লিশ',
        '44': 'চুয়াল্লিশ',
        '45': 'পঁয়তাল্লিশ',
        '46': 'ছেচল্লিশ',
        '47': 'সাতচল্লিশ',
        '48': 'আটচল্লিশ',
        '49': 'ঊনপঞ্চাশ',
        '50': 'পঞ্চাশ',
        '51': 'একান্ন',
        '52': 'বায়ান্ন',
        '53': 'তিপ্পান্ন',
        '54': 'চুয়ান্ন',
        '55': 'পঞ্চান্ন',
        '56': 'ছাপ্পান্ন',
        '57': 'সাতান্ন',
        '58': 'আটান্ন',
        '59': 'ঊনষাট',
        '60': 'ষাট',
        '61': 'একষট্টি',
        '62': 'বাষট্টি',
        '63': 'তেষট্টি',
        '64': 'চৌষট্টি',
        '65': 'পঁয়ষট্টি',
        '66': 'ছেষট্টি',
        '67': 'সাতষট্টি',
        '68': 'আটষট্টি',
        '69': 'ঊনসত্তর',
        '70': 'সত্তর',
        '71': 'একাত্তর',
        '72': 'বাহাত্তর',
        '73': 'তিয়াত্তর',
        '74': 'চুয়াত্তর',
        '75': 'পঁচাত্তর',
        '76': 'ছিয়াত্তর',
        '77': 'সাতাত্তর',
        '78': 'আটাত্তর',
        '79': 'ঊনআশি',
        '80': 'আশি',
        '81': 'একাশি',
        '82': 'বিরাশি',
        '83': 'তিরাশি',
        '84': 'চুরাশি',
        '85': 'পঁচাশি',
        '86': 'ছিয়াশি',
        '87': 'সাতাশি',
        '88': 'আটাশি',
        '89': 'ঊননব্বই',
        '90': 'নব্বই',
        '91': 'একানব্বই',
        '92': 'বিরানব্বই',
        '93': 'তিরানব্বই',
        '94': 'চুরানব্বই',
        '95': 'পঁচানব্বই',
        '96': 'ছিয়ানব্বই',
        '97': 'সাতানব্বই',
        '98': 'আটানব্বই',
        '99': 'নিরানব্বই',
        '100': 'একশো',
        '200': 'দুইশো',
        '300': 'তিনশো',
        '400': 'চারশো',
        '500': 'পাঁচশো',
        '600': 'ছয়শো',
        '700': 'সাতশো',
        '800': 'আটশো',
        '900': 'নয়শো'
    },

    determinant: {
        '': (numLength) => numLength < 3,
        'শত': (numLength) => numLength == 3,
        'হাজার': (numLength) => numLength == 4,
        'অজুত': (numLength) => numLength == 5,
        'লাখ': (numLength) => numLength == 6,
        'নিজুত': (numLength) => numLength == 7,
        'কোটি': (numLength) => numLength >= 8
    },

    convertRec: function (num) {
        let self = this;

        // local functions
        const isInteger = function (value) {
            return typeof value === 'number' &&
                isFinite(value) &&
                Math.floor(value) === value;
        }

        const digits = (number) => Math.log(number) * Math.LOG10E + 1 | 0;
        const isNegative = (number) => number < 0;
        const split = (number, count) => {
            // Doing math operations in JS, I must have guts
            // Replace with string operations if need be. Wanted to do some perf test
            const digitCount = digits(number);
            count = Math.min(digitCount, count);
            const decpower = 10 ** (digitCount - count);
            let retArr = [Math.floor(number / decpower)]

            if (count !== digitCount) retArr.push(number % decpower);
            return retArr;
        };

        const hasDet = (numLength, determinant) => Object
            .keys(determinant)
            .find(key => determinant[key](numLength));

        const convertInternal = function (number) {
            numLength = digits(number);
            let det = hasDet(numLength, self.determinant);

            let numSplit = [];
            let midterm = '';
            let firstTerm = '';

            if (det) {
                if (det !== 'কোটি') {
                    switch (det) {
                        case 'শত':
                            numSplit = split(number, 1);
                            numSplit[0] = numSplit[0] * 100;
                            break;
                        case 'হাজার':
                            numSplit = split(number, 1);
                            midterm = 'হাজার';
                            break;
                        case 'অজুত':
                            numSplit = split(number, 2);
                            midterm = 'হাজার';
                            break;
                        case 'লাখ':
                            numSplit = split(number, 1);
                            midterm = 'লাখ';
                            break;
                        case 'নিজুত':
                            numSplit = split(number, 2);
                            midterm = 'লাখ';
                            break;
                    }
                    firstTerm = self.numtow[numSplit[0].toString()];
                }
                else {
                    numSplit = split(number, numLength - 7);
                    midterm = 'কোটি';
                    // recurse again to get the first term with out split
                    firstTerm = convertInternal(numSplit[0]);
                }

                return [
                    firstTerm,
                    midterm,
                    numSplit[1] === 0 ? '' : convertInternal(numSplit[1])
                ].filter(x => x.length > 0).join(" ")
            }
            else {
                return self.numtow[number.toString()];
            }
        }

        if (!isInteger(num))
            throw new Error("Invalid argument num, expected number, encountered " + typeof num);

        if (isNegative(num))
            throw new Error("Expected positive integer, encountered negative integer");

        return convertInternal(num);
    }
}

var test_data_2 = [
    [0,         'শুন্য'],
    [8,         'আট'],
    [49,        'ঊনপঞ্চাশ'],
    [400,       'চারশো'],
    [704,       'সাতশো চার'],
    [939,       'নয়শো ঊনচল্লিশ'],
    [3204,      'তিন হাজার দুইশো চার'],
    [20001,     'বিশ হাজার এক'],
    [20308,     'বিশ হাজার তিনশো আট'],
    [50000,     'পঞ্চাশ হাজার'],
    [200007,    'দুই লাখ সাত'],
    [700000,    'সাত লাখ'],
    [2000603,   'বিশ লাখ ছয়শো তিন'],
    [5000000,   'পঞ্চাশ লাখ'],
    [1923908,   'ঊনিশ লাখ তেইশ হাজার নয়শো আট'],
    [83641705,  'আট কোটি ছত্রিশ লাখ একচল্লিশ হাজার সাতশো পাঁচ'],
    [80000000,  'আট কোটি'],
    [80000002,  'আট কোটি দুই'],
    [500000000, 'পঞ্চাশ কোটি'],
    [501619500, 'পঞ্চাশ কোটি ষোল লাখ ঊনিশ হাজার পাঁচশো'],
    [900000000, 'নব্বই কোটি'],
    [987654321, 'আটানব্বই কোটি ছিয়াত্তর লাখ চুয়ান্ন হাজার তিনশো একুশ'],
    [990000000, 'নিরানব্বই কোটি'],
    [990000001, 'নিরানব্বই কোটি এক'],
    [999999999, 'নিরানব্বই কোটি নিরানব্বই লাখ নিরানব্বই হাজার নয়শো নিরানব্বই'],
    [9999999999, 'নয়শো নিরানব্বই কোটি নিরানব্বই লাখ নিরানব্বই হাজার নয়শো নিরানব্বই'],
    [99999999999, 'নয় হাজার নয়শো নিরানব্বই কোটি নিরানব্বই লাখ নিরানব্বই হাজার নয়শো নিরানব্বই'],
    [999999999999, 'নিরানব্বই হাজার নয়শো নিরানব্বই কোটি নিরানব্বই লাখ নিরানব্বই হাজার নয়শো নিরানব্বই']
];

QUnit.test("All tests revisited", function (assert) {
    for (var i = 0; i < test_data_2.length; ++i) {
        assert.equal(NumToBanglaRec.convertRec(test_data_2[i][0]), test_data_2[i][1],
            test_data_2[i][0] + ' => ' + test_data_2[i][1]);
    }
});

