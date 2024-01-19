'use strict';

const Template = require('dw/util/Template');
const HashMap = require('dw/util/HashMap');
const URLUtils = require('dw/web/URLUtils');

/**
 * Render logic for storefront.productBannerStrip component.
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @returns {string} The template to be displayed
 */

module.exports.render = function (context) {
    const content = context.content;
    const model = new HashMap();
    model.imgUrl = content.image ? content.image.file.absURL : null;
    model.pins = content.imageEditor ? content.imageEditor.pins : [];
    model.pinStyle = content.pinStyle ? content.pinStyle : null;
    let loading = content.lazyLoadImage ? "lazy" : "eager";
    model.loading = loading;
    model.imageAlt = content.imageAlt;

    return new Template('experience/components/commerce_assets/customHeroImage').render(model).text;
};