'use strict';

var processInclude = require('base/util');

$(document).ready(function () {
    processInclude(require('./helpers/imageHelperScripts'));
    processInclude(require('./helpers/helperDOM'));
});
