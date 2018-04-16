'use strict';

module.exports = function (app) {
    if (app.config.debug) {
        app.config.coreMiddleware.unshift('less');
    }
};
//# sourceMappingURL=app.js.map