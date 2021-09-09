import React,{useContext,useRef,useEffect,useState} from 'react'
import {Link ,useHistory} from 'react-router-dom'
import {UserContext} from '../App'
import M, { Dropdown } from 'materialize-css'
const NavBar = ()=>{
    const  searchModal = useRef(null)
    const [search,setSearch] = useState('')
    const [userDetails,setUserDetails] = useState([])
     const {state,dispatch} = useContext(UserContext)
     const history = useHistory()
     useEffect(()=>{
         M.Modal.init(searchModal.current)
     },[])
     const renderList = ()=>{
       if(state){
           return [
           
        //     <li><a href="sass.html">Sass</a></li>,
        // <li><a href="badges.html">Components</a></li>,
        // <li><a href="collapsible.html">Javascript</a></li>,
        // <li><a href="mobile.html">Mobile</a></li>,

        <li key="1"><i  data-target="modal1" className="large material-icons modal-trigger" style={{color:"black"}}>search</i></li>,
        <li key="5"><Link to={"/"}>Home</Link></li>,
            <li key="2"><Link to="/profile">My Account</Link></li>,
            <li key="3"><Link to="/create">Create Post</Link></li>,
            <li key="4"><Link to="/myfollowingpost">Queue Products</Link></li>,
            
          

            <li  key="5">
             <button className="btn #c62828 red darken-3"
            onClick={()=>{
              localStorage.clear()
              dispatch({type:"CLEAR"})
              history.push('/signin')
            }}
            >
                Logout
            </button>
            </li>
         
         
        
           ]
       }else{
         return [
       < li key = "6" className = "nav-bar"> < Link to = "/signin" > Sign in </Link></li > ,
          <li  key="7" className="nav-bar"><Link to="/signup">Sign up</Link></li>
         
         ]
       }
     }


     const fetchUsers = (query)=>{
        setSearch(query)
        fetch('/search-users',{
          method:"post",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            query
          })
        }).then(res=>res.json())
        .then(results=>{
          setUserDetails(results.user)
        })
     }
    return(
      <nav>
    <div class="nav-wrapper">
      <a href={state?"/":"/signin"} class="brand-logo">Digi-Queue</a>
     {/* <Link to={state?"/":"/signin"} className="brand-logo left">Digi-Queue</Link>   */}
      <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
      <ul class="right hide-on-med-and-down">
      {renderList()}
        
      </ul>
  
      {/* <ul class="sidenav" id="mobile-demo">
    <li><a href="sass.html">Sass</a></li>
    <li><a href="badges.html">Components</a></li>
    <li><a href="collapsible.html">Javascript</a></li>
    <li><a href="mobile.html">Mobile</a></li>
  </ul> */}

<ul class="sidenav" id="mobile-demo">
{/* <li key="1"><i  data-target="modal1" className="large material-icons modal-trigger" style={{color:"black"}}>search</i></li>
            <li key="2"><Link to="/profile">Profile</Link></li>
            <li key="3"><Link to="/create">Create Post</Link></li>
            <li key="4"><Link to="/myfollowingpost">My Connections Posts</Link></li>
            
          

            <li  key="5">
             <button className="btn #c62828 red darken-3"
            onClick={()=>{
              localStorage.clear()
              dispatch({type:"CLEAR"})
              history.push('/signin')
            }}
            >
                Logout
            </button>
            </li> */}
             {renderList()}
        
        </ul>
       
     


     
         
     
       
        <div id="modal1" class="modal" ref={searchModal} style={{color:"black"}}>
          <div className="modal-content">
          <input
          
            type="text"
            placeholder="search users using email id...."
            value={search}
            onChange={(e)=>fetchUsers(e.target.value)}
            />
             <ul className="collection">
               {userDetails.map(item=>{
                 return <Link to={item._id !== state._id ? "/profile/"+item._id:'/profile'} onClick={()=>{
                   M.Modal.getInstance(searchModal.current).close()
                   setSearch('')
                 }}><li className="collection-item">{item.email}</li></Link> 
               })}
               
              </ul>
          </div>
          <div className="modal-footer">
            <button className="modal-close waves-effect waves-green btn-flat" onClick={()=>setSearch('')}>close</button>
          </div>
        </div> </div>
        
  </nav>
      
  
    )
}



document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, 'left');
});



export default NavBar