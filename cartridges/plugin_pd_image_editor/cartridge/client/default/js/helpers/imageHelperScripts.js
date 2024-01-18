'use strict';
var { elementGenerator } = require('./helperDOM');

function passImageFromTemplateToPDIframe() {

    const choosenImage = document.querySelector('.img-pins');
    var componentSettings = parent.document.querySelector('.component-settings');
    var iframe = componentSettings.querySelector('iframe').contentDocument;

    var iframeImageDiv = iframe.querySelector('.image-add-pins');
    const image = elementGenerator('span', '', iframeImageDiv);
    image.setAttribute("src", choosenImage.getAttribute('src'));

}

module.exports = {
    passImageFromTemplateToPDIframe: passImageFromTemplateToPDIframe,
};