const FactoryProjectCtrl = (storage) => {
    let list, len, current;

    const _initVar = () => {
        list = [...storage.getItems()];
        len = list.length;
    };

    const getList = () => list;
    const getOne = () => current;
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
        getList,
        pickRandom,
        getOne,
        addOne,
    };
};

module.exports = FactoryProjectCtrl;
