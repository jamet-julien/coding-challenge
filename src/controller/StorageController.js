const FactoryStorageCtrl = () => {
    let listProject = [
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

    return {
        getItems: () => listProject,
        addItem: (item) => (listProject = [...listProject, item]),
    };
};

module.exports = FactoryStorageCtrl;
