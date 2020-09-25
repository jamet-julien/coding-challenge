const FactoryProjectCtrl = require("./controller/ProjectController");
const FactoryUiControler = require("./controller/UIController");
const FactoryTimerControler = require("./controller/TimerController");
const FactoryStorageCtrl = require("./controller/StorageDiskController");

const { ACTION } = require("./utils/constant");
const { compose } = require("./utils/helper");

function activate(context) {
    const StorageController = FactoryStorageCtrl();

    StorageController.start().then((instanceStorage) => {
        const ProjectControler = FactoryProjectCtrl(instanceStorage);
        const UIControler = FactoryUiControler();
        const TimerControler = FactoryTimerControler();

        const runList = compose(
            ProjectControler.getList,
            TimerControler.formatTimeList,
            (projects) =>
                projects.map(({ label, time }) => ({
                    label,
                    description: ` Best time [${time}]`,
                })),
            UIControler.launchPick,
            ProjectControler.setOne,
            (item) => `"${item.label}" launched 🔥`,
            UIControler.launchNotif,
            UIControler.getStatusBar,
            TimerControler.start
        );

        const runAdd = compose(
            () => "Add Challenge",
            UIControler.launchInput,
            ProjectControler.addOne
        );

        const runStart = compose(
            ProjectControler.pickRandom,
            (item) => `"${item.label}" launched 🔥`,
            UIControler.launchNotif,
            UIControler.getStatusBar,
            TimerControler.start
        );

        const runStop = compose(
            TimerControler.stop,
            ProjectControler.updateOne,
            (project) => `"${project.label}" Final time [${project.time}]`,
            UIControler.launchNotif
        );

        const runPause = compose(
            TimerControler.pause,
            ProjectControler.getOne,
            (item) => `"${item.label}" paused ⏸`,
            UIControler.launchNotifPause
        );

        const runPlay = compose(
            TimerControler.play,
            ProjectControler.getOne,
            (item) => `"${item.label}" continued`,
            UIControler.launchNotif
        );

        let listSubscriptions = UIControler.saveCommand(ACTION.list, runList);
        let addSubscriptions = UIControler.saveCommand(ACTION.add, runAdd);

        let startSubscriptions = UIControler.saveCommand(
            ACTION.start,
            runStart
        );
        let stopSubscriptions = UIControler.saveCommand(ACTION.stop, runStop);

        let playSubscriptions = UIControler.saveCommand(ACTION.play, runPlay);
        let pauseSubscriptions = UIControler.saveCommand(
            ACTION.pause,
            runPause
        );

        context.subscriptions.push(listSubscriptions);
        context.subscriptions.push(addSubscriptions);
        context.subscriptions.push(startSubscriptions);

        context.subscriptions.push(stopSubscriptions);
        context.subscriptions.push(playSubscriptions);
        context.subscriptions.push(pauseSubscriptions);
    });
}

exports.activate = activate;

function deactivate() {}

module.exports = {
    activate,
    deactivate,
};
