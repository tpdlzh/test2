import React from 'react';
import {Link} from 'react-router';

 var sideNav = React.createClass({

 	getInitialState()
 	{
 		return {

		profileImage:(localStorage.getItem("profile_image") == "undefined" || null) ? "default_image.jpg" : localStorage.getItem("profile_image"),

 		}
 	},

 	componentDidMount()
 	{
  		var menu = $(".control_board ul li a");
 
 		var url = window.location.href;

	    for(var i=0;i<menu.length;i++)
	    {
	    	if(url.indexOf(menu[i].text.toLowerCase())!=-1)
	    	{
	 			 $(menu[i]).children().css({"color":"#ffffff"});
	 			 $(menu[i]).css({

	 			 	"color":"#ffffff",
	 			 	"paddingLeft":"17px",
	 			 	"background-color":"#1c2529",
	 			 	"textDecoration":"none",
	 			 	"borderLeft":"3px solid #4f80c3"	

	 			 });

	    	}

	 		menu[i].addEventListener('click',function(e){

	 			  var clicked = $(this)[0].text;	

		 			for(var j=0;j<menu.length;j++)
		 			{
		 				if(menu[j].href.indexOf(clicked.toLowerCase())==-1)
		 				{
		 					 $(menu[j]).children().css({"color":""});
				 			 $(menu[j]).css({

				 			 	"color":"",
				 			 	"paddingLeft":"",
				 			 	"background-color":"",
				 			 	"textDecoration":"",
				 			 	"borderLeft":""	

				 			 });
		 				} 
		 			}

	 			  $(this).children().css({"color":"#ffffff"});

	 			 $(this).css({

	 			 	"color":"#ffffff",
	 			 	"paddingLeft":"17px",
	 			 	"background-color":"#1c2529",
	 			 	"textDecoration":"none",
	 			 	"borderLeft":"3px solid #4f80c3"	

	 			 });

	 		})		
	  	}
 	},
 

 	render()
 	{
 		var full_name = localStorage.getItem('full_name');
 
 		return (

 			<div className="sideMenu">

 				<div className="profile_photo_wrapper">
 					<img className="profile_small_photo circular" src={'/uploads/profile/'+ this.state.profileImage}/>
 					<h5>{full_name}</h5>
 				</div>
 				
 				<div className="control_board">

 					<ul>
 					  <li><Link to="/profile"><i className="fa fa-user"></i><span>Profile</span></Link></li>
 					  <li><Link to="/inbox"><i className="fa fa-envelope"></i>Inbox</Link></li>
 					  <li><Link to="/friends"><i className="fa fa-users"></i>Friends</Link></li>
 					  <li><Link to="/articles"><i className="fa fa-book"></i>Articles</Link></li>
 					  <li><Link to="/settings"><i className="fa fa-cogs"></i>Settings</Link></li>
 					</ul>

 				</div>

 			</div>

 			)
 	}


 });


 export default sideNav;