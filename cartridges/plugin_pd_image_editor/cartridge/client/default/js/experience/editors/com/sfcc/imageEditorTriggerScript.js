// Code in the client-side JavaScript file for the trigger editor
var { elementGenerator } = require('../../../../helpers/helperDOM');
(() => {

    let currentValue = {};
    
    subscribe('sfcc:ready', async ({ value, ...rest }) => {
        console.log('triger', 'subscribe', value);
        
        // let imageDiv = document.createElement('div');
        const imageDiv = elementGenerator('div','',document.body);
        // let openButton = document.createElement('button');
        const openButton = elementGenerator('button','Add / Remove Pins',document.body);
        // document.body.appendChild(openButton);
        // openButton.innerHTML = 'Add / Remove Pins';
        console.log('openButton', openButton);
        openButton.addEventListener('click', handleBreakoutOpen);

        imageDiv.className = 'image-add-pins';

        const warningDiv = elementGenerator('div','Please save the changes before and after adding pins!',document.body);
        warningDiv.style.backgroundColor = '#FFCCCC';
        warningDiv.style.border = '1px solid gray';
        warningDiv.style.borderRadius = '0.5rem';
        warningDiv.style.padding = '0.2rem 0.4rem';
        warningDiv.style.marginTop='1rem';
        // document.body.appendChild(imageDiv);
        currentValue = value ? value : {};
        showCreatedPins(currentValue)

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

    function handleBreakoutOpen(value) {
        console.log('handleBreakoutOpen', currentValue);
        // var componentSettings = document.querySelector('.component-settings');

        // var image = componentSettings.querySelector('img');
        // var image = document.querySelector('.img-pins');
        // console.log("image",image);
        var iframeImageDiv = document.querySelector('.image-add-pins span');
        console.log('handleBreakoutOpen', iframeImageDiv);
        var src = iframeImageDiv.getAttribute('src')
        console.log('handleBreakoutOpen', src);
        // var currentImage = imgWrapper.children[0];
        // console.log('currentImage', currentImage);
        // console.log('imageType', imageType);
        // console.log('imageSrc', imageSrc);
        // var imageType = currentImage.getAttribute('type');
        // var imageSrc = currentImage.getAttribute('src');
        if(!currentValue.src){

            currentValue = {
                src: iframeImageDiv.getAttribute('src'),
                // type: currentImage.getAttribute('type'),
                // displayText: currentImage.getAttribute('name'),
    
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
        // // Emit value update to Page Designer host application
        // emit({
        //     type: 'sfcc:value',
        //     payload: value
        // });
    }

    function showCreatedPins(currentValue) {
        console.log('imageHotspotEditorTriggerScript', 'showCreatedHotspots', currentValue);
        // if (currentValue.pins) {
            console.log('has pins');
            let pinsContainer = document.querySelector('.pins-container');
            if (pinsContainer) {
                pinsContainer.parentNode.removeChild(pinsContainer);
            }
            // hotspotsContainer = document.createElement('div');
            pinsContainer = elementGenerator('div','',document.body);
            pinsContainer.className = 'pins-container';
            // document.body.appendChild(hotspotsContainer);
        

            // const hotspotInfo = document.createElement('span');
            const hotspotInfo = elementGenerator('div','',pinsContainer);
            hotspotInfo.style.marginTop = '1rem';
            if(currentValue.pins && currentValue.pins.length){
                hotspotInfo.innerHTML =`<span>${currentValue.pins.length} pins added</span>`
            }else{
                hotspotInfo.innerHTML ='<span style="color: red;">No pins added yet!</span>'
            }
    }
})();