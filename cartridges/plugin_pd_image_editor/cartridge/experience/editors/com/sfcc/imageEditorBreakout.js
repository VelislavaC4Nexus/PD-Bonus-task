'use strict';
var URLUtils = require('dw/web/URLUtils');

module.exports.init = function (editor) {
    var optionsConfig = editor.configuration.options.config;
    var optionsInit = [];

    // Init editor configuration
    editor.configuration.options.put('init', optionsInit);

};