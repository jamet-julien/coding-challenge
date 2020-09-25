const os = require("os");
const fs = require("fs");

let defaultListProject = [
    { id: 0, label: "Create Countdown Timer", seconds: Infinity },
    { id: 1, label: "Create Quiz App", seconds: Infinity },
    { id: 2, label: "Create Recipe App", seconds: Infinity },
    { id: 3, label: "Create Notes App", seconds: Infinity },
    { id: 4, label: "Create ToDo App", seconds: Infinity },
    { id: 5, label: "Create Movie App", seconds: Infinity },
    { id: 6, label: "Create GitHub Profiles App", seconds: Infinity },
    { id: 7, label: "Create Drawing App", seconds: Infinity },
    { id: 8, label: "Create Password Generator", seconds: Infinity },
    { id: 9, label: "Create Weather App", seconds: Infinity },
    {
        id: 10,
        label: "Create Hamburger Button & Hidden Menu",
        seconds: Infinity,
    },
    { id: 11, label: "Create Toast Notification", seconds: Infinity },
    { id: 12, label: "Create Auto Write Text", seconds: Infinity },
    { id: 13, label: "Create Popup / Modal", seconds: Infinity },
    { id: 14, label: "Create Purple Heart Rain", seconds: Infinity },
    { id: 15, label: "Create Background Changer", seconds: Infinity },
    { id: 16, label: "Create Dark Mode Toggle", seconds: Infinity },
    { id: 17, label: "Create Image Carousel", seconds: Infinity },
    { id: 18, label: "Create Sound Board", seconds: Infinity },
    { id: 19, label: "Create Zoom effect", seconds: Infinity },
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

const findMaxId = (arr) => arr.reduce((g, c) => Math.max(g, c.id), 0);

const FactoryStorageCtrl = () => {
    const getFileStorage = factoryGetFileStorage();
    const fileStorage = getFileStorage();
    let listProject = [];
    let lastId = 0;

    const instance = {
        start: () => {
            const softwareDataDir = getFolderStorage();

            return new Promise((resolve) => {
                if (fs.existsSync(softwareDataDir)) {
                    getFileDataArray(fileStorage).then((data) => {
                        listProject = data;
                        lastId = findMaxId(listProject);
                        resolve(instance);
                    });
                    return true;
                }

                fs.mkdirSync(softwareDataDir);
                saveDataToDisk(fileStorage, defaultListProject).then(() => {
                    listProject = defaultListProject;
                    lastId = findMaxId(listProject);
                    resolve(instance);
                });
            });
        },
        getItems: () => listProject,
        updateItems: (project) => {
            listProject = listProject.map((item) =>
                item.id === project.id ? project : item
            );
            saveDataToDisk(fileStorage, listProject);
        },
        addItem: (item) => {
            lastId = lastId + 1;
            listProject = [...listProject, { ...item, id: lastId }];
            saveDataToDisk(fileStorage, listProject);
        },
    };

    return instance;
};

module.exports = FactoryStorageCtrl;
