var board = document.querySelector("table");
var cellLiterals = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']; // Список с литерами.
var cellNumbers = ['8', '7', '6', '5', '4', '3', '2', '1']; // Список с номерами строк.
var Colors = ['white', 'black'];
var WhiteFigures = ["&#9814;", "&#9816;", "&#9815;", "&#9813;", "&#9812;", "&#9815;", "&#9816;", "&#9814;", "&#9817;"];
var BlackFigures = ["&#9820;", "&#9822;", "&#9821;", "&#9819;", "&#9818;", "&#9821;", "&#9822;", "&#9820;", "&#9823;"];
var lineNymber = -1,
	columnNumber = 0,
	colorNumber = 0;

function draw(color) {
	newTd.style.width = '50px';
	newTd.style.height = '50px';
	newTd.style.textAlign = 'center';
	newTd.style.backgroundColor = color;
	newTd.style.fontSize = '35px'
	newTr.append(newTd);
}

function borderElements() {
	newTd.innerText = cellNumbers[lineNymber];
	newTd.style.textAlign = 'center';
	newTd.style.fontSize = '35px'
	newTr.append(newTd);
}

function drawHead() {
	newTh.style.width = '50px';
	newTh.style.height = '50px';
	newTh.style.fontSize = '35px';
	newTr.append(newTh);
}

function putSmallWhiteChess(cell) {
		let figure = WhiteFigures[8];
		cell.innerHTML = (figure);
}

function putSmallBlackChess(cell){
		let figure = BlackFigures[8];
		cell.innerHTML = (figure);	
}

function putBigWhiteChess(cell, iter) {
	let figure = WhiteFigures[iter];
	cell.innerHTML = (figure);
}
	
function putBigBlackChess(cell, iter){
	let figure = BlackFigures[iter];
	cell.innerHTML = (figure);	
}

for (var i = 0; i < 10; i++) { //Создаю горизонтальные линии доски.
	var newTr = document.createElement("tr");
	columnNumber = 0; //Обнуляю номер колонки.
	if (i === 0 || i === 9) { //Выделяю первую и последнюю линию доски.
		for (var j = 0; j < 10; j++) { //Создаю 10-ть ячеек.
			if (j === 0 || j === 9) { // 1-ю и 9-ю делаю пустой. 
				var newTh = document.createElement("th");
				drawHead();
			} else {
				var newTh = document.createElement("th");
				newTh.innerText = cellLiterals[columnNumber]; // Получаю буквы колонки.
				if (i === 0) { // Первую строка с перевернутыми буквами.
					newTh.style.transform = 'rotate(180deg)'; //Вращаю буквы.
				}
				drawHead();
				columnNumber++;
			}
		}
	} else { // Создаю линии со 2-й по 9-ю.
		if (i % 2 != 0) {
			for (var l = 0; l < 10; l++) {
				var newTd = document.createElement("td");
				if (l === 0 || l === 9) { // Отделяю 1-ю и 9-ю ячейку.
					borderElements(); // Добавляю номер по краям.
				} else if (l % 2 === 0) { // Кратные 2-м закрашиваю черным цветом.
					draw('gray');
				} else {
					draw('white'); // Не кратные - белым.
				}
			}
		} else {
			for (var l = 0; l < 10; l++) { // 
				var newTd = document.createElement("td");
				if (l === 0 || l === 9) { // Отделяю 1-ю и 9-ю ячейку.
					borderElements(); // Добавляю номер по краям.
				} else if (l % 2 != 0) { // Не кратные 2-м закрашиваю черным цветом.
					draw('gray');
				} else {
					draw('white'); // Кратные - белым.
				}
			}
		}
	}
	board.append(newTr);
	lineNymber++;
}

for (var i = 1; i < 9; i++) {
	var a = 1, b = 2;
	putSmallWhiteChess((board.getElementsByTagName('tr')[2].getElementsByTagName('td')[i]));
	putBigWhiteChess((board.getElementsByTagName('tr')[1].getElementsByTagName('td')[i]), i - 1, a);
	putSmallBlackChess((board.getElementsByTagName('tr')[7].getElementsByTagName('td')[i]), a);
	putBigBlackChess((board.getElementsByTagName('tr')[8].getElementsByTagName('td')[i]), i - 1);
}
