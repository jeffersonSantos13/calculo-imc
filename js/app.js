window.addEventListener('load', start);

var inputAltura = null;
var inputPeso = null;
var submitButton = null;
var imc = null;
var positionClassification = null;

var classification = ['Magreza', 'Normal', 'Sobrepeso', 'Obesidade', 'Obesidade Grave'];

function start() {
  inputAltura = document.querySelector('#inputAltura');
  inputPeso = document.querySelector('#inputPeso');
  submitButton = document.querySelector('#submitButton');

  inputAltura.addEventListener('keydown', keyCaracteresBloqued);

  preventDefault();
  activateInput();
}

function preventDefault() {
  function handleSubmit(event) {
    event.preventDefault();

    removeTableFocus();
    handleCalcIMC();
  }

  function removeTableFocus() {
    function removeClassElement(item) {
      if (item.classList.contains("imc__item")) {
        item.classList.remove('imc__item');
      }
    }

    let element = Array.from(document.querySelectorAll('table > tbody > tr'));
    element.map(removeClassElement);
  }

  function handleCalcIMC() {
    function convertInputNumber(value) {
      return parseFloat(value);
    }
    
    let altura = convertInputNumber(inputAltura.value);
    let peso = convertInputNumber(inputPeso.value);

    if (altura <= 0 || peso <=0) {
      return;
    }
    
    imc = peso / (altura * altura);

    classificationICM();
    render();
  }
  
  let form = document.querySelector('form');
  form.addEventListener('submit', handleSubmit);
}

function activateInput() {
  inputAltura.focus();
}

function classificationICM() {
  positionClassification = 
    imc < 18.5 ? 0 
      : imc > 18.5 && imc <= 24.9 ? 1 
      : imc > 25 && imc <= 29.9 ? 2
      : imc > 30 && imc <= 39.9 ? 3 : 4 
}

function render() {
  function focusTableClassification() {
    let element = Array.from(document.querySelectorAll('table > tbody > tr'));
    let item = element.find(getClassificationPosition);
    item.classList.add('imc__item');
  }

  function getClassificationPosition(item) {
    return item.innerHTML.includes(classification[positionClassification]) ? item : '';
  }

  const imcResult = document.querySelector('#imc__result__calc');
  imcResult.innerHTML = imc.toFixed(2);

  focusTableClassification();
}

function keyCaracteresBloqued(event) {
  let { key, code } = event;
  let reg = new RegExp(/^[0-9., ]+$/);
  
  if (code !== 'Backspace' && code !== 'Tab' && code !== 'Enter') {
    if (!reg.test(key)) {
      event.preventDefault();
    }
  }
}