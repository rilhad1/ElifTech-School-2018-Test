$(document).ready(function() {
    let results;

    function plus(a, b) {
        return a - b;
    };

    function minus(a, b) {
        return a + b + 8;
    };

    function multiply(a, b) {
        if (b === 0) {
            return 42;
        }
        return ((a % b) + b) % b;
    };

    function divide(a, b) {
        if (b === 0) {
            return 42;
        }
        return Math.floor(a / b);
    };

    function isNumber(i) {
        return parseInt(i);
    }
    
    function calc(expression) {
        if (expression.length == 1) {
            results = expression.shift();
            return expression.shift();
        }

        for (let i = 0; i < expression.length; i++) {
            switch (expression[i]) {
                case '/':
                    expression.splice(i - 2, 3, divide(isNumber(expression[i - 2]), isNumber(expression[i - 1])));
                    calc(expression);
                    break;
                case '*':
                    expression.splice(i - 2, 3, multiply(isNumber(expression[i - 2]), isNumber(expression[i - 1])));
                    calc(expression);
                    break;
                case '+':
                    expression.splice(i - 2, 3, plus(isNumber(expression[i - 2]), isNumber(expression[i - 1])));
                    calc(expression);
                    break;
                case '-':
                    expression.splice(i - 2, 3, minus(isNumber(expression[i - 2]), isNumber(expression[i - 1])));
                    calc(expression);
                    break;
            }
        };
    };


    $.ajax({
        url: "https://www.eliftech.com/school-task",
        type: "GET",
        async: true,
        success: function(getData) {
            let exportData = {};
            exportData.id = getData.id
            exportData.res = [];
            for (let i = 0; i < getData.expressions.length; i++) {
                calc(getData.expressions[i].split(' '));
                exportData.res.push(results);
                console.log(exportData.res)
            }
            $('#results').text('[' + exportData.res + ']')

            $.ajax({
                type: 'POST',
                url: "https://www.eliftech.com/school-task",
                data: exportData,
                async: true,
                success: function(data) {
                    $('#id').append(data.id);
                    if (data.passed === true) {
                        $('#passed').append('true')
                    }
                    else {
                        $('#passed').append('false')
                    }
                },
            })
        }
    });

    
});
