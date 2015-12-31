import React from 'react';
import {Link} from 'react-router';
import SideNav from './SideNav';

var Profile = React.createClass({

 getInitialState()
 {

 	return {

 		f_name:localStorage.getItem("f_name"),
 		l_name:localStorage.getItem("l_name"),
 		email:localStorage.getItem("email"),
    profileImageFileSize:0,
 		full_name:localStorage.getItem("full_name"),
 		description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
 		subjectKeyword:"", 
    profileImage:(localStorage.getItem("profile_image") == "undefined" || null) ? "default_image.jpg" : localStorage.getItem("profile_image"),
    major:(localStorage.getItem("major")!='undefined') ? localStorage.getItem("major") : "",
 		total_subjects:{},
    my_subjects:localStorage.getObj("my_subjects") || [],
    subjects_loaded:false,
 		myPosts:[],
 		myFavourite_articles:[]

 	}	
 },

 changeProfilePhoto2(e)
 {

    e.preventDefault();
    e.stopPropagation();
 
    $("#imageForm #filesize")[0].value = $("#imagefileprofile")[0].files[0].size;

    var fileValue = $("#imageForm")[0].value;
    var formData = new FormData($("#imageForm")[0]);
 
    if(this.refs.imagefileprofile.value!="")
    {
      $("#profileImageButton").attr("disabled","disabled"); 
    }
  else
  {
    return false;
  }

    $.ajax({
        url: "/profile/uploadProfileImage",
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false
    }).done(function(data){

      if(typeof data==="object")
      {
         var err = data.err;
         $("#success_message").html('<div class="alert alert-danger"><strong>File upload fail! </strong>'+err+'</div>');          
         $("#profileImageButton").attr("disabled",false); 
         $("#imageForm")[0].value = "";
         $("#imageForm").trigger("reset");
         return false;
      }
          localStorage.setItem("profile_image",data); 

          $(".profile_photo").attr("src",'/uploads/profile/'+ data);
          $(".profile_small_photo").attr("src",'/uploads/profile/'+ data);
          $(".profile_photo_edit").attr("src",'/uploads/profile/'+ data);
          $("#profileImageButton").attr("disabled",false); 
          $("#imageForm")[0].value = "";
          $("#imageForm").trigger("reset");
          $("#success_message").html('<div class="alert alert-success"><strong>Success!</strong> Yor profile image has been updated!</div>');
      
 
    }).fail(function(xhr){

      console.log(xhr);

    })
 
 

 },

  majorUpdateLink(e)
  { 
      e.preventDefault();

      var major_select = $("#major_select");  

      major_select.attr("disabled",false);
  },
 
  componentDidMount()
  {

    var major_select = $("#major_select");    
    var majorUpdateButton = $("#majorUpdateButton");

      if(this.state.major!='')
      { 
          major_select.attr("disabled","disabled");
      }
    else
      {
          majorUpdateButton.css({"display":"none"});
      }  

      $.ajax({

        url:"/data/major.json",
        dataType:"json",


      }).done(function(data){

        var len = data.major.length;

        for(var i=0;i<len;i++)
        {
            major_select.append($('<option>',{value:data.major[i],text:data.major[i]}));
        }
 
      }).fail(function(){

        major_select.append($('<option>',{value:"Error",text:"can not load data"}));

      })

  },

  updateMajor(e)
  {

    var self = this;
    var major_select = $("#major_select");  
    var majorUpdateButton = $("#majorUpdateButton");

     $.ajax({

        url:"/profile/updateMajor",
        type:"POST",
        data:{
          major:e.target.value,
          _id:localStorage.getItem("id")
        }

     }).done(function(data){

     self.setState({
      major:e.target.value
     });

     localStorage.setItem("major",e.target.value);
     self.state.total_subjects = {};
     self.state.subjects_loaded = false;
     major_select.attr("disabled","disabled");
     majorUpdateButton.css({"display":"block"});

     })

  },

 changeProfilePhoto(e)
 {
    $(":file").filestyle({buttonname: "btn-primary"});  
    $("#imageForm").children()[1].value = "";
    $("#success_message").empty();    
    e.preventDefault();
    e.stopPropagation();
 },

 shouldComponentUpdate()
 {
     return false;
 },
 

 updateDescription(e)
 {
    this.state.description = this.refs.myDescription.value;
 },

 updateSubject(e)
 {

     var self = this;
     if(this.state.subjects_loaded==false && (this.state.major!='undefined' && this.state.major!=""))
     {
 
     $.getJSON('/data/subjects.json',function(data){

        $.each(data,function(key,val){

          var regexp = new RegExp(key,'i');

          if(regexp.test(self.state.major))
          {
            self.state.total_subjects[key] = val;
          }

        })


        if(Object.keys(self.state.total_subjects).length!==0)
        {
           self.state.subjects_loaded = true;
        } 
        

     });

    }
   else
    {
       return;
    }  
 },

 updateKeyword(e)
 {

    var self = this;
    this.state.subjectKeyword = e.target.value;
    var search_result_wrapper = $(".subjectResults");
    var matched = [];
    var keyword = new RegExp(this.state.subjectKeyword,"i");   
 
     if(this.state.subjectKeyword.length==0)
     {
        search_result_wrapper.html(" ");
        matched.length = 0;
        return;
     }

     for(var subject in this.state.total_subjects)
     {
         for(var i=0;i<this.state.total_subjects[subject].length;i++)
         {
            if(keyword.test(this.state.total_subjects[subject][i]))
            { 
              if(matched.indexOf(this.state.total_subjects[subject][i])==-1)
              {
                 matched.push(this.state.total_subjects[subject][i]);
              }
              
            }
           else
            {
               search_result_wrapper.html(" ");
            } 
         }
     }
 

    var ul_element = $("<ul>");
     for(var i=0;i<matched.length;i++)
     {
        var link = $("<span class='subjects_links'>"+ matched[i] +"</span><button class='add_subject_button btn btn-add'>+</button><div class='clearfix'></div>")
        var li = $("<li>").append(link);
        ul_element.append(li);
     }

    search_result_wrapper.append(ul_element);

    $(".add_subject_button").click(function(e){

      e.preventDefault();
      var subject = $(this).prev().html();

      if(self.state.my_subjects.indexOf(subject)==-1)
      {
        self.state.my_subjects.push(subject);
      }
      
      $(this).prev().fadeOut("500");
      $(this).fadeOut("500");

      var ul = $(".my_subjects_ul");

      ul.empty();

      for(var i=0;i<self.state.my_subjects.length;i++)
      {
         var link = $("<span class='subjects_links'>"+ self.state.my_subjects[i] +"</span><button class='delete_subect add_subject_button btn btn-add'>-</button><div class='clearfix'></div>")
         var li = $("<li>");
         li.append(link);
         ul.append(li); 
      }

    $(".delete_subect").click(function(e){

      e.preventDefault();


      var subject = $(this).prev().html();

      if(self.state.my_subjects.indexOf(subject)!=-1)
      {
        var location = self.state.my_subjects.indexOf(subject)
        self.state.my_subjects.splice(location,1);
      }
      
      $(this).prev().fadeOut("500");
      $(this).fadeOut("500");
 
       $.ajax({

        url:"/profile/updateSubject",
        type:"POST",
        data:{

          id:localStorage.getItem("id"),
          subjects:self.state.my_subjects
        }

      }).done(function(data){
 

      }).fail(function(xhr){

        localStorage.setObj("my_subjects",self.state.my_subjects);

      });



    })      

      $.ajax({

        url:"/profile/updateSubject",
        type:"POST",
        data:{

          id:localStorage.getItem("id"),
          subjects:self.state.my_subjects
        }

      }).done(function(){

        

      }).fail(function(xhr){

        localStorage.setObj("my_subjects",self.state.my_subjects);

      });




    });



 },

 delete_subject(e)
 {
      var self = this;
      e.preventDefault();
      var subject = $(e.target).prev().html();
 
      if(this.state.my_subjects.indexOf(subject)!=-1)
      {
        var location = this.state.my_subjects.indexOf(subject)
        this.state.my_subjects.splice(location,1);
      }
 
      $(e.target).prev().fadeOut("500");
      $(e.target).fadeOut("500");

      $.ajax({

        url:"/profile/updateSubject",
        type:"POST",
        data:{

          id:localStorage.getItem("id"),
          subjects:self.state.my_subjects
        }

      }).done(function(data){
 

      }).fail(function(xhr){

        localStorage.setObj("my_subjects",self.state.my_subjects);

      });


 },

render()
	{
    var self = this;
    var num = 1;
    if(this.state.my_subjects!=null)
    {
      var my_subjects = this.state.my_subjects.map(function(subject){

        return (

          <li key={num++}>
            <span className='subjects_links'>{subject}<button onClick={self.delete_subject} className='add_subject_button btn btn-add'>-</button><div className='clearfix'></div></span>
          </li>
          )



      });
 


    }


		var sideMenu = $(".sideMenu").width();
		var padding = 55;
 
		if(sideMenu==null || sideMenu==230)
		{
			padding = 230;
		}



		return(

		  <div id="wrapper">	
 
     		   <div style={{paddingLeft:padding}} className="home_wrapper">
		     <div className="container-fluid"> 
			     <div className="row home_wrapper2 profile_container">
					
					<div className="col-md-3 left_profile_wrapper">

						<div className="big_profile_photo_wrapper">
						  <img className="profile_photo" src={'/uploads/profile/'+ this.state.profileImage}/>	
						  <h3 className="profile_full_name">{this.state.full_name}</h3>
						  <p className="description">{this.state.description}</p>	
						</div>
					  
					  	<div className="profile_menu">
					  	  <ul>	
  							<li><Link to="#"><i className="fa fa-book"></i><span>My Posts</span><span className="post_title"><strong>10</strong></span></Link></li>
  							<li><Link to="#"><i className="fa fa-heart"></i><span>Favourite Articles</span><span className="article_title"><strong>134</strong></span></Link></li>	
					  	  </ul>
					  	</div>

					</div>  	

					

					<div className="col-md-9 right_profile_wrapper">

						<h3>Profile</h3>
					  <div className="right_profile_wrapper2">	
					
						<div className="profile_photo_edit_wrapper">
						
							<Link to="#" data-target="#myModal" data-toggle="modal">
								<i className="fa fa-camera"></i>
								<img className="profile_photo_edit" onClick={this.changeProfilePhoto} src={'/uploads/profile/'+ this.state.profileImage}/>
							</Link>
						    <Link data-target="#myModal" data-toggle="modal" className="chang_profile_image" to="#" onClick={this.changeProfilePhoto}>Change Profile Image</Link>
						</div>

						<div className="edit_profile_wrapper">		
					  	   
      <form className="form-horizontal">

        <div className="form-group">
          <label htmlFor="inputEmail" className="control-label col-xs-2">First Name</label>
          <div className="col-xs-10 f_name">
             {this.state.f_name}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="inputEmail" className="control-label col-xs-2">Last Name</label>
          <div className="col-xs-10 l_name">
             {this.state.l_name}
          </div>
        </div>        

        <div className="form-group">
          <label htmlFor="inputEmail" className="control-label col-xs-2">Email</label>
          <div className="col-xs-10 userEmaildInput">
            {this.state.email}
          </div>
        </div>


        <div className="form-group">
          <label htmlFor="inputPassword" className="control-label col-xs-2">About Me</label>
          <div className="col-xs-10">
             <textarea ref="myDescription" rows="6" defaultValue={this.state.description} onChange={this.updateDescription} className="form-control"></textarea>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="inputPassword" className="control-label col-xs-2">Major</label>
          <div className="col-xs-10">
             <select onChange={this.updateMajor} id="major_select"className="form-control">
              <option defaultValue={this.state.major}>{this.state.major}</option>
             </select><span id="majorUpdateButton"><Link onClick={this.majorUpdateLink} to="#">Update</Link></span>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="inputPassword" className="control-label col-xs-2">Campus</label>
          <div className="col-xs-10">
             <select className="form-control">
				      <option value="">Melbourne City</option>
             	<option value="">Melbourne Bundoora</option>
             	<option value="">Vietnam</option>
             </select>
          </div>
        </div>   
            
        <div className="form-group">
          <label htmlFor="inputEmail" className="control-label col-xs-2">Subject Search</label>
          <div className="col-xs-10 l_name">
 <input type="text" autoComplete="off" onChange={this.updateKeyword} onFocus={this.updateSubject} className="form-control" id="inputEmail" placeholder="Subject" />
            
            <div className="subjectResults form-control"></div>

         </div>
        </div>             

        <div className="form-group">
          <label htmlFor="inputEmail" className="control-label col-xs-2">My Subjects</label>
          <div className="col-xs-10 l_name">
          <div className="my_subjects_results form-control"><ul className="my_subjects_ul">{my_subjects}</ul></div>
          </div>
        </div>


        <div className="form-group">
          <div className="col-xs-offset-2 col-xs-10">
            <div className="checkbox">
              <label><input type="checkbox" /> Remember me</label>
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="col-xs-offset-2 col-xs-10">
            <button type="submit" className="btn btn-primary">Login</button>
          </div>
        </div>
      </form>		

<div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 className="modal-title" id="myModalLabel">Upload your profile image</h4>
      </div>
      <div className="modal-body">

           <form onSubmit={this.changeProfilePhoto2} className="form-group" id="imageForm" method="POST" encType="multipart/form-data">
             <input ref="imageId" type="hidden" value={localStorage.getItem('id')} name="name"/>
             <input type="hidden" id="filesize" name="filesize"/>
             <input ref="imagefileprofile" id="imagefileprofile" className="filestyle" type="file" data-buttonname="btn-primary" name="filename"/>
             <input id="profileImageButton"  className="btn btn-primary" type="submit" value="Upload"/>
           </form>

      </div>
      <div className="modal-footer">
        <div id="success_message"></div>
        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
      			  	   

					  	</div>

					  </div>	


					</div>

	 			 </div>
 			 </div>
 					 </div>
 
		   </div>
 
			)
	}


});

  export default Profile;