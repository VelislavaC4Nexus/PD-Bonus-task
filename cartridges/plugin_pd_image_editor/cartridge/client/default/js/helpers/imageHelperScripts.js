'use strict';
var { elementGenerator } = require('./helperDOM');

function passImageFromTemplateToPDIframe() {

    const choosenImage = document.querySelector('.img-pins');
    const componentSettings = parent.document.querySelector('.component-settings');
    const iframe = componentSettings.querySelector('iframe').contentDocument;

    const iframeImageDiv = iframe.querySelector('.image-add-pins');
    const image = elementGenerator('span', '', iframeImageDiv);
    image.setAttribute("src", choosenImage.getAttribute('src'));

}

module.exports = {
    passImageFromTemplateToPDIframe: passImageFromTemplateToPDIframe,
};