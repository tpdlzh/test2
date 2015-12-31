import React from 'react';
import Navbar from './Navbar';
import lib from '../lib/lib';

const App = React.createClass({

  getInitialState() {

    return {
      loggedIn: lib.loggedIn()
    }
  },
 
	render:function()
	{
		return (

			<div>
			    <Navbar history={this.props.history}/>
				{this.props.children}
			</div>
			);
	}
});

 export default App;