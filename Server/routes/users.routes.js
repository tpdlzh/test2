var userController = require('../controllers/users.controller');
var user = require('mongoose').model('User');
var swig = require('swig');

module.exports = function(app)
{
	app.route('/').get(userController.render);

	app.route('/signup')
	.post(userController.create)
	.get(userController.render);

	app.route('/signin')
	.post(userController.signin)
	.get(userController.render);

	app.route('/profile')
	.get(userController.render);

	app.route('/profile/updateSubject')
	.post(userController.updateSubject);

	app.route('/profile/uploadProfileImage')
	.post(userController.updateProfileImage);

	app.route('/profile/updateMajor')
	.post(userController.updateMajor);

}