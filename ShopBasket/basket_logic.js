function start() { //Добавляет событие с функцией кнопкам.
	var buttons = document.getElementsByTagName('button');
	for (i = 0; i < 4; i++) {
		buttons[i].onclick = addToCart;//вызываю функцию для добавления в корзину.
	}
}

function calculate(id){// подсчитываю стоимость после добавления товара
	var fullAmount = document.getElementById("FullAmount");//получаю элемент с суммой корзины
	var fullPrice = parseInt((fullAmount).innerText);// получаю сумму корзины
	var addPrice = (document.getElementById("price_" + id)).innerText;//получаю стоимость товара
	addPrice = parseInt((addPrice.split(" "))[0]);//отделяю число от знака $		
	fullAmount.innerText = fullPrice + addPrice;//записываю новую итоговую сумму
}

function addToCart(EventObg) {
	var targetId = EventObg.target.id; // получаю id кнопки
	if (document.getElementById('basket_' + targetId)) { // проверяю наличие товара в корзине
		var existElement = document.getElementById('Count_' + targetId);
		existElement.innerText++;		
		calculate(targetId);//вызываю функцию для подсчета суммы		
	} else {// создаю, если нет в корзине
		var goods = document.getElementById("goods_buy"); // получаю элемент корзины
		var goodName = document.getElementById('name_' + targetId); // получаю имя товара
		
		var newDiv = document.createElement('div'); // создаю элемент товара		
		newDiv.classList.add('tovar'); // добавляю класс товару
		newDiv.id = 'basket_' + targetId; // присваиваю id товара элементу в корзине
		
		var spanName = document.createElement('span'); // Создаю элемент с именем товара
		spanName.classList.add('tovar_name'); // добавляю класс имени товара
		spanName.innerText = goodName.innerText; // добавляю имя элементу корзины
		
		var spanCount = document.createElement('span'); // Создаю элемент с кол-вом товара
		spanCount.classList.add('colvo'); // добавляю класс кол-ву товара
		spanCount.id = 'Count_' + targetId; //присваиваю id количеству товара
		spanCount.innerHTML = 1;
		
		newDiv.append(spanName); // добавляю span с именем к div товара
		newDiv.append(spanCount); //добавляю span с кол-вом к div товара
		console.log(newDiv);
		goods.append(newDiv);// Добавляю товар в блок корзины
		calculate(targetId);//вызываю функцию для подсчета суммы
	}
	
}

window.onload = start;//вызываю функцию после загрузки DOM
