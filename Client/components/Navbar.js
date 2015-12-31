import React from 'react';
import lib from '../lib/lib.js';
import {Link} from 'react-router';
import NavbarAction from '../actions/NavbarAction';
import NavbarStore from '../stores/NavbarStore';
import SideNav from './SideNav';

 class Navbar extends React.Component
 {
    constructor(props)
    {
       super(props);
       this.onChange = this.onChange.bind(this);
       this.state = NavbarStore.getState();  
    }

    componentWillMount()
    {
        this.state.loggedIn = lib.loggedIn();
    }

    componentWillReceiveProps()
    {
       this.state.loggedIn = lib.loggedIn();
    }

    componentDidMount()
    {
       NavbarStore.listen(this.onChange);
    }

    componentWillUnmount()
    {
      NavbarStore.unlisten(this.onChange);
    }

    onChange(state)
    {
       this.setState(state);
    }

    toggleSideBar()
    {

     var sidebar = $(".sideMenu");
     var Homewrapper = $(".home_wrapper");
     var profile_photo_wrapper = $(".profile_photo_wrapper");
     var left_value = sidebar.width();
     var toggled = left_value == 230 ? true : false;
     var links = $(".control_board a");
     var spans = $(".control_board a span");
     var main_menu_toggle = $('.main_menu_toggle');
 
       if(toggled==true)
       {
             profile_photo_wrapper.hide();
             spans.hide();
             links.width(35);

               Homewrapper.animate({

                 paddingLeft:"-=175"

               },300);

               sidebar.animate({

                 width:"-=175"

               },300); 
       }
     else
       {

               Homewrapper.animate({

                 paddingLeft:"+=175"

               },300);

               sidebar.animate({

                 width:"+=175"

               },300,function(){


               profile_photo_wrapper.show();
               links.width(210);
               spans.show();

               }); 
       }   

       return;
    }

    handleSubmit()
    {
        NavbarAction.logout(this.props.history);
    }
 
    render()
    {



      return (

      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="main_menu_toggle navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <a className="navbar-brand" href="#"><img src="/img/logo.png" /><p>Rmiters</p></a>

            {this.state.loggedIn ?

            <button onClick={this.toggleSideBar.bind(this)} type="button" style={{display:'block',padding:0,marginTop:17}} className="sidebar_toggle_button navbar-toggle collapsed">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
                   :
               <div></div>    

            }

            
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li className="active"><Link to='/'>Home</Link></li>
              <li><a href="#about">Forums</a></li>
              <li><a href="#contact">Buy & Sell</a></li>
              <li><a href="#contact">Accomodation</a></li>
              <li className="hidden-md hidden-lg"><a href="#contact">Login</a></li>
            </ul>
            <ul className="nav navbar-nav navbar-right top_menu">
 

            {this.state.loggedIn ?

<button type="button" onClick={this.handleSubmit.bind(this)} className="btn btn-primary sign_out">Sign out</button>
                   :
               <div className="right_menu_wrapper"> 
                <Link to='/signin' className="btn btn-primary sign_up">Sign In</Link>
                <Link to='/signup' className="btn btn-primary sign_up">Sign Up</Link>
               </div>    

            }


        </ul>
          </div> 
        </div>
{this.state.loggedIn ?
        <SideNav/>
        :
       undefined}   
      </nav>

      
      
    );
    }

 }
 
 export default Navbar;