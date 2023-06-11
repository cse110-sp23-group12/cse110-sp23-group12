/** 
 * Utility module
 * @module util
 */
export const util = {
    /** 
     * Collection of utility functions.
     * @namespace util.f
     */
    f: {
        /**
         * Adds style to an element.
         * @param {string|Object} elem - The element or its id.
         * @param {string|Array} prop - The style property or an array of properties to be added.
         * @param {string|Array} val - The value of the style or an array of values to be added.
         * @param {string|Array} vendors - Vendor prefixes for CSS properties.
         */
        addStyle: function (elem, prop, val, vendors) {
            let i, ii, property, value;
            if (!util.f.isElem(elem)) {
                elem = document.getElementById(elem);
            }
            if (!util.f.isArray(prop)) {
                prop = [prop];
                val = [val];
            }
            for (i = 0; i < prop.length; i += 1) {
                let thisProp = String(prop[i]);
                const thisVal = String(val[i]);
                if (typeof vendors !== 'undefined') {
                    if (!util.f.isArray(vendors)) {
                        vendors.toLowerCase() === 'all' ? vendors = ['webkit', 'moz', 'ms', 'o'] : vendors = [vendors];
                    }
                    for (ii = 0; ii < vendors.length; ii += 1) {
                        elem.style[vendors[i] + thisProp] = thisVal;
                    }
                }
                thisProp = thisProp.charAt(0).toLowerCase() + thisProp.slice(1);
                elem.style[thisProp] = thisVal;
            }
        },

        /**
         * Event handler for when a CSS is loaded.
         * @param {Object} event - The event object.
         */
        cssLoaded: function (event) {
            const child = util.f.getTrg(event);
            child.setAttribute('media', 'all');
        },

        /**
         * Event related functions.
         * @namespace events
         */
        events: {
            /**
             * Prevents the event's default behavior and stops it from propagating further.
             * @param {Object} event - The event object.
             */
            cancel: function (event) {
                util.f.events.prevent(event);
                util.f.events.stop(event);
            },

            /**
             * Prevents the event's default behavior.
             * @param {Object} event - The event object.
             */
            prevent: function (event) {
                event = event || window.event;
                event.preventDefault();
            },

            /**
             * Stops the event from propagating further.
             * @param {Object} event - The event object.
             */
            stop: function (event) {
                event = event || window.event;
                event.stopPropagation();
            }
        },

        /**
         * Returns the size of a property from the given element.
         * @param {Object} elem - The DOM element.
         * @param {string} prop - The property name.
         * @returns {number} The size of the property.
         */
        getSize: function (elem, prop) {
            return parseInt(elem.getBoundingClientRect()[prop], 10);
        },

        /**
         * Returns the target element of the given event.
         * @param {Object} event - The event object.
         * @returns {Object} The target element of the event.
         */
        getTrg: function (event) {
            event = event || window.event;
            if (event.srcElement) {
                return event.srcElement;
            } else {
                return event.target;
            }
        },

        /**
         * Checks if a value is a DOM element.
         * @param {*} elem - The value to check.
         * @returns {boolean} True if the value is a DOM element, false otherwise.
         */
        isElem: function (elem) {
            return (util.f.isNode(elem) && parseInt(elem.nodeType) === 1);
        },

        /**
         * Checks if a value is an array.
         * @param {*} v - The value to check.
         * @returns {boolean} True if the value is an array, false otherwise.
         */
        isArray: function (v) {
            return (v.constructor === Array);
        },

        /**
         * Checks if a value is a DOM node.
         * @param {*} elem - The value to check.
         * @returns {boolean} True if the value is a DOM node, false otherwise.
         */
        isNode: function (elem) {
            return (typeof Node === 'object' ? elem instanceof Node : elem && typeof elem === 'object' && typeof elem.nodeType === 'number' && typeof elem.nodeName === 'string' && elem.nodeType !== 3);
        },

        /**
         * Checks if a value is an object.
         * @param {*} v - The value to check.
         * @returns {boolean} True if the value is an object, false otherwise.
         */
        isObj: function (v) {
            return (typeof v === 'object');
        },

        /**
         * Replaces a character at a specific index in a string.
         * @param {string} str - The original string.
         * @param {number} index - The index of the character to replace.
         * @param {string} replacement - The replacement character.
         * @returns {string} The new string.
         */
        replaceAt: function (str, index, char) {
            return str.substr(0, index) + char + str.substr(index + char.length);
        }
    }
};

/** 
 * Form module
 * @module form
 */
export const form = {
    /** 
     * Collection of form-related functions.
     * @namespace form.f
     */
    f: {
        /**
         * Initializes the form.
         * @namespace init
         */
        init: {
            /**
             * Registers the form elements.
             */
            register: function () {
                let child; let children = document.getElementsByClassName('field'); let i;
                for (i = 0; i < children.length; i += 1) {
                    child = children[i];
                    util.f.addStyle(child, 'Opacity', 1);
                }
                children = document.getElementsByClassName('psuedo-select');
                for (i = 0; i < children.length; i += 1) {
                    child = children[i];
                    child.addEventListener('click', form.f.select.toggle);
                }
            },

            /**
             * Unregisters the form elements.
             */
            unregister: function () {
                // just here as a formallity
                // call this to stop all ongoing timeouts are ready the page for some sort of json re-route
            }
        },
        /**
         * Collection of selection-related functions.
         * @namespace select
         */
        select: {
            /**
             * Removes focus from a given field.
             * Manipulates CSS classes and styles to indicate that a field is no longer focused.
             * @param {HTMLElement} field - The field element to be blurred.
             */
            blur: function (field) {
                field.classList.remove('focused');
                let child; const children = field.childNodes; let i; let ii; let nestedChild; let nestedChildren;
                for (i = 0; i < children.length; i += 1) {
                    child = children[i];
                    if (util.f.isElem(child)) {
                        if (child.classList.contains('deselect')) {
                            child.parentNode.removeChild(child);
                        } else if (child.tagName === 'SPAN') {
                            if (!field.dataset.value) {
                                util.f.addStyle(child, ['FontSize', 'Top'], ['16px', '32px']);
                            }
                        } else if (child.classList.contains('psuedo-select')) {
                            nestedChildren = child.childNodes;
                            for (ii = 0; ii < nestedChildren.length; ii += 1) {
                                nestedChild = nestedChildren[ii];
                                if (util.f.isElem(nestedChild)) {
                                    if (nestedChild.tagName === 'SPAN') {
                                        if (!field.dataset.value) {
                                            util.f.addStyle(nestedChild, ['Opacity', 'Transform'], [0, 'translateY(24px)']);
                                        }
                                    } else if (nestedChild.tagName === 'UL') {
                                        util.f.addStyle(nestedChild, ['Height', 'Opacity'], [0, 0]);
                                    }
                                }
                            }
                        }
                    }
                }
            },

            /**
             * Sets focus to a given field.
             * Manipulates CSS classes and styles to indicate that a field is currently focused.
             * @param {HTMLElement} field - The field element to be focused.
             */
            focus: function (field) {
                field.classList.add('focused');
                let bool = false; let child; const children = field.childNodes; let i; let ii; let iii; let nestedChild; let nestedChildren; let nestedNestedChild; let nestedNestedChildren; let size = 0;
                for (i = 0; i < children.length; i += 1) {
                    child = children[i];
                    if (util.f.isElem(child) && child.classList.contains('deselect')) bool = true;
                }
                if (!bool) {
                    child = document.createElement('div');
                    child.className = 'deselect';
                    child.addEventListener('click', form.f.select.toggle);
                    field.insertBefore(child, children[0]);
                }
                for (i = 0; i < children.length; i += 1) {
                    child = children[i];
                    if (util.f.isElem(child) && child.classList.contains('psuedo-select')) {
                        nestedChildren = child.childNodes;
                        for (ii = 0; ii < nestedChildren.length; ii += 1) {
                            nestedChild = nestedChildren[ii];
                            if (util.f.isElem(nestedChild) && nestedChild.tagName === 'UL') {
                                size = 0;
                                nestedNestedChildren = nestedChild.childNodes;
                                for (iii = 0; iii < nestedNestedChildren.length; iii += 1) {
                                    nestedNestedChild = nestedNestedChildren[iii];
                                    if (util.f.isElem(nestedNestedChild) && nestedNestedChild.tagName === 'LI') {
                                        size += util.f.getSize(nestedNestedChild, 'height');
                                    }
                                }
                                util.f.addStyle(nestedChild, ['Height', 'Opacity'], [size + 'px', 1]);
                            }
                        }
                    }
                }
            },

            /**
             * Processes the selection made in the pseudo-select field.
             * Stores the selection to localStorage and applies related style changes.
             * @param {HTMLElement} child - The selected option element.
             * @param {HTMLElement} parent - The parent select field of the selected option.
             */
            selection: function (child, parent) {
                const method = child.getAttribute('data-value');
                if (localStorage.getItem('method') !== method) {
                    localStorage.setItem('method', method);
                }
                const children = parent.childNodes; let i; let ii; let nestedChild; let nestedChildren; let time = 0; let value;
                if (util.f.isElem(child) && util.f.isElem(parent)) {
                    parent.dataset.value = child.dataset.value;
                    value = child.innerHTML;
                }
                for (i = 0; i < children.length; i += 1) {
                    child = children[i];
                    if (util.f.isElem(child)) {
                        if (child.classList.contains('psuedo-select')) {
                            nestedChildren = child.childNodes;
                            for (ii = 0; ii < nestedChildren.length; ii += 1) {
                                nestedChild = nestedChildren[ii];
                                if (util.f.isElem(nestedChild) && nestedChild.classList.contains('selected')) {
                                    if (nestedChild.innerHTML) {
                                        time = 1E2;
                                        util.f.addStyle(nestedChild, ['Opacity', 'Transform'], [0, 'translateY(24px)'], 'all');
                                    }
                                    setTimeout(function (c, v) {
                                        c.innerHTML = v;
                                        util.f.addStyle(c, ['Opacity', 'Transform', 'TransitionDuration'], [1, 'translateY(0px)', '.1s'], 'all');
                                    }, time, nestedChild, value);
                                }
                            }
                        } else if (child.tagName === 'SPAN') {
                            util.f.addStyle(child, ['FontSize', 'Top'], ['12px', '8px']);
                        }
                    }
                }
            },

            /**
             * Toggles the focus state of the field.
             * Depending on the event target, the function either focuses or blurs the field,
             * or changes the selection within the pseudo-select.
             * @param {Event} event - The triggering event (click).
             */
            toggle: function (event) {
                util.f.events.stop(event);
                const child = util.f.getTrg(event); let children; let i; let parent;
                switch (true) {
                case (child.classList.contains('psuedo-select')):
                case (child.classList.contains('deselect')):
                    parent = child.parentNode;
                    break;
                case (child.classList.contains('options')):
                    parent = child.parentNode.parentNode;
                    break;
                case (child.classList.contains('option')):
                    parent = child.parentNode.parentNode.parentNode;
                    form.f.select.selection(child, parent);
                    break;
                }
                parent.classList.contains('focused') ? form.f.select.blur(parent) : form.f.select.focus(parent);
            }
        }
    }
};
