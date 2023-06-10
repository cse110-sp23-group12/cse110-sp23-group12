import { toggleSound, setSound } from './utils.js';

/**
 * Event handler for the window's onload event.
 */
if (localStorage.getItem('version') !== dbVersion) {
    localStorage.clear();
    localStorage.setItem('version', dbVersion);
    const res = await fetch('config/db.json');
    const json = await res.json();
    for (let i = 0; i < json.length; ++i) {
        const data = [];
        for (let j = 0; j < json[i].length; ++j) data.push({ s: json[i][j], used: 0 });
        localStorage.setItem(i, JSON.stringify(data));
    }
}

window.onload = () => {
    const soundToggle = document.getElementById('sound-toggle');
    setSound(soundToggle, localStorage.getItem('soundOn'));
    console.log('sound status = ', localStorage.getItem('soundOn'));
    const button = document.getElementById('landing-submit-button');
    const textInput = document.getElementById('text-input');
    /**
     * Event handler for the click event on the landing submit button.
     */
    button.addEventListener('click', () => {
        landingSubmit();
    });
    /**
     * Event handler for the keydown event on the text input field.
     * Triggers the landingSubmit function when the Enter key is pressed.
     * 
     * @param {KeyboardEvent} event - The keyboard event object.
     */
    textInput.addEventListener('keydown', (event) => {
        if (event.keyCode === 13 || event.key === 'Enter') {
            landingSubmit();
        }
    });

    soundToggle.addEventListener('click', () => {
        localStorage.setItem('soundOn', toggleSound(soundToggle));
    });

    form.f.init.register();

    if (localStorage.getItem('method') === null) {
        localStorage.setItem('method', 'gpt');
        document.getElementById('img_category').click();
        document.getElementById('img_category_options').children[0].click();
    } else {
        const method = localStorage.getItem('method') === 'gpt' ? 0 : 1;
        document.getElementById('img_category').click();
        document.getElementById('img_category_options').children[method].click();
    }
};

/**
 * Handles the submission on the landing page.
 * Redirects to the appropriate page and stores the user's message in localStorage.
 */
const landingSubmit = () => {
    const input = document.getElementById('text-input');
    if (input.value === '') return;
    // console.log('message=====', localStorage.getItem('userMessage'));
    localStorage.setItem('userMessage', input.value);
    // console.log(localStorage.getItem('userMessage'));

    /** Confetti on the left side */
    confetti({
        sspread: 55,
        ticks: 200,
        gravity: 1,
        decay: 0.94,
        angle: 60,
        origin: { x: 0 },
        startVelocity: 30,
        particleCount: 100,
        scalar: 3,
        shapes: ['image'],
        shapeOptions: {
            image: [{
                src: './img/logo.png',
                width: 32,
                height: 32
            }]
        }
    });

    /** Confetti on the right side */
    confetti({
        sspread: 55,
        ticks: 200,
        gravity: 1,
        decay: 0.94,
        angle: 120,
        origin: { x: 1 },
        startVelocity: 30,
        particleCount: 100,
        scalar: 3,
        shapes: ['image'],
        shapeOptions: {
            image: [{
                src: './img/logo.png',
                width: 32,
                height: 32
            }]
        }
    });
    setTimeout(() => {
        redirect();
    }, 1000);
};

const redirect = () => {
    window.location.href = 'display.html';
};

const util = {
    f: {
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
        cssLoaded: function (event) {
            const child = util.f.getTrg(event);
            child.setAttribute('media', 'all');
        },
        events: {
            cancel: function (event) {
                util.f.events.prevent(event);
                util.f.events.stop(event);
            },
            prevent: function (event) {
                event = event || window.event;
                event.preventDefault();
            },
            stop: function (event) {
                event = event || window.event;
                event.stopPropagation();
            }
        },
        getSize: function (elem, prop) {
            return parseInt(elem.getBoundingClientRect()[prop], 10);
        },
        getTrg: function (event) {
            event = event || window.event;
            if (event.srcElement) {
                return event.srcElement;
            } else {
                return event.target;
            }
        },
        isElem: function (elem) {
            return (util.f.isNode(elem) && parseInt(elem.nodeType) === 1);
        },
        isArray: function (v) {
            return (v.constructor === Array);
        },
        isNode: function (elem) {
            return (typeof Node === 'object' ? elem instanceof Node : elem && typeof elem === 'object' && typeof elem.nodeType === 'number' && typeof elem.nodeName === 'string' && elem.nodeType !== 3);
        },
        isObj: function (v) {
            return (typeof v === 'object');
        },
        replaceAt: function (str, index, char) {
            return str.substr(0, index) + char + str.substr(index + char.length);
        }
    }
};

const form = {
    f: {
        init: {
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
            unregister: function () {
                // just here as a formallity
                // call this to stop all ongoing timeouts are ready the page for some sort of json re-route
            }
        },
        select: {
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
                                        //   console.log("size: " + size)
                                    }
                                }
                                util.f.addStyle(nestedChild, ['Height', 'Opacity'], [size + 'px', 1]);
                            }
                        }
                    }
                }
            },
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
