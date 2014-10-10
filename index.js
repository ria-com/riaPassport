/**
 * RIA Passport
 */
(function () {
    "use strict";

    var Cookies = require('cookies'),
        config = require('config'),
        sesMemcached = require('co-memcached')(config.session.memcached),
        request = require('koa-request'),
        parser = require('groan');

    module.exports = function * init (next){
        var cookies = new Cookies( this.req, this.res, ['',''] );
        var PHPSESID = cookies.get( config.session.cookie.name );

//    console.log('PHPSESID->>', PHPSESID);
        var data = false;
        if(PHPSESID){
            data =  yield sesMemcached.get(PHPSESID);
//        console.log("data->>>", data);
            if(typeof data === "string") {
                try{
                    data = parser(data);
                } catch (e){
                    data = {};
                }
            }
        }
        if(data && data.person_id){
            var options = {
                method : 'get',
                auth: config.rest.users.auth
            };
            var response = yield request(config.rest.users.host + '/users/'+data.person_id,options);
            try{
                var user = JSON.parse(response.body);
            }catch (e){
                var user = false
            }

//        console.log(user);
            this.req.user = user?user.data:user;
            this.req.isAuthenticated = true;
        }else{
            this.req.isAuthenticated = false;
            this.req.user = false;
        }
//    console.log('end');
        yield next;
    }
}());