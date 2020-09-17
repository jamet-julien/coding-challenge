const { ACTION } = require("../utils/constant");

const FactoryTimerControler = (statusBar) => {
    let timer, startTime, secondes;

    const format = new Intl.NumberFormat("fr-FR", { minimumIntegerDigits: 2 })
        .format;

    const secondeToTime = (secondes) => {
        let minutes = Math.floor(secondes / 60);
        let seconde = secondes % 60;
        return format(minutes) + ":" + format(seconde);
    };

    function tick() {
        secondes = Math.round((new Date() - startTime) / 1000);
        statusBar.text = "🔥  " + secondeToTime(secondes);
    }

    return {
        start: () => {
            startTime = new Date();
            secondes = 0;
            timer = setInterval(() => {
                tick();
            }, 1000);

            statusBar.command = ACTION.pause;
            statusBar.show();
        },
        play: () => {
            startTime = new Date() - secondes * 1000;
            statusBar.command = ACTION.pause;
            timer = setInterval(() => {
                tick();
            }, 1000);
        },
        stop: () => {
            clearInterval(timer);
            timer = null;

            statusBar.text = "🔥 🔥 🔥 🔥 🔥 ";
            statusBar.command = ACTION.play;
            statusBar.hide();

            return secondeToTime(secondes);
        },
        pause: () => {
            clearInterval(timer);
            statusBar.text = "⏸  " + secondeToTime(secondes);
            statusBar.command = ACTION.play;
            timer = null;
        },
    };
};

module.exports = FactoryTimerControler;
