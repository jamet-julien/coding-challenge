const { ACTION } = require("../utils/constant");

const FactoryTimerControler = () => {
    let timer,
        startTime,
        seconds,
        statusBar = null;

    const format = new Intl.NumberFormat("fr-FR", { minimumIntegerDigits: 2 })
        .format;

    const secondeToTime = (seconds) => {
        if (isFinite(seconds) === false) return "--:--";
        let minutes = Math.floor(seconds / 60);
        let seconde = seconds % 60;
        return format(minutes) + ":" + format(seconde);
    };

    function tick() {
        seconds = Math.round((new Date() - startTime) / 1000);
        statusBar.text = "🔥  " + secondeToTime(seconds);
    }

    return {
        start: (stBar) => {
            statusBar = stBar;
            startTime = new Date();
            seconds = 0;
            timer = setInterval(() => {
                tick();
            }, 1000);

            statusBar.command = ACTION.pause;
            statusBar.show();
            return true;
        },
        formatTimeList: (arr) =>
            arr.map((c) => ({ ...c, time: secondeToTime(c.seconds) })),
        play: () => {
            startTime = new Date() - seconds * 1000;
            statusBar.command = ACTION.pause;
            timer = setInterval(() => {
                tick();
            }, 1000);
            return true;
        },
        stop: () => {
            clearInterval(timer);
            timer = null;

            statusBar.text = "🔥 🔥 🔥 🔥 🔥 ";
            statusBar.command = ACTION.play;
            statusBar.hide();

            return { seconds, time: secondeToTime(seconds) };
        },
        pause: () => {
            clearInterval(timer);
            statusBar.text = "⏸  " + secondeToTime(seconds);
            statusBar.command = ACTION.play;
            timer = null;
            return true;
        },
    };
};

module.exports = FactoryTimerControler;
