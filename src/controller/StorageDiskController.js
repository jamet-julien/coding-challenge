const os = require("os");
const fs = require("fs");

let defaultListProject = [
    { name: "Countdown Timer" },
    { name: "Quiz App" },
    { name: "Recipe App" },
    { name: "Notes App" },
    { name: "ToDo App" },
    { name: "Movie App" },
    { name: "GitHub Profiles App" },
    { name: "Drawing App" },
    { name: "Password Generator" },
    { name: "Weather App" },
    { name: "Hamburger Button & Hidden Menu" },
    { name: "Toast Notification" },
    { name: "Auto Write Text" },
    { name: "Popup / Modal" },
    { name: "Purple Heart Rain" },
    { name: "Background Changer" },
    { name: "Dark Mode Toggle" },
    { name: "Image Carousel" },
    { name: "Sound Board" },
    { name: "Zoom effect" },
];

function isWindows() {
    return process.platform.indexOf("win32") !== -1;
}

function getFileDataArray(file) {
    return new Promise((resolve) => {
        fs.readFile(file, (err, data) => {
            resolve(JSON.parse(data));
        });
    });
}

function saveDataToDisk(file, data) {
    if (!data) return Promise.resolve();
    return new Promise((resolve) => {
        fs.writeFile(file, JSON.stringify(data), () => {
            resolve(data);
        });
    });
}

function getFolderStorage() {
    const homedir = os.homedir();
    const pathFile = [homedir, ".coding-challenge"];
    const glue = isWindows() ? "\\" : "/";
    return pathFile.join(glue);
}

const factoryGetFileStorage = (IS_WINDOW) => () => {
    const homedir = os.homedir();
    const pathFile = [homedir, ".coding-challenge", "projects.json"];
    const glue = IS_WINDOW ? "\\" : "/";
    return pathFile.join(glue);
};

const FactoryStorageCtrl = () => {
    const getFileStorage = factoryGetFileStorage();
    const fileStorage = getFileStorage();
    let listProject = [];

    const instance = {
        start: () => {
            const softwareDataDir = getFolderStorage();

            return new Promise((resolve) => {
                if (fs.existsSync(softwareDataDir)) {
                    getFileDataArray(fileStorage).then((data) => {
                        listProject = data;
                        resolve(instance);
                    });
                    return true;
                }

                fs.mkdirSync(softwareDataDir);
                saveDataToDisk(fileStorage, defaultListProject).then(() => {
                    listProject = defaultListProject;
                    resolve(instance);
                });
            });
        },
        getItems: () => listProject,
        addItem: (item) => {
            listProject = [...listProject, item];
            saveDataToDisk(fileStorage, listProject);
        },
    };

    return instance;
};

module.exports = FactoryStorageCtrl;
