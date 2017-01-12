/**
 * Created by wangsheng on 9/1/17.
 */
import * as m from "./mock";

process.on('message', function(msg) {
    switch (msg) {
        case 'start':
            m.initProject('./resources/projectAlpha');
            break;
        default:
            //ignore.
    }
});

