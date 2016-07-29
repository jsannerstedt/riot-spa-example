export { traverse };

function traverse(element, tag) {
  if (element.tagName.toLowerCase() === 'body') {
    return false;
  } else if (element.tagName.toLowerCase() === tag) {
    return element;
  } else if (element.parentElement) {
    return traverse(element.parentElement, tag);
  }
}
