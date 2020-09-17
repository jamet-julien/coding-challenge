const vscode = require("vscode");
const { ACTION } = require("../utils/constant");

const FactoryUiControler = () => {
    return {
        saveCommand: (name, callBack) => {
            return vscode.commands.registerCommand(name, callBack);
        },

        createStatusBar: () => {
            const statusBarItem = vscode.window.createStatusBarItem(
                vscode.StatusBarAlignment.Left
            );
            statusBarItem.text = "🔥  00:00";
            statusBarItem.command = ACTION.pause;
            statusBarItem.show();

            return statusBarItem;
        },

        launchNotif: (msg) => vscode.window.showInformationMessage(msg),
        launchNotifPause: (msg) =>
            vscode.window.showInformationMessage(msg, "stop").then((value) => {
                if (value == "stop") {
                    vscode.commands.executeCommand(ACTION.stop);
                }
            }),
    };
};

module.exports = FactoryUiControler;
