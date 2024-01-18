// Code in the client-side JavaScript file for the breakout editor
var { elementGenerator } = require('../../../../helpers/helperDOM');

(() => {
    var pinCounter = 0;
    var currentValue = {};
    // var pinsArray = [];

    subscribe('sfcc:ready', (value) => {
        console.log('imageEditorBreakoutScript', 'sfcc:ready', "value", value);
        console.log('imageEditorBreakoutScript', value.value.src);
        currentValue = Object.assign({}, value.value);
        console.log('currentValue', currentValue);
        // Once the breakout editor is ready, the custom code is able to select or
        // Create a value. Any meaningful change to a value/selection needs to be
        // reflected back into the host container via a `sfcc:value` event.
        createBreakOutDomElements(currentValue)
        // const openButtonEl = document.querySelector('img');

    });

    function addPin(e) {
        const timestamp = Date.now();
        console.log('addPin');
        // pinCounter++;
        // const x = e.clientX;
        // const y = e.clientY;
        // const bounds = e.target.getBoundingClientRect();
        const posX = e.offsetX - e.target.offsetLeft;
        const posY = e.offsetY - e.target.offsetTop;

        const newPin = {
            posX: posX,
            posY: posY,
            pinClass: timestamp
        }

        pinCounter++
        if (!currentValue.pins) {
            currentValue.pins = [];
        }

        currentValue.pins.push(newPin)

        console.log('addPin', 'afterclick', 'currentValue', currentValue);
        emitCurrentValue();
        pinCreator(posX, posY, newPin.pinClass, currentValue.pins.length)

        // pinsArray.push(newPin)

        // var pinIcon = document.createElement('div');

        // pinIcon.className = 'pin pin-' + pinCounter;
        // pinIcon.innerHTML = '&#9917;';
        // pinIcon.style.position = 'absolute';
        // // pinIcon.style.width = '20px';
        // // pinIcon.style.height = '20px';
        // // pinIcon.style.borderRadius = '50%';
        // pinIcon.style.transform = 'translate(-50%, -50%)';
        // pinIcon.style.left = posX + 'px';
        // pinIcon.style.top = posY + 'px';
        // pinIcon.style.cursor = 'pointer';


        // const pinContainer = document.querySelector('.pin-container')
        // console.log("pinContainer", pinCounter);
        // pinContainer.appendChild(pinIcon);
        // console.log("pin", pinIcon);

        // var pinsList = document.querySelector('ul')
        // var liEl = document.createElement('li');
        // liEl.className = 'pin-' + pinCounter;
        // liEl.textContent = 'pin ' + pinCounter
        // pinsList.appendChild(liEl);

        // var deletePinBtn = document.createElement('button');
        // deletePinBtn.textContent = 'remove pin';
        // deletePinBtn.style.color = 'red';
        // deletePinBtn.style.marginLeft = '1rem';
        // deletePinBtn.addEventListener("click", removePin)
        // liEl.appendChild(deletePinBtn);

    }

    function removePin(e) {
        let liEl = e.target.parentNode;
        const classLiEl = liEl.className
        console.log(classLiEl);
        const elementsToRemove = document.getElementsByClassName(classLiEl);
        const elementsToRemoveArray = Array.from(elementsToRemove);
        elementsToRemoveArray.forEach(element => {
            element.remove();
        });
        const index = currentValue.pins.indexOf(pin => pin.pinClass === classLiEl);
        currentValue.pins.splice(index, 1);
        emitCurrentValue();
    }

    function handleSelect({ target }) {
        // The value changed and the breakout editor's host is informed about the
        // value update via a `sfcc:value` event.
        const selectedValue = target.innerText;
        emit({
            type: 'sfcc:value',
            payload: selectedValue ? { value: selectedValue } : null
        });
    }

    function emitCurrentValue() {
        console.log('submitHotpsotSelections', currentValue);
        emit({
            type: "sfcc:value",
            payload: currentValue,
        });
    }

    function createBreakOutDomElements(currentValue) {
        console.log('createBreakOutDomElements');
        // const pinContainer = document.createElement('div');
        const pinContainer =  elementGenerator('div','',document.body);
        pinContainer.className = 'pin-container';
        pinContainer.style.position = 'relative';
        // document.body.appendChild(pinContainer);

        // const imageEl = document.createElement('img');
        const imageEl = elementGenerator('img','',pinContainer)
        imageEl.src = currentValue.src;
        // pinContainer.appendChild(imageEl);
        // var pinsList = document.createElement('ul');
        elementGenerator('ul','',document.body)

        // document.body.appendChild(pinsList);
        imageEl.addEventListener("load", loadPins)
        imageEl.addEventListener('click', addPin);
    }

    function emitCurrentValue() {
        emit({
            type: "sfcc:value",
            payload: currentValue,
        });
    }

    function pinCreator(posX, posY, pinClass, index) {

        console.log('pinCreator');
        // var pinIcon = document.createElement('div');
        const pinContainer = document.querySelector('.pin-container')
        const pinIcon = elementGenerator('div','',pinContainer)

        pinIcon.className = 'pin pin-' + pinClass;
        pinIcon.innerHTML = '&#9917;';
        pinIcon.style.position = 'absolute';
        // pinIcon.style.width = '20px';
        // pinIcon.style.height = '20px';
        // pinIcon.style.borderRadius = '50%';
        pinIcon.style.transform = 'translate(-50%, -50%)';
        pinIcon.style.left = posX + 'px';
        pinIcon.style.top = posY + 'px';
        pinIcon.style.cursor = 'pointer';


       
        console.log("pinContainer", pinClass);
        // pinContainer.appendChild(pinIcon);
        console.log("pin", pinIcon);

        const pinsList = document.querySelector('ul')
        // var liEl = document.createElement('li');
        const liEl = elementGenerator('li',`pin ${index}`,pinsList);
        liEl.className = 'pin-' + pinClass;
        // liEl.textContent = 'pin ' + index
        // pinsList.appendChild(liEl);

        // var deletePinBtn = document.createElement('button');
        const deletePinBtn = elementGenerator('button','remove pin',liEl)
        // deletePinBtn.textContent = 'remove pin';
        deletePinBtn.style.color = 'red';
        deletePinBtn.style.marginLeft = '1rem';
        deletePinBtn.addEventListener("click", removePin);
        // liEl.appendChild(deletePinBtn);

    }

    function loadPins() {
        console.log('loadPins', 'currentValue', currentValue);
        if (currentValue.pins && currentValue.pins.length > 0) {
            currentValue.pins.forEach((pin, index) => {
                pinCreator(pin.posX, pin.posY, pin.pinClass, index + 1)

            })
        }
    }

})();

