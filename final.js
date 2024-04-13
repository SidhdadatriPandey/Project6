
let min = 0;
let sec = 0;
let count = 0;
let timer = false;

function start() {
    min = 0;
    sec = 0;
    count = 0;
    timer = true;
    stopWatch();
}

function stop() {
    timer = false;
}

function stopWatch() {
    if (timer == true) {
        count++;
        if (count == 100) {
            sec++;
            count = 0;
        }
        if (sec == 60) {
            min++;
            sec = 0;
        }

        if (min < 10) {
            document.querySelector('#min').innerHTML = `0${min}`;
        } else {
            document.querySelector('#min').innerHTML = min;
        }

        if (sec < 10) {
            document.querySelector('#sec').innerHTML = `0${sec}`;
        } else {
            document.querySelector('#sec').innerHTML = sec;
        }

        if (count < 10) {
            document.querySelector('#count').innerHTML = `0${count}`;
        } else {
            document.querySelector('#count').innerHTML = count;
        }

        setTimeout(() => {
            stopWatch();
        }
            , 10);
    }
}

// game-container part-----------------

let started = false;
let level = 0;
let buttonColors = ["red", "blue", "green", "yellow"];
let userSeq = [];
let gameSeq = [];
let h3 = document.querySelector("h3");
let max_level = 0;
let h4 = document.querySelector('h4');

document.addEventListener("keypress", function () {
    if (started == false) {
        start();
        started = true;
        levelUp();
    }
})

function blink(obj) {
    obj.classList.add("change-color");
    setTimeout(() => {
        obj.classList.remove("change-color");
    }, 150);
}

function levelUp() {
    level++;
    userSeq = [];
    h3.innerHTML = `Level ${level}`;
    let idx = Math.floor(Math.random() * 4);
    console.log(idx);
    let color = buttonColors[idx];
    gameSeq.push(color);
    console.log(gameSeq);
    let obj = document.querySelector(`.${color}`);
    blink(obj);
}

function match(btn) {
    let color = btn.getAttribute("id");
    userSeq.push(color);
    let currl = userSeq.length - 1;
    console.log(userSeq);
    if (gameSeq[currl] === userSeq[currl]) {
        if (gameSeq.length === userSeq.length) {
            setTimeout(() => {
                levelUp();
            }, 250);
        }
    } else {
        if (level > max_level) {
            max_level = level;
        }
        h4.innerHTML = `Max score was ${max_level}`;
        h3.innerHTML = `Score was ${level}.<br>Press any key to start the game.`;
        reset();
    }
}

let btns = document.querySelectorAll('.button');
for (btn of btns) {
    btn.addEventListener("click", function () {
        match(this);
        blink(this);
    })
}

function reset() {
    stop();
    started = false;
    level = 0;
    userSeq = [];
    gameSeq = [];
}
