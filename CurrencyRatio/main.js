var accessKey = '561cc46a6be22601b0ec965c59e69cbd';
var fromDropdown = document.getElementById('dropdown-from');
var toDropdown = document.getElementById('dropdown-to');
var rates;
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

function getCurrencyRates() {
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
}
var amountInput = document.getElementById('amount');
amountInput.addEventListener('keyup', function () {

	amount = amountInput.value;
	genereteOutput();
})

getCurrencyRates();
/* document.querySelector('#dropdown-from input:checked')
console.log(document.querySelector('#dropdown-from input:checked')); */
console.log(rates);
toDropdown.addEventListener('click', function (e) {
	console.log(e.target.innerHTML);
	e.preventDefault();
	e.stopPropagation();
	this.classList.toggle('expanded');
	to = rates[e.target.innerHTML];
	document.querySelector('#dropdown-to input:checked').checked = false;
	document.getElementById(e.target.innerHTML + '2').checked = true;
/* 	toDropdown.innerText = e.target.innerHTML; */
	/* 	document.addEventListener('click', function () {
			toDropdown.classList.remove('expanded');
			console.log(document.getElementById('dropdown-to').innerHTML);
		}) */
})
console.log(fromDropdown);
fromDropdown.addEventListener('click', function (e) {
	console.log(e.target.innerHTML);
	e.preventDefault();
	e.stopPropagation();
	this.classList.toggle('expanded');
	from = rates[e.target.innerHTML];
	console.log(fromDropdown.innerText);
	document.querySelector('#dropdown-from input:checked').checked = false;
	console.log(document.getElementById(e.target.innerHTML));
	document.getElementById(e.target.innerHTML).checked = true;
/* 	fromDropdown.innerText = e.target.innerHTML; */
	/* 	document.addEventListener('click', function () {
			fromDropdown.classList.remove('expanded');
		}) */
})