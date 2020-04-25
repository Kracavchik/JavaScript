// Глобальные переменные:                            
var FIELD_SIZE_X = 20; //строки
var FIELD_SIZE_Y = 20; //столбцы
var SNAKE_SPEED = 200; // Интервал между перемещениями змейки
var snake = []; // Сама змейка
var direction = 'y-'; // Направление движения змейки
var gameIsRunning = false; // Запущена ли игра
var snake_timer; // Таймер змейки
var food_timer; // Таймер для еды
var score = 0; // Результат
var current_obstacle = null; //ячейка препятствия, изначально - пуста
var last_unit; // последняя позиция 

function init() {
	prepareGameField(); // Генерация поля

	var wrap = document.getElementsByClassName('wrap')[0];
	// Подгоняем размер контейнера под игровое поле

	/*
	if (16 * (FIELD_SIZE_X + 1) < 380) {
        wrap.style.width = '380px';
    }
    else {
        wrap.style.width = (16 * (FIELD_SIZE_X + 1)).toString() + 'px';
    }
    */
	wrap.style.width = '400px';
	// События кнопок Старт и Новая игра
	document.getElementById('snake-start').addEventListener('click', startGame);
	document.getElementById('snake-renew').addEventListener('click', refreshGame);

	// Отслеживание клавиш клавиатуры
	addEventListener('keydown', changeDirection);
}

/**
 * Функция генерации игрового поля
 */
function prepareGameField() {
	// Создаём таблицу
	var game_table = document.createElement('table');
	game_table.setAttribute('class', 'game-table ');

	// Генерация ячеек игровой таблицы
	for (var i = 0; i < FIELD_SIZE_X; i++) {
		// Создание строки
		var row = document.createElement('tr');
		row.className = 'game-table-row row-' + i;

		for (var j = 0; j < FIELD_SIZE_Y; j++) {
			// Создание ячейки
			var cell = document.createElement('td');
			cell.className = 'game-table-cell cell-' + i + '-' + j;

			row.appendChild(cell); // Добавление ячейки
		}
		game_table.appendChild(row); // Добавление строки
	}

	document.getElementById('snake-field').appendChild(game_table); // Добавление таблицы
}

/**
 * Старт игры
 */
function startGame() {
	gameIsRunning = true;
	respawn(); //создали змейку

	snake_timer = setInterval(move, SNAKE_SPEED); //каждые 200мс запускаем функцию move
	setTimeout(createFood, 1000);
}

/**
 * Функция расположения змейки на игровом поле
 */
function respawn() {
	// Змейка - массив td
	// Стартовая длина змейки = 2

	// Respawn змейки из центра
	var start_coord_x = Math.floor(FIELD_SIZE_X / 2);
	var start_coord_y = Math.floor(FIELD_SIZE_Y / 2);

	// Голова змейки
	var snake_head = document.getElementsByClassName('cell-' + start_coord_y + '-' + start_coord_x)[0];
	snake_head.setAttribute('class', snake_head.getAttribute('class') + ' snake-unit');
	// Тело змейки
	var snake_tail = document.getElementsByClassName('cell-' + (start_coord_y - 1) + '-' + start_coord_x)[0];
	snake_tail.setAttribute('class', snake_tail.getAttribute('class') + ' snake-unit');

	snake.push(snake_head);
	snake.push(snake_tail);
}




/**
 * Движение змейки
 */
function move() {
	console.log(direction);
	// Сборка классов
	var snake_head_classes = snake[snake.length - 1].getAttribute('class').split(' ');

	// Сдвиг головы
	var new_unit;
	var snake_coords = snake_head_classes[1].split('-'); //преобразовали строку в массив
	var coord_y = parseInt(snake_coords[1]);
	var coord_x = parseInt(snake_coords[2]);

	// Определяем новую точку
	if (direction == 'x-') {
		new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (coord_x - 1))[0];
	} else if (direction == 'x+') {
		new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (coord_x + 1))[0];
	} else if (direction == 'y+') {
		new_unit = document.getElementsByClassName('cell-' + (coord_y + 1) + '-' + (coord_x))[0];
	} else if (direction == 'y-') {
		new_unit = document.getElementsByClassName('cell-' + (coord_y - 1) + '-' + (coord_x))[0];
	}

	// Проверки
	// 1) new_unit не часть змейки
	// 2) Змейка не ушла за границу поля
	// 3) Змейка не попала в препятствие
	//console.log(new_unit);
	if (!isSnakeUnit(new_unit) && new_unit !== undefined && !isObstacleUnit(new_unit)) {
		// Добавление новой части змейки
		addNewSnakeElement(new_unit);
		// Проверяем, надо ли убрать хвост
		isNeedRemoveTail(new_unit);

	} else if (new_unit == undefined) { //Если следующая ячейка - край игрового поля	
		let last_unit_YX = last_unit.getAttribute("class").split(' ')[1].split('-'); //координаты последней ячейки
		console.log(last_unit_YX);
		if (parseInt(last_unit_YX[1]) === 0 && parseInt(last_unit_YX[2] === 0)) { //Все координаты равню нулю - лев.верхн.угол
			if (direction === 'y-') { // если движемся вверх
				new_unit = setNewCoardinate(FIELD_SIZE_Y - 1, 0);
			}
			if (direction === 'x-') { //если движемся влево
				new_unit = setNewCoardinate(0, FIELD_SIZE_X - 1);
			}
		} else if (parseInt(last_unit_YX[1]) === 0 && direction === 'y-') { //Столкнулись с верхним краем
			new_unit = setNewCoardinate(FIELD_SIZE_Y - 1, last_unit_YX[2]);

		} else if (parseInt(last_unit_YX[1]) === 19 && direction === 'y+') { //Столкнулись с нижний краем
			new_unit = setNewCoardinate(0, last_unit_YX[2]);

		} else if (parseInt(last_unit_YX[2]) === 0 && direction === 'x-') { //Столкнулись с левый краем
			new_unit = setNewCoardinate(last_unit_YX[1], FIELD_SIZE_Y - 1);

		} else if (parseInt(last_unit_YX[2]) === 19 && direction === 'x+') { //Столкнулись с правым краем
			new_unit = setNewCoardinate(last_unit_YX[1], 0);
		}
		
		// Добавление новой части змейки
		addNewSnakeElement(new_unit);
		// Проверяем, надо ли убрать хвост
		isNeedRemoveTail(new_unit);		
	} else {
		finishTheGame();
	}
}

/**
 * Проверка на змейку
 * @param unit
 * @returns {boolean}
 */

function addNewSnakeElement (snakeElement) {
	console.log(snakeElement);
	snakeElement.setAttribute('class', snakeElement.getAttribute('class') + ' snake-unit');	
	last_unit = snakeElement;
	snake.push(snakeElement);
}

function setNewCoardinate(y, x) {
	let new_class = '.cell' + '-' + y + '-' + x,
		new_element = document.querySelector(new_class);
	console.log(new_class);
	return new_element;
}

function isNeedRemoveTail(next_unit) { //нужно ли удалять хвост
	if (!haveFood(next_unit)) {
		// Находим хвост
		var removed = snake.splice(0, 1)[0];
		var classes = removed.getAttribute('class').split(' ');

		// удаляем хвост
		removed.setAttribute('class', classes[0] + ' ' + classes[1]);
	}
}

function isSnakeUnit(unit) { //проверка, что змейка не попала сама в себя в новой ячейке
	var check = false;

	if (snake.includes(unit)) { //если в змейке содержится новая ячейка, значит возникло пересечение
		check = true;
	}
	return check;
}

function isObstacleUnit(unit) { //проверка, что змейка не ударилась о препятствие
	var check = false;
	var unit_classes = unit.getAttribute('class');
	if (unit_classes.includes('obstacle-unit')) { //если в новой ячейке препятствие - змейка ударилась
		check = true;
	}
	return check;
}

/**
 * проверка на еду
 * @param unit
 * @returns {boolean}
 */
function haveFood(unit) {
	var check = false;

	var unit_classes = unit.getAttribute('class').split(' ');

	// Если еда
	if (unit_classes.includes('food-unit')) {
		check = true;
		createFood();
		create_obstacle();
		score++;
		refresh_score(score);
	}
	return check;
}

function refresh_score(score) { //Обновляет счет в блоке #game_score
	var current_score = document.getElementById("game_score"),
		new_score_number = parseInt(current_score.innerHTML.split(" ")[1]) + 1;
	current_score.innerHTML = current_score.innerHTML.split(" ")[0] + " " + new_score_number;
	console.log(current_score);

}

function create_obstacle() { //генерирует блок препятствия
	var obstacleCreated = false;
	while (!obstacleCreated) { //пока блок препятсивя не создан
		var obstacle_x = Math.floor(Math.random() * FIELD_SIZE_X);
		var obstacle_y = Math.floor(Math.random() * FIELD_SIZE_Y);

		var obstacle_cell = document.getElementsByClassName('cell-' + obstacle_y + '-' + obstacle_x)[0];
		var obstacle_cell_classes = obstacle_cell.getAttribute('class');

		//проверка на змейку, еду, препятствие.
		if (!obstacle_cell_classes.includes('food-unit') && !obstacle_cell_classes.includes('snake-unit') && !obstacle_cell_classes.includes('obstacle-unit')) {

			obstacle_cell.setAttribute('class', obstacle_cell_classes + ' obstacle-unit');
			if (current_obstacle != null) { // если это не первое препятствие, удаляем старое.
				current_obstacle.classList.remove('obstacle-unit');
			}
			current_obstacle = obstacle_cell; //сохраняю данные о новом препятсвие
			obstacleCreated = true;
		}
	}
}

/**
 * Создание еды
 */
function createFood() {
	var foodCreated = false;

	while (!foodCreated) { //пока еду не создали
		// рандом
		var food_x = Math.floor(Math.random() * FIELD_SIZE_X);
		var food_y = Math.floor(Math.random() * FIELD_SIZE_Y);

		var food_cell = document.getElementsByClassName('cell-' + food_y + '-' + food_x)[0];
		var food_cell_classes = food_cell.getAttribute('class').split(' ');

		// проверка на змейку
		if (!food_cell_classes.includes('snake-unit') && !food_cell_classes.includes('obstacle-unit')) {
			var classes = '';
			for (var i = 0; i < food_cell_classes.length; i++) {
				classes += food_cell_classes[i] + ' ';
			}

			food_cell.setAttribute('class', classes + 'food-unit');
			foodCreated = true;
		}
	}
}

/**
 * Изменение направления движения змейки
 * @param e - событие
 */
function changeDirection(e) {
	console.log(e);

	switch (e.keyCode) {
		case 37: // Клавиша влево
			if (direction != 'x+') {
				direction = 'x-'
			}
			break;
		case 38: // Клавиша вверх
			if (direction != 'y+') {
				direction = 'y-'
			}
			break;
		case 39: // Клавиша вправо
			if (direction != 'x-') {
				direction = 'x+'
			}
			break;
		case 40: // Клавиша вниз
			if (direction != 'y-') {
				direction = 'y+'
			}
			break;
	}
}

/**
 * Функция завершения игры
 */
function finishTheGame() {
	gameIsRunning = false;
	clearInterval(snake_timer);
	alert('Вы проиграли! Ваш результат: ' + score.toString());
}

/**
 * Новая игра
 */
function refreshGame() {
	location.reload();
}

// Инициализация
window.onload = init;
