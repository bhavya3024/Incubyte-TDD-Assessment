# Incubyte TDD Assessment - String Calculator


## Setup and tests

1. Clone this project and run yarn
2. Run tests using yarn test


## Main implementation

index.js contains the class String Calculator which has predefined methods having some significance in validating and calculating the sum associated in a string if it is valid.


## Methods

### checkIfStringContainsNumbersOnly

This method is used for checking whether a string contains number only, it is generally used while validating delimeters in a string, if the string contains unsupported delimeter, chances are the string contains characters apart from number

### processDelimiter

This method is used for splitting string with multiple delimeters recursively, resulting in multiple dimension array of numbers (dimension varies w.r.t the delimeters and their arragngement)

### validateAndReplaceDelimeterFromTheString

This method is used to validate delimeter structure and the content inside the different square brackets, furthermore, all the delimeters will be pushed to the delimeters property in class and the rest of the string is used for validation and calculation

### checkIfStringContainsValidDelimeters

This method is used to check if the string contains the supported delimeters only by splitting across delimeters, the resulting delimeter must have numbers only, if any additional character is left, this means the string contains invalid delimeter


### validateString

This method is used to check wheter we pass the correct input as per the requirement mentioned


### calculateSum

This method is used to calculate sum of the string formed by validating and serializing the string escaped by ","


If you have further queries, doubts, feel free to ask me!

Happy Coding :)
