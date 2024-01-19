// Code in the client-side JavaScript file for the trigger editor
var { elementGenerator } = require('../../../../helpers/helperDOM');
(() => {

    let currentValue = {};

    subscribe('sfcc:ready', async ({ value, ...rest }) => {
        const imageDiv = elementGenerator('div', '', document.body);
        imageDiv.className = 'image-add-pins';

        const openButton = elementGenerator('button', 'Add / Remove Pins', document.body);
        openButton.addEventListener('click', handleBreakoutOpen);

        const warningDiv = elementGenerator('div', 'Please save the changes before and after adding pins!', document.body);
        warningDiv.style.backgroundColor = '#FFCCCC';
        warningDiv.style.border = '1px solid gray';
        warningDiv.style.borderRadius = '0.5rem';
        warningDiv.style.padding = '0.2rem 0.4rem';
        warningDiv.style.marginTop = '1rem';

        currentValue = value ? value : {};
        showCreatedPins(currentValue);

    });

    subscribe('sfcc:value', async ({ breakout, ...rest }) => {
        const applyButtonEl = document.querySelector('.slds-button_brand');
        const { id } = breakout;
        applyButtonEl.addEventListener('click', () => handleBreakoutApply(id));
    });

    function updatePageDesignerValue(value) {
        emit({
            type: 'sfcc:value',
            payload: value
        });
    }

    function handleBreakoutOpen(e) {

        var iframeImageDiv = document.querySelector('.image-add-pins span');

        if (!currentValue.src) {

            currentValue = {
                src: iframeImageDiv.getAttribute('src'),
            }
        }

        updatePageDesignerValue(currentValue);

        emit({
            type: 'sfcc:breakout',
            payload: {
                id: 'imageEditorBreakoutScript',
                title: 'Add pins',
                value: currentValue
            }
        }, handleBreakoutClose);
    }

    function handleBreakoutClose({ type, value }) {
        // Now the "value" can be passed back to Page Designer
        if (type === 'sfcc:breakoutApply') {
            handleBreakoutApply(value);
        } else {
            handleBreakoutCancel();
        }
    }

    function handleBreakoutCancel() {
        // left empty in case you want to do more customization on this event
    }

    function handleBreakoutApply(value) {
        currentValue = Object.assign({}, value);
        updatePageDesignerValue(currentValue);
        showCreatedPins(currentValue);
    }

    function showCreatedPins(currentValue) {
        let pinsContainer = document.querySelector('.pins-container');
        if (pinsContainer) {
            pinsContainer.parentNode.removeChild(pinsContainer);
        }
        pinsContainer = elementGenerator('div', '', document.body);
        pinsContainer.className = 'pins-container';

        const pinsInfo = elementGenerator('div', '', pinsContainer);
        pinsInfo.style.marginTop = '1rem';

        if (currentValue.pins && currentValue.pins.length) {
            pinsInfo.innerHTML = `<span>${currentValue.pins.length} pins added</span>`;
        } else {
            pinsInfo.innerHTML = '<span style="color: red;">No pins added yet!</span>';
        }
    }

})();