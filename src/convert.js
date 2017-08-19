import {isNegative, isInteger, digits, hasDeterminant as hasDet, split} from './utility';
import NumToWord from './number-to-word';
import Determinant from './determinant';

const convertInternal = function (number) {
    const numLength = digits(number);
    const det = hasDet(numLength, Determinant);

    var numSplit = [];
    var midterm = '';
    var firstTerm;

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
            firstTerm = NumToWord[numSplit[0].toString()];
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
        ].filter(x => x.length > 0).join(' ');
    }
    else {
        return NumToWord[number.toString()];
    }
}

export default function convert(number) {
    if (!isInteger(number))
        throw new Error(`Invalid argument num, expected number, encountered ${typeof number}`);

    if (isNegative(number))
        throw new Error('Expected positive integer, encountered negative integer');

    return convertInternal(number);
}