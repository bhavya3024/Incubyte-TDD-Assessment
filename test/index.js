import * as chai from 'chai';
import StringCalculator from '../index.js';
const expect = chai.expect;

describe('StringCalculator', () => {
    describe('calculateSum', () => {
        // Empty string
        it('should handle empty string and return 0', () => {
            const calculator = new StringCalculator('');
            expect(calculator.calculateSum()).to.equal(0);
        });

        // Multiple numbers separated by commas
        it('should handle multiple numbers separated by commas and return their sum', () => {
            const calculator = new StringCalculator('1,2,3,4');
            expect(calculator.calculateSum()).to.equal(10);
        });

        // Non-numeric input
        it('should throw an error for non-numeric inputs', () => {
            expect(() => new StringCalculator('1,2,3,a')).to.throw('String contains invalid delimeters!');
        });

        // Empty lines at the end
        it('should handle empty lines at the end', () => {
            expect(() => new StringCalculator('1,2\n').to.throw('Number should be present across the delimeter'));
        });

        // Multiple empty strings between delimiters
        it('should throw an error for multiple empty strings between delimiters', () => {
            expect(() => new StringCalculator('1,,2,,3')).to.throw('Number should be present across the delimeter');
        });

        // String ending with a delimiter
        it('should throw an error for string ending with a delimiter', () => {
            expect(() => new StringCalculator('1,')).to.throw('Number should be present across the delimeter');
        });

        // String containing invalid delimiters
        it('should throw an error for string containing invalid delimiters (+)', () => {
            expect(() => new StringCalculator('1,2,3,4,5+6+7+8*9*10*11\n12,13,14+15')).to.throw('String contains invalid delimeters!');
        });

        // Custom delimiters defined at the beginning
        it('should handle custom delimiters and multiple lines as well', () => {
            const calculator = new StringCalculator('//[;][+]\n1;2+3\n4+5;6');
            expect(calculator.calculateSum()).to.equal(21);
        });

        // Invalid custom delimiters (missing closing bracket)
        it('should throw an error for missing closing square bracket in custom delimiters', () => {
            expect(() => new StringCalculator('//[;')).to.throw('Delimeter string should start and end with square brackets');
        });

        // String containing negative numbers
        it('should throw an error for string containing negative numbers', () => {
            expect(() => new StringCalculator('12,13,-14,15,-16')).to.throw('negative numbers are not allowed: -14,-16');
        });

        // Invalid input types (null, undefined, boolean)
        it('should throw an error for null input', () => {
            expect(() => new StringCalculator(null)).to.throw('The input type must be string');
        });

        it('should throw an error for undefined input', () => {
            expect(() => new StringCalculator(undefined));
        });

        it('should throw an error for boolean input', () => {
            expect(() => new StringCalculator(false)).to.throw('The input type must be string');
            expect(() => new StringCalculator(true)).to.throw('The input type must be string');
        });


        // Different custom delimiters in different lines
        it('should handle different custom delimiters in different lines', () => {
            const calculator = new StringCalculator('//[;][*]\n1;2*3\n4*5');
            expect(calculator.calculateSum()).to.equal(15);
        });

        // Empty string between custom delimiters
        it('should throw an error for empty string between custom delimiters', () => {
            expect(() => new StringCalculator('//[,,][+][*]\n1,2,3,4,5+6+7+8*9*10*').to.throw('String contains invali delimeters!'));
        });

        it('should calculate sum for valid delimeters including multiple delimeter length', () => {
            const calculator = new StringCalculator('//[,,][+][*]\n1,,2,,3,,4,,5+6+7+8*9*10');
            expect(calculator.calculateSum()).to.equal(55);
        });

        it('should calculate sum if number is a delimeter', () => {
            const calculator = new StringCalculator('//[88][+][*]\n1882883884885+6+7+8*9*108811');
            expect(calculator.calculateSum()).to.equal(66);
        });

        it('should throw an error for invalid supported delimeter structure', () => {
             expect(() => new StringCalculator('//[,,][+][*\n1,2,3,4,5+6+7+8*9*10*11')).to.throw('Delimeter string should start and end with square brackets');
             expect(() => new StringCalculator('//,,][+][*]\n1,2,3,4,5+6+7+8*9*10*11')).to.throw('Delimeter string should start and end with square brackets');
        });


        it('should calculate sum if a square bracket(s) comes in supported delimeters', () => {
            expect(new StringCalculator('//[,]][+][*]\n1,]2,]3,]4,]5+6+7+8*9*10*11').calculateSum()).to.equal(66);
            expect(new StringCalculator('//[[]][+][*]\n1[]2[]3[]4[]5+6+7+8*9*10*11').calculateSum()).to.equal(66);
            expect(new StringCalculator('//[[]]][+][*]\n1[]]2[]]3[]]4[]]5+6+7+8*9*10*11').calculateSum()).to.equal(66);
            expect(new StringCalculator('//[[,]][+][*]\n1[,]2[,]3[,]4[,]5+6+7+8*9*10*11').calculateSum()).to.equal(66);



       });
    });
});


