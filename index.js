$(document).ready(function () {

    var calc = $('.calculator');
    var display = calc.find('#display');
    var button = calc.find(".key__item_number-action");
    var clear = calc.find('#C');
    var equal = calc.find('#equal');
    var del = calc.find('#Del');


    // добавление цифр и действий
    button.on('click', function () {
        display.val( display.val() + $(this).attr('value') );
    });

    // полная очистка
    clear.on('click', function () {
        display.val('');
    });

    // удалить последний символ
    del.on('click', function () {
        display.val( display.val().substring(0, display.val().length-1) );
    });

    // разрешенные символы (event.type должен быть keypress)
    getChar = function (event) {
        if (event.which == null) { // IE
            if (event.keyCode > 39 && event.keyCode < 58 && event.keyCode != 44 && event.keyCode != 32) {
                return; // цифры и действия
            } else if (event.keyCode == 13 || event.keyCode == 61){
                result (display[0].value);
            }
            return event.preventDefault()
        }
        if (event.which != 0 && event.charCode != 0) { // все кроме IE
            if (event.which > 39 && event.which < 58 && event.which != 44 && event.which != 32) {
                return; // цифры и действия
            } else if (event.which == 13 || event.which == 61){
                result (display[0].value);
            }
            return event.preventDefault();
        }
    };

    // запрет на вставку
    document.getElementById("display").onpaste = function() {
        return false;
    };

    // вычислить результат
    equal.on('click', function () {
       result (display[0].value);

    });

    function result(input) {
        var stack1 = [],
            stack2 = [],
            i,
            err1 = 0,
            err2 = 0;

        for (i=0; i < input.length; i++) {
            if (input[i] === '0' || input[i] ==='1' || input[i] ==='2' || input[i] ==='3' ||
                input[i] ==='4' || input[i] ==='5' || input[i] ==='6' || input[i] ==='7' ||
                input[i] ==='8' || input[i] ==='9'){

                var q = i+1;
                while (q < input.length && (input[q] === '0' || input[q] ==='1' || input[q] ==='2' ||
                input[q] ==='3' || input[q] ==='4' || input[q] ==='5' || input[q] ==='6' ||
                input[q] ==='7' || input[q] ==='8' || input[q] ==='9' || input[q] ==='.')) {

                    q++
                }
                stack1.push(+input.slice(i,q));
                i=q-1;
            } else if (input[i] === '(') {
                stack2.push(input[i]);
                err1++;
            } else if (input[i] === ')') {
                var j = stack2.length-1;
                while ( j>=0 && stack2[j] !== '(')  {
                    stack1.push(stack2[j]);
                    stack2.pop();
                    j--;
                }
                stack2.pop();
                err2++;

            } else if (input[i] === '*' || input[i] ==='/') {
                var z = stack2.length-1;
                while ( z >= 0 && (stack2[z] === '*' || stack2[z] === '/') ) {
                    stack1.push(stack2[z]);
                    stack2.pop();
                    z--;
                }
                stack2.push(input[i]);
            } else if (input[i] === '+' || input[i] ==='-') {
                if (input[i] ==='-' && !(input[i-1] === '0' || input[i-1] ==='1' || input[i-1] ==='2' ||
                    input[i-1] ==='3' || input[i-1] ==='4' || input[i-1] ==='5' || input[i-1] ==='6' ||
                    input[i-1] ==='7' || input[i-1] ==='8' || input[i-1] ==='9') ) {

                    stack1.push('0');
                }
                var y = stack2.length-1;
                while ( y >= 0 && (stack2[y] === '+' || stack2[y] === '-' || stack2[y] === '*' || stack2[y] === '/') ) {
                    stack1.push(stack2[y]);
                    stack2.pop();
                    y--;
                }
                stack2.push(input[i]);
            } else alert ('error');
        }

        var x = stack2.length-1;
        while (x >= 0) {
            stack1.push(stack2[x]);
            stack2.pop();
            x--;
        }

        var t = 2;
        while (t < stack1.length) {
            if (stack1[t] === '*') {
                stack1[t-2] = (stack1[t-2] * stack1[t-1]);
                stack1.splice(t-1,2);
                t--;
            } else if (stack1[t] === '/') {
                stack1[t-2] = (stack1[t-2] / stack1[t-1]);
                stack1.splice(t-1,2);
                t--;
            } else if (stack1[t] === '+') {
                stack1[t-2] = (+stack1[t-2] + +stack1[t-1]);
                stack1.splice(t-1,2);
                t--;
            } else if (stack1[t] === '-') {
                stack1[t-2] = (stack1[t-2] - stack1[t-1]);
                stack1.splice(t-1,2);
                t--;
            } else {
                t++
            }
        }
        display[0].value = stack1[0];
        if (err1 !== err2) {
            alert('Несовпадение кол-ва открывающих и закрывающих скобок')
            display[0].value = '';
        }
    }
});
