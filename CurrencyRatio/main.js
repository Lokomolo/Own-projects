/* var request = new XMLHttpRequest();

request.open('GET','http://data.fixer.io/api/latest?access_key=561cc46a6be22601b0ec965c59e69cbd&base=EUR', true);

var data = JSON.parse(this.response);
console.log(data); */
/* GET http://data.fixer.io/api/latest?access_key=561cc46a6be22601b0ec965c59e69cbd&base=EUR */
var currenciesRateArr;
var currencies;
var rates = [];
var accessKey = '561cc46a6be22601b0ec965c59e69cbd';

/*  fetch(`http://data.fixer.io/api/latest?access_key=${accessKey}&base=EUR`, {method:'get'}).then(function(response) { 
	// Convert to JSON

	return response.json();
}).then(function(j) {
	currenciesRateArr = Object.entries(j.rates);
	currencies = j;
	console.log(currencies);
}); */
function convertCurrency(from, to, amount){
	result = 0;
	fetch(`http://data.fixer.io/api/convert?access_key=${accessKey}&from=${from}&to=${to}&amount=${amount}`, {method:'get'}).then(function(response){
	return response.json();
	}).then(function(k){
		console.log(k);
		result = Object.entries(k.succes);
	});
	return result;
}
console.log(convertCurrency('EUR', 'PLN', 25));
document.getElementsByTagName('main')[0].style.display = 'none';
console.log(document.getElementsByTagName('main')[0].style.display);
setTimeout(waitingForApi, 11);
function waitingForApi() {
	console.log('waiting');
	console.log(currenciesRateArr);
	document.getElementsByTagName('main')[0].style.display = 'block';
}
/* console.log(currencies.rates[2]); */
var dropDownList = document.getElementById('dropdown-el');
dropDownList.addEventListener('click', function(e) {
	console.log(e.target.innerHTML);
	e.preventDefault();
	e.stopPropagation();
	this.classList.toggle('expanded');
	document.addEventListener('click', function() {
		dropDownList.classList.remove('expanded');
	})
})
