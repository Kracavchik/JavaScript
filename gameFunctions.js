var questions = {
	q0: 'Кто из этих философов в 1864 году написал музыку на стихи А.С. Пушкина «Заклинание» и «Зимний вечер»?\n',
	a01: '1 - Юнг\n',
	a02: '2 - Гегель\n',
	a03: '3 - Шопенгауэр\n',
	a04: '4 - Ницше\n',
	q1: 'Сколько раз в сутки подзаводят куранты Спасской башни Кремля?\n',
	b11: '1 - Один\n',
	b12: '2 - Два\n',
	b13: '3 - Четыре\n',
	b14: '4 - Три\n',
	q2: 'Кто 1-м получил Нобелевскую премию по литературе?\n',
	c21: '1 - Романист\n',
	c22: '2 - Драматург\n',
	c23: '3 - Эссеист\n',
	c24: '4 - Поэт\n',
	q3: 'С какой буквы начинаются слова, опубликованные в 16-м томе последнего издания Большой советской энциклопедии?\n',
	d31: '1 - М\n',
	d32: '2 - О\n',
	d33: '3 - Н\n',
	d34: '4 - П\n',
}

function play() {
	while (true) {
		var answer = (prompt('Сыграем в "Кто хочет стать миллионером?"').toUpperCase());
		if (answer === 'Y') {
			return true;
		} else if (answer === 'N') {
			return false;
		} else {
			alert('Нет такого ответа!')
		}
	}
}

var gameLog = [];
var playerScore = 0;
var questNumber = 0;

function checkAnswer(digit, number) {
	var rightAnswers = [4, 2, 4, 1];
	if (digit === rightAnswers[number]) {
		playerScore++;
		gameLog.push(digit);
		questNumber++;
	} else {
		gameLog.push(digit);
		questNumber++;
	}
}


function showStat() {
	alert('Ваши ответы: \n' +
		'Вопрос 1: ' + gameLog[0] + '\n' +
		'Вопрос 2: ' + gameLog[1] + '\n' +
		'Вопрос 3: ' + gameLog[2] + '\n' +
		'Вопрос 4: ' + gameLog[3] + '\n' +
		'Правильных ответов: ' + playerScore)
}

function showStep(step) {
	var number = step - 1;
	alert('Вопрос ' + step + ': ' + gameLog[number])
	
}

function game() {
	var answ;
	answ = parseInt(+prompt(questions.q0 + questions.a01 + questions.a02 + questions.a03 + questions.a04));
	checkAnswer(answ, questNumber);

	answ = parseInt(+prompt(questions.q1 + questions.b11 + questions.b12 + questions.b13 + questions.b14));
	checkAnswer(answ, questNumber);

	answ = parseInt(+prompt(questions.q2 + questions.c21 + questions.c22 + questions.c23 + questions.c24));
	checkAnswer(answ, questNumber);

	answ = parseInt(+prompt(questions.q3 + questions.d31 + questions.d32 + questions.d33 + questions.d34));
	checkAnswer(answ, questNumber);

	while (true) {
		var stepNumber = parseInt(prompt('Какой ход показать? 0 - показать все.'));
		if (stepNumber === 0){
			showStat();
			break;
		}
		showStep(stepNumber);
		break;
	}
	
	
}
