let addEventListeners = function () {
    let editButtons = document.querySelectorAll('button');
    let inputs = document.querySelectorAll('input');
    
    for(var i = 0, buttonsLength = editButtons.length; i < buttonsLength; i++) {
        editButtons[i].addEventListener('click', editItem);
        inputs[i].addEventListener('blur', updateItem);
        inputs[i].addEventListener('keypress', keypressUpdateItem)
    }
}

let getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let editItem = function() {
    // let button = this;
    let li = this.parentElement;
    let input = li.querySelector('input');

    li.classList.add('edit');
    input.focus();
    input.setSelectionRange(0,input.value.length);
}

let updateItem = function() {
    // let input = this;
    let li = this.parentElement;
    let span = li.querySelector('span');
    span.innerHTML = this.value;
    li.classList.remove('edit');
}

let keypressUpdateItem = function(event) {
    if(event.which === 13) {
        updateItem.call(this);
    }
}

// let closeEditPage = function() {
//     let editPage = document.getElementById('editPage');
//     editPage.classList.remove('pop');
// }

let randomColors = function () {
    let headerColor;
    let switchOrder = 1;
    let maxHexColor = 240;
    let middleHexColor = 150;
    let minHexColor = 50;
    let redColor, greenColor, blueColor;
    let listHeaders = document.querySelectorAll('.display-list');

    for(var i = 0, j = listHeaders.length; i < j; i++) {
        switch(switchOrder) {
        case 1:
            redColor = getRandomInt(minHexColor, maxHexColor);
            greenColor = getRandomInt(minHexColor, middleHexColor);
            blueColor = getRandomInt(minHexColor, middleHexColor);
            break;
        case 2:
            redColor = getRandomInt(minHexColor, middleHexColor);
            greenColor = getRandomInt(minHexColor, maxHexColor);
            blueColor = getRandomInt(minHexColor, middleHexColor);
            break;
        case 3:
            redColor = getRandomInt(minHexColor, middleHexColor);
            greenColor = getRandomInt(minHexColor, middleHexColor);
            blueColor = getRandomInt(minHexColor, maxHexColor);
            break;
        }
        if(switchOrder % 3 === 0) {
            switchOrder = 1;
        } else {
            switchOrder++;
        }
    
        headerColor = 'rgb('+redColor+','+greenColor+','+blueColor+')';
        listHeaders[i].style.color = headerColor;
    }
}


randomColors();
addEventListeners();