import React, { Component} from 'react';
import axios from 'axios';
import Loading from './Loading';

class App extends Component {
  constructor(props){
    super(props);

    // state
    this.state = {
      users : [],
      loading : true
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount(){
    this.getUsers();
  }

  getUsers(){
    axios("https://api.randomuser.me/?hat=US&results=5").then( response => this.setState({
      users : [ ...this.state.users , ...response.data.results ],
      loading : false
    }
    ));
  }

  handleSubmit(e){ 
    // debugger;
    console.log(this);
    console.log(e);
    e.preventDefault();
    this.getUsers();
  }

  render(){
    const { loading , users } = this.state;
  return (
    <div className="App">
      <form onSubmit={this.handleSubmit}>
              <input type='submit' value="Load More Users"/>
      </form>
      { 
        // this.state.loading ?
        !loading ?
        // this.state.users.map(user => 
        users.map(user =>
          <div key={user.cell}>
            <h2 style={{color:"red"}}>{user.name.first} {user.name.last}</h2>
            <p>{user.cell}</p>
            
            
            <hr/>
          </div>
          )
          :
          <Loading message = "Sending..."/>
          
      }
    </div>
   );

}
}

export default App;
