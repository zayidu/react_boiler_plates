import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter , BrowserRouter , MemoryRouter,  Route , Link , NavLink , Switch , Redirect } 
    from 'react-router-dom';

// Components:
import Home    from './components/home';
import Posts   from './components/posts';
import PostItem  from './components/post_item';
import Profile from './components/profile';
import Zayid   from './components/zayid';


const App = () => {
    return (
            <BrowserRouter>
            <div>
                <header>
                    <Link to="/">Home</Link> <br/>
                    <Link to={
                        {
                            pathname:'/zayidu',
                            hash:'#ansari',
                            search:'?profile=true'
                        }
                    }>Zayidu</Link> <br/>
                    <Link to="/posts">Posts</Link> <br/>
                    <Link to="/profile">Profile</Link> <br/><br/>
                </header>
            
            <Switch>
                
                <Route path='/zayidu'   component={Zayid}/>
                <Route path='/posts/:id/:username'    component={PostItem}/>
                <Route path='/posts'    component={Posts}/>
                <Route path='/profile'  component={Profile}/>
                {/* <Redirect from='/' to='/zayidu'/> */}
                <Route path='/'  exact  component={Home}/>
                <Route render={() => <h3>oops - 404 Pas Trouver</h3>}/>
                

            </Switch>
            </div>
            </BrowserRouter>
    )
}

ReactDOM.render(
    <App/>, 
    document.querySelector('#zroot'));


    // <NavLink 
    //                     to="/posts"
    //                     activeStyle={{color:'red'}}
    //                     activeClassName='selected'>
    //                         Posts
    //                 </NavLink> <br/>