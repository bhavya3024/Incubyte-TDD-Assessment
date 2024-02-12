class StringCalculator {
    constructor(string = '') {
        this.delimeters = [',', '+', '*'];
        this.validateString(string);
        this.string =  string || '';
    }

    checkIfStringContainsNumbersOnly(string = '') {
        string.split(this.delimeters).forEach(stringItem => {
            if (isNaN(Number(stringItem))) {
                throw new Error('String should contain only numbers!');
            }
        })
    }

    checkIfStringEndsWithNumber(string = '') {
        if (string !== '' && string.endsWith('\n') || string.endsWith(this.delimeters)) {
            throw new Error('String should end with a number!');
        }
    }

    checkIfStringIsEmptyBetweenTwoDelimeters(string = '') {
        string.split(this.delimeters).forEach(stringItem => {
           if (stringItem === '') {
             throw new Error('Between two delimeters, string should not be empty');
           }
        })
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
       this.checkIfStringEndsWithNumber(string);
       this.checkIfStringContainsNumbersOnly(string);
       this.checkIfStringContainsNegativeNumbers(string);
    }


    processArray(array, sum) {
        if (!Array.isArray(array)) {
            sum += parseInt(array) || 0;
            return sum;
        }
        array.forEach((arrayElement) => {
           sum = this.processArray(arrayElement, sum);
        });
        return sum;
    }
    

    processDelimiter(string, index) {
        if (index > this.delimeters.length - 1) {
            return string;
        }
       return string.split(this.delimeters[index]).map(s=> this.processDelimiter(s, index + 1));
    }

    addNumbersInString() {
        this.validateString();
        const multiDimensionArray = this.string.split('\n').map((line) => this.processDelimiter(line, 0));
        return this.processArray(multiDimensionArray, 0);
    }
}

const stringCalculatorClientFunction = (string) => {
   try {
    const client = new StringCalculator(string);
    console.log(client.addNumbersInString(string));
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
stringCalculatorClientFunction('1,2,3\n4,5,6\n7,8,9');
stringCalculatorClientFunction('1,2,\n');
stringCalculatorClientFunction('1,2,');
stringCalculatorClientFunction('1,2,3,4,5+6+7+8*9*10*11');