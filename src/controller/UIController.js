const vscode = require("vscode");
const { ACTION } = require("../utils/constant");

const FactoryUiControler = () => {
    let statusBarItem = null;
    return {
        saveCommand: (name, callBack) =>
            vscode.commands.registerCommand(name, callBack),

        launchPick: (items) => vscode.window.showQuickPick(items),

        getStatusBar: () => {
            if (statusBarItem === null) {
                statusBarItem = vscode.window.createStatusBarItem(
                    vscode.StatusBarAlignment.Left
                );
            }
            statusBarItem.text = "🔥  00:00";
            statusBarItem.command = ACTION.pause;
            statusBarItem.show();

            return statusBarItem;
        },

        launchNotif: (msg) => vscode.window.showInformationMessage(msg),

        launchInput: (placeHolder) =>
            vscode.window.showInputBox({ placeHolder }),

        launchNotifPause: (msg) =>
            vscode.window.showInformationMessage(msg, "stop").then((value) => {
                if (value == "stop") {
                    vscode.commands.executeCommand(ACTION.stop);
                }
            }),
    };
};

module.exports = FactoryUiControler;
