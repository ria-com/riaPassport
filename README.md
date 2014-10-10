riaPassport
=======

## Requirements

* [node.js](http://nodejs.org/), v0.11.13

## INSTALL


```js
   "dependencies": {
    ...
    "riaPassport" : "git://github.com/ria-com/riaPassport.git#master"
    ...
   }
```
```bash
    $ npm install
```

config.js
```js
    session: {
        cookie : {
            name : "PHPSESSID"
        },
        memcached : {
            host: '127.0.0.1',
            port: '11211',
            options: {
                poolSize: 512
            }
        }
    }
```

```js
var riaSession = require('riaPassport');
app.use(riaPassport);
```

## Example
```js
var user = this.req.user;

if(this.req.isAuthenticated){
    //user is logged
}else{
    //user is not logged
}
```