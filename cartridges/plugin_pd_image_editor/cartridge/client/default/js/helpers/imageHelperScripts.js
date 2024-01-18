'use strict';
var { elementGenerator } = require('./helperDOM');

function passImageFromTemplateToPDIframe() {
    console.log('passImageFromTemplateToPDIframe');
    const choosenImage = document.querySelector('.img-pins');
    var componentSettings = parent.document.querySelector('.component-settings');
    var iframe = componentSettings.querySelector('iframe').contentDocument;

    var iframeImageDiv = iframe.querySelector('.image-add-pins');
    console.log('iframeImageDiv',iframeImageDiv);
    // let image = document.createElement('span');
    const image = elementGenerator('span','',iframeImageDiv)
    image.setAttribute("src",choosenImage.getAttribute('src'))
   
    // iframeImageDiv.append(image);
    console.log('iframeImageDiv',iframeImageDiv);


    console.log(choosenImage);

}

module.exports = {
    passImageFromTemplateToPDIframe: passImageFromTemplateToPDIframe,
};