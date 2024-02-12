class StringCalculator {
    constructor(string = '') {
        this.delimeters = [','];
        this.dimensionalStringSplit = this.validateString(string);
        this.string = string || '';
    }

    processDelimiter(string, index = 0) {
        if (index > this.delimeters.length - 1) {
            return string;
        }
        return string.split(this.delimeters[index]).map(s => this.processDelimiter(s, index + 1));
    }

    checkIfStringContainsNegativeNumbers(string = '') {
        let negativeNumbers = [];
        string.split(this.delimeters).forEach(stringItem => {
            if (Number(stringItem) < 0) {
                negativeNumbers.push(stringItem);
            }
        });
        if (negativeNumbers.length) {
            throw new Error(`negative numbers are not allowed: ${negativeNumbers.join(',')}`);
        }
    }

    validateAndReplaceDelimeterFromTheString(string = '') {
        let stringWithoutAdditionalDelimeters = string;
        if (string.startsWith('//')) {
            this.delimeters = [];
            const delimeterItemsString = string.substring(0, string.indexOf('\n'));
            if (!delimeterItemsString.endsWith(']') || delimeterItemsString.startsWith('[')) {
                throw new Error('Delimeter string should start and end with square brackets');
            }
            stringWithoutAdditionalDelimeters = string.substring(string.indexOf('\n') + 1);
            const delimeterArray = delimeterItemsString.substring(2).split(']['); // ][ will be removed automatically
            delimeterArray.forEach((delimeter, index) => {
                if (index === 0 && delimeter.startsWith('[')) { // remove first "[" in first element
                    delimeter = delimeter.replace('[', '');
                }
                if (index === delimeterArray.length - 1 && delimeter.endsWith(']')) { // remove last "]" in last element
                    delimeter = delimeter.replace(/\](?=[^\]]*$)/g, '');
                }
                this.delimeters.push(delimeter);
            });
        }
        return stringWithoutAdditionalDelimeters;
    }

    checkIfStringContainsValidDelimeters(string = '') {
        for (let stringIndex = 0; stringIndex < string.length; stringIndex += 1) {
            if (isNaN(string.charAt(stringIndex))) {
                let delimeterFound = false;
                for (const delimeter of this.delimeters) {
                    let substringIndex = stringIndex;
                    let substring = string.substring(substringIndex, substringIndex + 1);
                    while (delimeter.startsWith(substring) && substring.length < delimeter.length) {
                        substringIndex++;
                        const newSubstring = string.substring(substringIndex, substringIndex + 1);
                        if (newSubstring === '') {
                            break;
                        }
                        substring += string.substring(substringIndex, substringIndex + 1);
                    }
                    console.log('DELIMETER: ', delimeter, ' SUBSTRING: ', substring);
                    if (delimeter === substring) {
                        delimeterFound = true;
                    }
                }
                if (!delimeterFound) {
                    throw new Error('Unsupported delimeter found!');
                }
            }
        }
    }




    validateString(string = '') {
        if (typeof string !== 'string') {
            throw new Error('The input type must be string');
        }
        const stringWithoutAdditionalDelimeters = this.validateAndReplaceDelimeterFromTheString(string);
        this.checkIfStringContainsValidDelimeters(stringWithoutAdditionalDelimeters);
        const multiDimensionSplit = stringWithoutAdditionalDelimeters.split('\n').map((line) => this.processDelimiter(line));
        const stringFormedByMultiDimensionSplit = multiDimensionSplit.join(',').replace(/\[/g, '').replace(/\]/g, '');
        const negativeNumbers = [];
        stringFormedByMultiDimensionSplit.split(',').forEach((stringItem) => {
            if (isNaN(Number(stringItem))) {
                throw new Error('String should contain only numbers!');
            }
            if (stringItem !== '' && stringItem.endsWith('\n') || stringItem.endsWith(this.delimeters)) {
                throw new Error('String should end with a number!');
            }
            if (stringItem === '' && stringFormedByMultiDimensionSplit.length) {
                throw new Error('Between delimeters, string should not be empty');
            }
            if (Number(stringItem) < 0) {
                negativeNumbers.push(stringItem);
            }
        });
        if (negativeNumbers.length) {
            throw new Error(`negative numbers are not allowed: ${negativeNumbers.join(',')}`);
        }
        return stringFormedByMultiDimensionSplit;
    }


    calculateSum() {
        return this.dimensionalStringSplit.split(',').reduce((a, b) => parseInt(a) + parseInt(b) || 0, 0);
    }
}

const stringCalculatorClientFunction = (string) => {
    try {
        const client = new StringCalculator(string);
        console.log(client.calculateSum(string));
    } catch (error) {
        console.log(`ERROR in ${string}:`, error.message);
    }
}


// stringCalculatorClientFunction('');
// stringCalculatorClientFunction('1,2,3,4');
// stringCalculatorClientFunction('1,2,3,a');
// stringCalculatorClientFunction('1,2,,4');
// stringCalculatorClientFunction('12,13,14,15');
// stringCalculatorClientFunction('12,13,-14,15,-16');
// stringCalculatorClientFunction(null);
// stringCalculatorClientFunction(undefined);
// stringCalculatorClientFunction(false);
// stringCalculatorClientFunction('1,2,3\n4');
// stringCalculatorClientFunction('1,2,\n');
// stringCalculatorClientFunction('1,2,');
// stringCalculatorClientFunction('1,2,3,4,5+6+7+8*9*10*11\n12,13,14+15');
// stringCalculatorClientFunction('//[,][+][*]\n1,2,3,4,5+6+7+8*9*10*11\n12,13,14+15');
// stringCalculatorClientFunction('//[,][*]\n1,2,3,4,5+6+7+8*9*10*11\n12,13,14+15');
// stringCalculatorClientFunction('//[,][+][*]\n1,2,3,4,5+6+7+-8*9*10*11\n12,13,14+15');
// stringCalculatorClientFunction('//[,][+][*]1,2,3,4,5+6+7+8*9*10*11\n12,13,14+15');
// stringCalculatorClientFunction('//[,,][+][*]\n1,2,3,4,5+6+7+8*9*10*11\n12,13,14+15');
stringCalculatorClientFunction('//[,,][+][*]\n1,,2,,3,,4,,5+6+7+8*9*10*11\n12,,13,,14+15');

