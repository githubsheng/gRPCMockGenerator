/**
 * Created by wangsheng on 9/1/17.
 */
import * as ds from "./defaultServiceImpl";

let loadedProto = ds.loadedProto;

// //provide your own implementation
// function createPublicProject(call, callback){
//     console.log(`using user defined implementation...`);
//     let ret = {
//         project_id: 'dummy_string'
//     };
//     callback(null, ret);
// }
//
// ds.addUserProtoService(loadedProto.itunes_appstore_project.ProjectService.service, {createPublicProject: createPublicProject});
// ds.start('localhost:50051');