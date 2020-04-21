var pictures = []; //Создаю массив с src картинок
var imgNumber = 1; //номер картинки

function f() {
	var imgs = document.getElementsByTagName('img'); //доб. событие по клику на картинку
	for (i = 0; i < imgs.length; i++) {
		imgs[i].onclick = showBigPic;
	}
	for (i = 0; i < 3; i++) {
		pictures[i] = "img/big/" + i + ".png";
	}
	var arrows = document.getElementsByClassName('arrow'); // доб. событие по клику на стрелку
	for (i = 0; i < arrows.length; i++) {
		if (i == 0) {
			arrows[i].onclick = switchLeft;
		}
		if (i == 1) {
			arrows[i].onclick = switchRight;
		}
	}
}

function showBigPic(EventObj) {
	var bigImg = document.getElementById("big_picture");
	bigImg.innerHTML = "";
	var eventElement = EventObj.target;
	var imageNameParts = eventElement.id.split("_");
	var src = "img/big/" + imageNameParts[1] + ".png";
	var imgDomElement = document.createElement("img");
	var noImg = document.createElement("img");
	noImg.src = "img/big/noImage.png";
	imgDomElement.src = src;
	imgDomElement.onload = function () { //если фото существует, вывожу
		bigImg.appendChild(imgDomElement);
	}
	imgDomElement.onerror = function () { // если нет, вывожу заглушку
		bigImg.appendChild(noImg);
	}
}

function switchRight() {
	imgNumber++;		
	if (imgNumber == 3) imgNumber = 0;
	var j = imgNumber;	
	console.log(j);	
	var bigImg = document.getElementById("big_picture");
	var imgDomElement = document.createElement("img");
	imgDomElement.src = pictures[j];
	bigImg.innerHTML = "";
	bigImg.appendChild(imgDomElement);

}

function switchLeft() {
	imgNumber--;	
	if (imgNumber == -1) imgNumber = 2;
	var j = imgNumber;
	var bigImg = document.getElementById("big_picture");
	var imgDomElement = document.createElement("img");
	imgDomElement.src = pictures[j];
	bigImg.innerHTML = "";
	bigImg.appendChild(imgDomElement);
	console.log(j);

}

window.onload = f;
