'use strict';

var HashMap = require('dw/util/HashMap');
var PageMgr = require('dw/experience/PageMgr');

module.exports.init = function (editor) {
    // Pass through property `options.config` from the `attribute_definition` to be used in a breakout editor
    var options = new HashMap();
    options.put('config', editor.configuration.options.config);

    // Create a configuration for a custom editor to be displayed in a modal breakout dialog (breakout editor)
    var breakoutEditorConfig = new HashMap();
 
    breakoutEditorConfig.put('options', options);

    // Add a dependency to the configured breakout editor
    var breakoutEditor = PageMgr.getCustomEditor('com.sfcc.imageEditorBreakout', breakoutEditorConfig);
    editor.dependencies.put('imageEditorBreakoutScript', breakoutEditor);
};