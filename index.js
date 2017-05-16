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

    // вычислить результат
    equal.on('click', function () {
        // 1000000000/100000000 для нормального вывода 0.1+0.2(и других)
        display.val( Math.round(eval(display.val())* 1000000000000000) / 1000000000000000);
    });

    // удалить последний символ
    del.on('click', function () {
        display.val( display.val().substring(0, display.val().length-1) );
    });

    // разрешенные символы (event.type должен быть keypress)
    getChar = function (event) {
        if (event.which == null) { // IE
            if (event.keyCode > 39 && event.keyCode < 58 && event.keyCode != 44) {
                return; // цифры и действия
            } else if (event.keyCode == 13 || event.keyCode == 61){
                display.val( Math.round(eval(display.val())* 1000000000000000) / 1000000000000000);
            }
            return event.preventDefault()
        }
        if (event.which != 0 && event.charCode != 0) { // все кроме IE
            if (event.which > 39 && event.which < 58 && event.which != 44) {
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

});