var accessKey = '561cc46a6be22601b0ec965c59e69cbd';
var fromDropdown = document.getElementById('dropdown-from');
var toDropdown = document.getElementById('dropdown-to');
var rates = [10,20,30,40,50,60];
var amount;
var from;
var to;

function fillDropdownLists(currencies) {
	for (currency of currencies) {
		var radio = document.createElement("Input");
		radio.type = 'radio';
		radio.id = currency + '2';
		var label = document.createElement("Label");
		label.innerHTML = currency;
		toDropdown.appendChild(radio);
		toDropdown.appendChild(label);
	}
	for (currency of currencies) {
		var radio = document.createElement("Input");
		radio.type = 'radio';
		radio.id = currency;
		var label = document.createElement("Label");
		label.innerHTML = currency;
		fromDropdown.appendChild(radio);
		fromDropdown.appendChild(label);
	}
}
function loadCurrency() {
	fetch(`http://data.fixer.io/api/latest?access_key=${accessKey}&base=EUR`, {
		method: 'get'
	}).then(function (response) {
		return response.json();
	}).then(function (j) {
		document.getElementById("time").innerHTML += j.date;
		rates = j.rates;
		fillDropdownLists(Object.keys(rates));
	})
}
function genereteOutput() {
	var output = document.getElementById('output');
	output.value = amount * to / from;
	if (isNaN(output.value) === true) {
		output.value = '';
	}
}
var amountInput = document.getElementById('amount');
amountInput.addEventListener('keyup', function () {
	amount = amountInput.value;
	genereteOutput();
})
toDropdown.addEventListener('click', function (e) {
	e.preventDefault();
	e.stopPropagation();
	this.classList.toggle('expanded');
	if (e.target.innerHTML === 'Przelicz na') {} else {
		to = rates[e.target.innerHTML];
		document.getElementById('currency-output').innerHTML = e.target.innerHTML;
		genereteOutput();
	}
})
fromDropdown.addEventListener('click', function (e) {
	e.preventDefault();
	e.stopPropagation();
	this.classList.toggle('expanded');
	if (e.target.innerHTML === 'Przelicz z') {} else {
		from = rates[e.target.innerHTML];
		document.getElementById('currency-input').innerHTML = e.target.innerHTML;
		genereteOutput();
	}
})
document.addEventListener('click', function () {
	fromDropdown.classList.remove('expanded');
	toDropdown.classList.remove('expanded');
})

document.getElementById("amount").onkeypress = function (e) {
	var chr = String.fromCharCode(e.which);
	if ("1234567890.".indexOf(chr) < 0) {
		return false;
	}
};
/* loadCurrency(); */
document.getElementsByTagName('select')[0].addEventListener('click', function (e) {
	e.preventDefault();
	e.stopPropagation();
	console.log('eq');
	this.classList.toggle('expanded');
/* 	if (e.target.innerHTML === 'Przelicz z') {} else {
		from = rates[e.target.innerHTML];
		document.getElementById('currency-input').innerHTML = e.target.innerHTML;
		genereteOutput();
	} */
})
fillDropdownLists ([1,2,3,4,5,7,7,7,7,7,,7,7,7,7,7,7,7,7]);