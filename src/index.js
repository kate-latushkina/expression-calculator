function eval() {
    // Do not use eval!!!
    return;
}


function expressionCalculator(expr) {
    expr = expr.replace(/\s/g, '').replace(/[(]/g, " ( ").replace(/[)s]/g, " ) ").replace(/[+]/g, " + ").replace(/[-]/g, " - ").replace(/[*]/g, " * ").replace(/[/]/g, " / ").replace(/ {1,}/g, " ").trim();
    var numbers = [];
    var operators = [];
    var priority = {
        '-': 1,
        '+': 1,
        '*': 2,
        '/': 2
    }
    expr = expr.split(' ');

    let firstBr = 0;
    let lastBr = 0;
    expr.forEach(element => {
        if (element == '(') {
            firstBr++;
        }
        if (element == ')') {
            lastBr++;
        }
    });
    if (firstBr != lastBr) {
        throw new Error("ExpressionError: Brackets must be paired");
    } else {
        for (let i = 0; i < expr.length; i++) {
            if (!isNaN(+expr[i])) {
                addNumbersArray(+expr[i]);
            } else {
                checkOperator(expr[i]);
            }
        }
        finall();
    }


    function finall() {
        if (operators.length != 0) {
            var number_1 = numbers[numbers.length - 2];
            var number_2 = numbers[numbers.length - 1];
            var operator_1 = operators[operators.length - 1];
            numbers.pop();
            numbers.pop();
            operators.pop();
            calc(number_1, number_2, operator_1);
            finall();
        }
    }
    return numbers[0];

    function addNumbersArray(number) {
        numbers.push(number);
    }
    function addOperatorsArray(operator) {
        operators.push(operator);
    }

    function checkOperator(operator) {
        if ((operators.length == 0 || priority[operator] > priority[operators[operators.length - 1]] || operators[operators.length - 1] == '(' || operator == '(') && operator != ')') {
            addOperatorsArray(operator);
        } else if (priority[operator] <= priority[operators[operators.length - 1]] && operator != ')') {
            var number_1 = numbers[numbers.length - 2];
            var number_2 = numbers[numbers.length - 1];
            var operator_1 = operators[operators.length - 1];
            numbers.pop();
            numbers.pop();
            operators.pop();
            calc(number_1, number_2, operator_1);
            checkOperator(operator);
        } else if (operator == ')') {
            if (operators[operators.length - 1] == '(') {
                operators.pop();
            } else {
                var number_1 = numbers[numbers.length - 2];
                var number_2 = numbers[numbers.length - 1];
                var operator_1 = operators[operators.length - 1];
                numbers.pop();
                numbers.pop();
                operators.pop();
                calc(number_1, number_2, operator_1);
                checkOperator(operator);
            }
        }
    }

    function calc(number_1, number_2, operator_1) {
        if (operator_1 == '+') {
            numbers.push(number_1 + number_2);
        }
        if (operator_1 == '-') {
            numbers.push(number_1 - number_2);
        }
        if (operator_1 == '*') {
            numbers.push(number_1 * number_2);
        }
        if (operator_1 == '/') {
            if (number_2 == 0) {
                throw new RangeError("TypeError: Division by zero.");
            } else {
                numbers.push(number_1 / number_2);
            }
        }
    }
}

module.exports = {
    expressionCalculator
}
