//		1. Написать функцию, преобразующую число в объект.

var digits = {
	units: 0,
	tenner: 0,
	hundreds: 0,
	toCount: function (number) {
		var numbers = [];
		numbers = number.split('');
		if (number.length === 3) {
			this.hundreds = numbers[0];
			this.tenner = numbers[1];
			this.units = numbers[2];
		} else if (number.length === 2) {
			this.tenner = numbers[0];
			this.units = numbers[1];
		} else if (number.length === 1) {
			this.units = numbers[0];
		}
	},
	toShow: function () {
		console.log('Сотен: ' + digits.hundreds + ', Десятков: ' + digits.tenner + ', Единиц: ' + digits.units);
	}
}
var answer;
while (true) {

	answer = prompt('Введите число от 0 до 999 ', 0);
	if (answer < 999) {
		digits.toCount(answer);
		digits.toShow();
		break;
	} else {
		console.log('Вы ввели слишком большое число!');
		digits.toShow();
		break;
	}
}
