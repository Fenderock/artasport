window.jQuery = window.$ = function (selector) {
  const nodes = typeof selector === 'function'
    ? (document.readyState !== 'loading' ? selector() : document.addEventListener('DOMContentLoaded', selector), [])
    : selector === window
      ? [window]
      : selector === document
        ? [document]
        : typeof selector === 'string'
          ? Array.from(document.querySelectorAll(selector))
          : selector instanceof Node
            ? [selector]
            : Array.from(selector || []);

  const api = {
    nodes,
    each(fn) { nodes.forEach((node, i) => fn.call(node, i, node)); return api; },
    on(event, childOrFn, fn) {
      const delegated = typeof childOrFn === 'string';
      nodes.forEach((node) => node.addEventListener(event, (e) => {
        if (!delegated) return childOrFn.call(e.target, e);
        const target = e.target.closest(childOrFn);
        if (target && node.contains(target)) fn.call(target, e);
      }));
      return api;
    },
    append(html) { nodes.forEach((node) => node.insertAdjacentHTML('beforeend', html)); return api; },
    html(value) { if (value === undefined) return nodes[0]?.innerHTML; nodes.forEach((node) => { node.innerHTML = value; }); return api; },
    text(value) { if (value === undefined) return nodes[0]?.textContent; nodes.forEach((node) => { node.textContent = value; }); return api; },
    val(value) { if (value === undefined) return nodes[0]?.value; nodes.forEach((node) => { node.value = value; }); return api; },
    data(name) { return nodes[0]?.dataset?.[name]; },
    addClass(name) { nodes.forEach((node) => node.classList.add(...name.split(' '))); return api; },
    removeClass(name) { nodes.forEach((node) => node.classList.remove(...name.split(' '))); return api; },
    toggleClass(name, force) { nodes.forEach((node) => node.classList.toggle(name, force)); return api; },
    attr(name, value) { if (value === undefined) return nodes[0]?.getAttribute(name); nodes.forEach((node) => node.setAttribute(name, value)); return api; },
    prop(name, value) { if (value === undefined) return nodes[0]?.[name]; nodes.forEach((node) => { node[name] = value; }); return api; },
    is(selectorText) { return selectorText === ':checked' ? !!nodes[0]?.checked : nodes[0]?.matches(selectorText); },
    find(selectorText) { return $(nodes.flatMap((node) => Array.from(node.querySelectorAll(selectorText)))); },
    fadeIn() { nodes.forEach((node) => { node.style.display = 'block'; }); return api; },
    fadeOut() { nodes.forEach((node) => { node.style.display = 'none'; }); return api; },
    stop() { return api; },
    delay() { return api; }
  };
  return api;
};
