"use strict";
/**
 * Created by wangsheng on 9/1/17.
 */
const m = require("./mock");
process.on('message', function (msg) {
    switch (msg) {
        case 'start':
            m.initProject('./resources/projectAlpha');
            break;
        default:
    }
});
//# sourceMappingURL=runGrpcServer.js.map