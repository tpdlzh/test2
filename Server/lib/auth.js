var config = require('../../config');
var jwt = require('jsonwebtoken');

exports.createToken = function(userObj,userData,res)
{
	var token = jwt.sign(userObj,config.JWTSECRET,{
		expiresIn:86400
	});

	res.json({
		token:token,
		user:userData
	});

}