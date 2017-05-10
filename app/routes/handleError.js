'use strict';
module.exports = function(res, code, err) {
    res.status(code).send(err);
};
