module.exports = {

validateEmail:function(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
},

getUpperCase:function(word)
{
	return word.charAt(0).toUpperCase() + word.substring(1);
},
 
loggedIn:function()
{
	return localStorage.getItem('token');	
}    


}
