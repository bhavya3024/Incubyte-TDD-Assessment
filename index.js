class StringCalculator {
    constructor(string = '') {
        this.delimeters = [',', '+', '*'];
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



    validateString(string = '') {
        if (typeof string !== 'string') {
            throw new Error('The input type must be string');
        }
        const multiDimensionSplit = string.split('\n').map((line) => this.processDelimiter(line));
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
        return this.dimensionalStringSplit.split(',').reduce((a, b) => parseInt(a) + parseInt(b) || 0 , 0);
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


stringCalculatorClientFunction('');
stringCalculatorClientFunction('1,2,3,4');
stringCalculatorClientFunction('1,2,3,a');
stringCalculatorClientFunction('1,2,,4');
stringCalculatorClientFunction('12,13,14,15');
stringCalculatorClientFunction('12,13,-14,15,-16');
stringCalculatorClientFunction(null);
stringCalculatorClientFunction(undefined);
stringCalculatorClientFunction(false);
stringCalculatorClientFunction('1,2,3\n4');
stringCalculatorClientFunction('1,2,\n');
stringCalculatorClientFunction('1,2,');
stringCalculatorClientFunction('1,2,3,4,5+6+7+8*9*10*11\n12,13,14+15');