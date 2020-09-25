const FactoryProjectCtrl = (storage) => {
    let list, len, current;

    const _initVar = () => {
        list = [...storage.getItems()];
        len = list.length;
    };

    const getList = () => list;
    const getOne = () => current;
    const setOne = ({ label }) => {
        current = list.find((n) => n.label === label);
        return current;
    };

    const updateOne = ({ seconds, time }) => {
        if (seconds < current.seconds || current.seconds === null) {
            storage.updateItems({ ...current, seconds });
            _initVar();
        }
        return { ...current, time };
    };

    const pickRandom = () => {
        current = list[Math.round(Math.random() * len)];
        return current;
    };
    const addOne = (name) => {
        storage.addItem({ name });
        _initVar();
    };

    _initVar();
    return {
        setOne,
        getList,
        pickRandom,
        getOne,
        updateOne,
        addOne,
    };
};

module.exports = FactoryProjectCtrl;
