/**
 * RIA Passport
 */
(function () {
    "use strict";

    var config = require('config'),
        request = require('koa-request'),
        parser = require('groan');

    module.exports = function * init (next){
        this.req.isAuthenticated = false;
        this.req.user = false;
        var data =  yield this.req.session.get();
        var usagePhpSession = false;

        if(typeof data === "string") {
            usagePhpSession = true;
            try{
                data = parser(data);
            } catch (e){
                data = {};
            }
        }

        if(typeof data === "object"){
            if(data.passport && data.passport.user_id){
                this.req.user = data.passport;
                this.req.isAuthenticated = true;
            }else{
                if(data && data.person_id){
                    var options = {
                        method : 'get',
                        auth: config.passport.auth
                    };
                    var response = yield request(config.passport.host + '/users/'+data.person_id,options);
                    try{
                        var user = JSON.parse(response.body);
                    }catch (e){
                        var user = false
                    }
                    this.req.user = user?user.data:user;
                    this.req.isAuthenticated = true;
                    if(!usagePhpSession){
                        yield this.req.session.save('passport', this.req.user);
                    }
                }
            }

        }
        yield next;
    }
}());