/*
    AlgorithmicComposition by Ni'Gere Epps

    Adjustable variables:
      mode: Enter desired composition mode:
        1: (original) rainbow gradient spiral effect
        2: random color spiral effect
        3: black and white spiral effect
        4: rainbow gradient pyramid / tunnel effect
        5: random color pyramid / tunnel effect
        6: black and white pyramid / tunnel effect
        
      mousemode: Control center of composition with mouse
        0: disabled
        1: enabled
        
      speed: Enter desired rotation speed
      space: Enter desired space between lines
*/

mode = 3
mousemode = 0
speed = 0.01
space = 2
hueInc = 0.24
bwInc = 0.24

alertify.defaults.transition = "zoom";
alertify.defaults.theme.ok = "ui positive button";
alertify.defaults.theme.cancel = "ui black button";

function modef(callback1, callback2, callback3) {
    setTimeout(function() {
        alertify.prompt(`Select the mode that you want. The following are available: <br/>
        1: (original) rainbow gradient spiral effect <br/>
        2: random color spiral effect <br/>
        3: black and white spiral effect <br/>
        4: rainbow gradient pyramid / tunnel effect <br/>
        5: random color pyramid / tunnel effect <br/>
        6: black and white pyramid / tunnel effect`, 1, function(evt, value) { //submit

                mode = Number(value)

                if (Number.isNaN(mode))
                    mode = 1
                callback1(callback2, callback3);

            },
            function() { //cancel
                mode = 1
                callback1(callback2, callback3);
            }
        ).set('closable', false).set({ 'closableByDimmer': false }).set('labels', { ok: 'Submit', cancel: 'Default' });

    }, 10);
}


function mousemodef(callback1, callback2) {
    setTimeout(function() {
        alertify.prompt(`Choose if you want to control the center of the composition with your mouse: <br/>
        0: disabled <br/>
        1: enabled`, 0, function(evt, value) {

                mousemode = Number(value)
                if (Number.isNaN(mousemode))
                    mousemode = 0
                callback1(callback2);
            },
            function() {
                mousemode = 0
                callback1(callback2);
            }
        ).set('closable', false).set({ 'closableByDimmer': false }).set('labels', { ok: 'Submit', cancel: 'Default' });

    }, 10);
}

function speedf(callback1) {
    setTimeout(function() {
        alertify.prompt(`Enter desired rotation speed:`, 1, function(evt, value) {

                speed = Number(value) / 100
                if (Number.isNaN(speed))
                    speed = 0.01
                callback1()
            },
            function() {
                speed = 0.01
                callback1()
            }
        ).set('closable', false).set({ 'closableByDimmer': false }).set('labels', { ok: 'Submit', cancel: 'Default' });

    }, 10);
}

function spacef() {
    setTimeout(function() {
        alertify.prompt(`Enter desired space between lines (affects program speed):`, 2, function(evt, value) {

                space = Number(value)
                if (Number.isNaN(space))
                    space = 2
                runD()
            },
            function() {
                space = 2
                runD()
            }
        ).set('closable', false).set({ 'closableByDimmer': false }).set('labels', { ok: 'Submit', cancel: 'Default' });

    }, 10);
}

function runD() {
    hueInc = 360 / bound * space
    bwInc = 255 / bound * space
    loop()
}

function setup() {
    noLoop()
    createCanvas(windowWidth, windowHeight);
    background('black');
    w = width / 2, h = height / 2;
    bound = (1.5 * (w + h));
    x = 0, rot = 0, chue = 0;
    r = 0, g = 0, b = 0;
    start = 0;
    modef(mousemodef, speedf, spacef)
}

function draw() {

    if (x < bound) { //stops once too large to conserve resources

        if (mousemode === 1)
            translate(mouseX, mouseY)

        else
            translate(w, h)

        if (mode === 2 || mode === 5) { //random color
            r = random(255);
            g = random(255);
            b = random(255);
            stroke(r, g, b)
        } else if (mode === 3 || mode === 6) { //b&w
            r += bwInc;
            g += bwInc;
            b += bwInc;
            stroke(r, g, b)
        } else { //rainbow gradient
            colorMode(HSL, 360);
            stroke(chue, 200, 200);
            chue += hueInc
        }

        if (mode === 1 || mode === 2 || mode === 3) //spiral
            rotate(rot += speed)

        fill(0, 0, 0, 0)
        rect(-x / 2, -x / 2, x, x)
        x += space
    } else {
        noLoop()
        options()
        document.querySelector('#option').style.visibility = 'visible'
    }
}