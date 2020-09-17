const FactoryProjectCtrl = require("./controller/ProjectController");
const FactoryUiControler = require("./controller/UIController");
const FactoryTimerControler = require("./controller/TimerController");
const FactoryStorageCtrl = require("./controller/StorageController");

const { ACTION } = require("./utils/constant");
const { compose, computeReturn } = require("./utils/helper");

function activate(context) {
    const ProjectControler = FactoryProjectCtrl(FactoryStorageCtrl());
    const UIControler = FactoryUiControler();

    const statusBar = UIControler.createStatusBar();
    const TimerControler = FactoryTimerControler(statusBar);

    const runStart = compose(
        TimerControler.start,
        ProjectControler.pickRandom,
        (item) => `"${item.name}" launched 🔥`,
        UIControler.launchNotif
    );

    const runStop = compose(
        computeReturn(TimerControler.stop, ProjectControler.getOne),
        ({ project, time }) => `"${project.name}" Final time [${time}]`,
        UIControler.launchNotif
    );

    const runPause = compose(
        TimerControler.pause,
        ProjectControler.getOne,
        (item) => `"${item.name}" paused ⏸`,
        UIControler.launchNotifPause
    );

    const runPlay = compose(
        TimerControler.play,
        ProjectControler.getOne,
        (item) => `"${item.name}" continue`,
        UIControler.launchNotif
    );

    let startSubscriptions = UIControler.saveCommand(ACTION.start, runStart);
    let stopSubscriptions = UIControler.saveCommand(ACTION.stop, runStop);
    let playSubscriptions = UIControler.saveCommand(ACTION.play, runPlay);
    let pauseSubscriptions = UIControler.saveCommand(ACTION.pause, runPause);

    context.subscriptions.push(startSubscriptions);
    context.subscriptions.push(stopSubscriptions);
    context.subscriptions.push(playSubscriptions);
    context.subscriptions.push(pauseSubscriptions);
}

exports.activate = activate;

function deactivate() {}

module.exports = {
    activate,
    deactivate,
};
