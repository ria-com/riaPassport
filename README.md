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