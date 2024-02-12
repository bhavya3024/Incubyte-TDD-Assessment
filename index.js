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
                throw new Error ('String should contain only positive numbers!')
            }
        })
    }



    validateString(string = '') {
       if (!string && string !== '') {
          throw new Error('String can be empty but cannot be another falsy value (null, undefined, zero)');
       }
       this.checkIfStringContainsNumbersOnly(string);
       this.checkIfStringContainsNegativeNumbers(string);
    }

    addNumbersInString() {
        this.validateString();
        const splittedNumbers = this.string.split(this.delimeter);
        if (!splittedNumbers.length) {
            return 0;
        }
        return splittedNumbers.reduce((a, b) => Number(a) + Number(b));
    }
}

const stringCalculatrClientFunction = (string) => {
   try {
    const client = new StringCalculator(string);
    console.log(client.addNumbersInString(string));
   } catch (error) {
      console.log('ERROR', error.message);
   }
}


stringCalculatrClientFunction('');
stringCalculatrClientFunction('1,2,3,4');
stringCalculatrClientFunction('1,2,3,a');
stringCalculatrClientFunction('1,2,,4');
stringCalculatrClientFunction('12,13,14,15');
stringCalculatrClientFunction('12,13,-14,15');