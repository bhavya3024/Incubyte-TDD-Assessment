class StringCalculator {
    constructor(string = '') {
        this.delimeter = ',';
        this.validateString(string);
        this.string =  string || '';
    }

    checkIfStringContainsNumbersOnly(string = '') {
        string.split(this.delimeter).forEach(stringItem => {
            if (isNaN(Number(stringItem))) {
                throw new Error('String should contain only numbers!');
            }
        })
    }

    checkIfStringIsEmptyBetweenTwoDelimeters(string = '') {
        string.split(this.delimeter).forEach(stringItem => {
           if (stringItem === '') {
             throw new Error('Between two delimeters, string should not be empty');
           }
        })
    }

    checkIfStringContainsNegativeNumbers(string = '') {
        string.split(this.delimeter).forEach(stringItem => {
            if (Number(stringItem) < 0) {
                throw new Error('String should contain only positive numbers!');
            }
        })
    }



    validateString(string = '') {
       if (typeof string !== 'string') {
          throw new Error('The input type must be string');
       }
       this.checkIfStringContainsNumbersOnly(string);
       this.checkIfStringContainsNegativeNumbers(string);
    }

    addNumbersInString() {
        this.validateString();
        const splittedNumbers = this.string.split('\n').map((line) => {
            const numbers = line.split(this.delimeter).filter(l => l !== this.delimeter);
            return !numbers.length ? 0 : numbers.reduce((a, b) => Number(a) + Number(b), 0); 
        });
        return !splittedNumbers.length ? 0 : splittedNumbers.reduce((a, b) => Number(a) + Number(b), 0);
    }
}

const stringCalculatorClientFunction = (string) => {
   try {
    const client = new StringCalculator(string);
    console.log(client.addNumbersInString(string));
   } catch (error) {
      console.log('ERROR', error.message);
   }
}


stringCalculatorClientFunction('');
stringCalculatorClientFunction('1,2,3,4');
stringCalculatorClientFunction('1,2,3,a');
stringCalculatorClientFunction('1,2,,4');
stringCalculatorClientFunction('12,13,14,15');
stringCalculatorClientFunction('12,13,-14,15');
stringCalculatorClientFunction(null);
stringCalculatorClientFunction(undefined);
stringCalculatorClientFunction(false);
stringCalculatorClientFunction('1,2,3\n4,5,6\n7,8,9');
stringCalculatorClientFunction('1,\n');