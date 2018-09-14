export  default store => next => action => {
    if (!action.randomId) {
        return next(action);
    }

    next({
        ...action,
        randomId: (Math.random() + Date.now()).toString()
    });
}
