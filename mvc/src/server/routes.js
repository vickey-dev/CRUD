"use strict"
const userCtrl = require('./controllers/userCtrl');

module.exports = (app)=>{

	app.post('/login',userCtrl.login);
	app.get('/users',userCtrl.get);
    app.post('/user',userCtrl.post);
    app.delete('/user/:usersid',userCtrl.delete);
    app.put('/user',userCtrl.put);
}
