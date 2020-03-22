function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    expr = expr.replace(/[' ']/g,'');
    // expr = expr.replace(/[-]/g,'m');
    let arr = expr.split(''), 
        firstBr = 0, lastBr = 0;
    
    arr.forEach(element => {
        if (element == '(') {
            firstBr++;
        }
        if (element == ')') {
            lastBr++;
        }
    });
    if (firstBr != lastBr) {
        throw new Error('ExpressionError: Brackets must be paired');
    }
    
    for (let i = 0; i < firstBr; i++) {
        let firstBrInd = expr.lastIndexOf('('), lastBrInd = expr.indexOf(')', firstBrInd),
        insideBr = expr.slice(firstBrInd+1, lastBrInd)
        insideResult = calculation(insideBr);
        expr = expr.replace('('+insideBr+')', insideResult);
    }
    
    return calculation(expr);
}
function calculation(str) {
    str = str.replace(/[-]/g,'m');
    if (str[0] == 'm') {
        str = '-'+str.slice(1);
    }
    let arr = str.split(''), countIndZnak = 0, tempStr = '';
    for (let i = 0; i < str.length; i++) {
        if (str[i] == '+' || str[i] == '*' || str[i] == '/') {
            countIndZnak++;
            tempStr += str[i];
        }
        else if (str[i] == 'm') {
            if (str[i-1] == '+' || str[i-1] == '*' || str[i-1] == '/' || str[i-1] == 'm') {
                tempStr += '-';
            }
            else{
                tempStr += str[i];
                countIndZnak++;
            }
        }
        else {
            tempStr += str[i];
        }
    }
    str = tempStr;
    for (let i = 0; i < countIndZnak; i++) {
        let firstIndZnak = 0, targetIndZnak = 0, lastIndZnak = 0;
        targetIndZnak = str.match(/[+,m,*,/]/).index;
        if (i+1 == countIndZnak) {
            lastIndZnak = str.length-1;
        }
        else {
            lastIndZnak = str.slice(targetIndZnak+1).match(/[+,m,*,/]/).index + targetIndZnak;
            if ((str[targetIndZnak] == '+' || str[targetIndZnak] == 'm') && (str[lastIndZnak+1] == '*' || str[lastIndZnak+1] == '/')) {
                firstIndZnak    = targetIndZnak+1;
                targetIndZnak   = lastIndZnak+1;
                if (i+2 == countIndZnak) {
                    lastIndZnak = str.length-1;
                }
                else {
                    lastIndZnak = str.slice(targetIndZnak+1).match(/[+,m,*,/]/).index + targetIndZnak;
                }
            }
        }
        let a = parseFloat(str.slice(firstIndZnak, targetIndZnak)), b = parseFloat(str.slice(targetIndZnak+1, lastIndZnak+1)), znak = str[targetIndZnak], result = 0;
        if (znak == '+') {
            result = a+b;
        }
        else if (znak == 'm') {
            result = a-b;
        }
        else if (znak == '/') {
            if (b == 0) {
                throw new Error('TypeError: Division by zero.');
            }
            else{
                result = a/b;
            }
        }
        else if (znak == '*') {
            result = a*b;
        }
        str = str.replace(str.slice(firstIndZnak, lastIndZnak+1), result);
    }

    return parseFloat(str);
}

module.exports = {
    expressionCalculator
}
