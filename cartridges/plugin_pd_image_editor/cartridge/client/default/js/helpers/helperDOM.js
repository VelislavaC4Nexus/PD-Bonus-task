function elementGenerator(type, content, parent) {

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