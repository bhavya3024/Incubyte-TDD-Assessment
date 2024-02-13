export default class StringCalculator {
    constructor(string) {
        this.delimeters = [','];
        this.dimenstionalString = string !== '' ? this.validateString(string) : ''; // string formed by multiple splits if there are more than one delimeter
        this.string = string || '';
    }

    checkIfStringContainsNumbersOnly(str = '') {
        return /^[0-9]+$/.test(str);
    }

    processDelimiter(string, index = 0) {
        if (index > this.delimeters.length - 1) {
            return string;
        }
        return string.split(this.delimeters[index]).map(s => this.processDelimiter(s, index + 1));
    }

    validateAndReplaceDelimeterFromTheString(string) {
        let stringWithoutAdditionalDelimeters = string;
        if (string.startsWith('//')) {
            this.delimeters = [];
            let delimeterItemsString = string.substring(2);
            delimeterItemsString = delimeterItemsString.substring(0, string.indexOf('\n') - 2);
            if (!(delimeterItemsString.endsWith(']') && delimeterItemsString.startsWith('['))) {
                throw new Error('Delimeter string should start and end with square brackets');
            }
            stringWithoutAdditionalDelimeters = string.substring(string.indexOf('\n') + 1);
            const delimeterArray = delimeterItemsString.split(']['); // ][ will be removed automatically
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

    checkIfStringContainsValidDelimeters(string) {
        let modifiedString = string;
        for (const delimeter of this.delimeters) {
            modifiedString = modifiedString.split(delimeter).join('');
        }
        if (modifiedString.includes('/s')) {
            throw new Error('String contains invalid delimeters!');
        }
        if (!this.delimeters.includes('-')) { // if "-" is not a delimeter, it is a -ve sign, so we have to replace it! 
            modifiedString = modifiedString.replace(/-/g, '');
        }
        modifiedString = modifiedString.replace(/\n/g, ''); // replace /n with empty string
        if (!this.checkIfStringContainsNumbersOnly(modifiedString)) {
            throw new Error('String contains invalid delimeters!');
        }
    }

    validateString(string) {
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
                throw new Error('Number should be present across the delimeter');
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
        return this.dimenstionalString.split(',').reduce((a, b) => parseInt(a) + parseInt(b) || 0, 0);
    }
}
