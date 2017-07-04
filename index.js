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

    // // вычислить результат
    // equal.on('click', function () {
    //     // 1000000000/100000000 для нормального вывода 0.1+0.2(и других)
    //     display.val( Math.round(eval(display.val())* 1000000000000000) / 1000000000000000);
    // });

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
                display.val( Math.round(eval(display.val())* 1000000000000000) / 1000000000000000);
            }
            return event.preventDefault()
        }
        if (event.which != 0 && event.charCode != 0) { // все кроме IE
            if (event.which > 39 && event.which < 58 && event.which != 44 && event.which != 32) {
                return; // цифры и действия
            } else if (event.which == 13 || event.which == 61){
                display.val( Math.round(eval(display.val())* 1000000000000000) / 1000000000000000);
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
        var stack1 = [],
            stack2 = [],
            i,
            input = display[0].value;
        console.log(input[0]);

        for (i=0; i < input.length; i++) {
           if (input[i] === '0' || input[i] ==='1' || input[i] ==='2' || input[i] ==='3' || input[i] ==='4' || input[i] ==='5' || input[i] ==='6' || input[i] ==='7' || input[i] ==='8' || input[i] ==='9'){
                stack1.push(input[i]);
           } else if (input[i] === '(') {
               stack2.push(input[i]);
           } else if (input[i] === ')') {
               var j;
               for (j = stack2.lastIndexOf('(')+1; j < stack2.length; j++) {
                   stack1.push(stack2[j]);
               }
               stack2.splice( stack2.lastIndexOf('('));

           } else stack2.push(input[i]);

        }
        console.log(stack1, stack2);


    });
});
