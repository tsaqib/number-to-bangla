
const isInteger = (value) => typeof value === 'number' && isFinite(value) && Math.floor(value) === value;

const digits = (number) => Math.log(number) * Math.LOG10E + 1 | 0;

const isNegative = (number) => number < 0;

const split = (number, count) => {
    // Doing math operations in JS, I must have guts
    // Replace with string operations if need be. Wanted to do some perf test
    var digitCount = digits(number);
    count = Math.min(digitCount, count);
    var decpower = Math.pow(10, (digitCount - count));
    var retArr = [Math.floor(number / decpower)];

    if (count !== digitCount) retArr.push(number % decpower);
    return retArr;
};

const hasDeterminant = (numLength, determinant) => Object
    .keys(determinant)
    .find(key => determinant[key](numLength));

const utility = {isInteger, digits, isNegative, split, hasDeterminant};

export {utility as default, isInteger, digits, isNegative, split, hasDeterminant};