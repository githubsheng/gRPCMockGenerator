let root = {
    hello : {
        world : {
            Error: {
                _create: function(){ return 1; }
            },
            Request: {
                _create: function(){
                    return {
                        id: 'dummy_string',
                        name: 'dummy_string'
                    }
                }
            },
            Response: {
                _create: function(){
                    return {
                        array: ['dummy_string', 'dummy_string'],
                        data: 'dummy_string'
                    }
                }
            },
            ProjectService : {
                createPublicProject: function(call, callback){
                    let userDefined = root.hello.world.ProjectService.__userDefinedResult__createPublicProject;
                    let defaultImpl = root.hello.world.Response._create;
                    let ret = userDefined ? userDefined() : defaultImpl();
                    callback(null, ret);
                },
                __userDefinedResult__createPublicProject: function(){
                    let ret = null;
                    ret = {
                        msg: "hello"
                    }
                    return ret;
                }
            },
            TeamService : {
            }
        }
    }
};
module.exports = root;