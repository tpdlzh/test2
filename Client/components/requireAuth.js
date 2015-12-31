import lib from '../lib/lib';

function requireAuth(nextState,replaceState)
{
	if(!lib.loggedIn())
	{	
		replaceState({ nextPathname: nextState.location.pathname }, '/signin');
	}
} 


export default requireAuth;