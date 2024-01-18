function elementGenerator(type, content, parent) {
    console.log('elgenen');
    const element = document.createElement(type);
    element.textContent = content;
    if (parent) {
        parent.appendChild(element);
    }
    return element;
}
module.exports = {
    elementGenerator: elementGenerator,
};