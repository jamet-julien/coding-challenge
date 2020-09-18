exports.compose = (...fn) => (x = null) =>
    fn.reduce(
        (result, funct) =>
            result !== null && result.then ? result.then(funct) : funct(result),
        x
    );

exports.computeReturn = (fun1, fun2) => () => ({
    project: fun2(),
    time: fun1(),
});
