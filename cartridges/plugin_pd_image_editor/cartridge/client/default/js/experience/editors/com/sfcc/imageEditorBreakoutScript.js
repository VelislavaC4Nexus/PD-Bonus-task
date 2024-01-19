// Code in the client-side JavaScript file for the breakout editor
var { elementGenerator } = require('../../../../helpers/helperDOM');

(() => {
    var pinCounter = 0;
    var currentValue = {};

    subscribe('sfcc:ready', (value) => {
        currentValue = Object.assign({}, value.value);
        // Once the breakout editor is ready, the custom code is able to select or
        // Create a value. Any meaningful change to a value/selection needs to be
        // reflected back into the host container via a `sfcc:value` event.
        createBreakOutDomElements(currentValue);
    });

    function addPin(e) {
        const timestamp = Date.now();
        const posX = e.offsetX - e.target.offsetLeft;
        const posY = e.offsetY - e.target.offsetTop;

        const newPin = {
            posX: posX,
            posY: posY,
            pinClass: timestamp
        };

        pinCounter++
        if (!currentValue.pins) {
            currentValue.pins = [];
        }

        currentValue.pins.push(newPin);

        emitCurrentValue();
        pinCreator(posX, posY, newPin.pinClass, currentValue.pins.length);
    }

    function removePin(e) {
        let liEl = e.target.parentNode;
        const classLiEl = liEl.className;
        const elementsToRemove = document.getElementsByClassName(classLiEl);
        const elementsToRemoveArray = Array.from(elementsToRemove);
        elementsToRemoveArray.forEach(element => {
            element.remove();
        });
        const index = currentValue.pins.indexOf(pin => pin.pinClass === classLiEl);
        currentValue.pins.splice(index, 1);
        emitCurrentValue();
    }

    function createBreakOutDomElements(currentValue) {
        const pinContainer = elementGenerator('div', '', document.body);
        pinContainer.className = 'pin-container';
        pinContainer.style.position = 'relative';
        const imageEl = elementGenerator('img', '', pinContainer);
        imageEl.src = currentValue.src;
        elementGenerator('ul', '', document.body);
        imageEl.addEventListener("load", loadPins);
        imageEl.addEventListener('click', addPin);
    }

    function emitCurrentValue() {
        emit({
            type: "sfcc:value",
            payload: currentValue,
        });
    }

    function pinCreator(posX, posY, pinClass, index) {

        const pinContainer = document.querySelector('.pin-container');

        const pinIcon = elementGenerator('div', '', pinContainer);
        pinIcon.className = 'pin pin-' + pinClass;
        pinIcon.innerHTML = '&#9917;';
        pinIcon.style.position = 'absolute';
        pinIcon.style.transform = 'translate(-50%, -50%)';
        pinIcon.style.left = posX + 'px';
        pinIcon.style.top = posY + 'px';
        pinIcon.style.cursor = 'pointer';

        const pinsList = document.querySelector('ul');

        const liEl = elementGenerator('li', `pin ${index}`, pinsList);
        liEl.className = 'pin-' + pinClass;

        const deletePinBtn = elementGenerator('button', 'remove pin', liEl);
        deletePinBtn.style.color = 'red';
        deletePinBtn.style.marginLeft = '1rem';
        deletePinBtn.addEventListener("click", removePin);
    }

    function loadPins() {
        if (currentValue.pins && currentValue.pins.length > 0) {
            currentValue.pins.forEach((pin, index) => {
                pinCreator(pin.posX, pin.posY, pin.pinClass, index + 1);

            });
        }
    }

})();

