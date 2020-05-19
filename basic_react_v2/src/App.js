import React, { Component} from 'react';
import axios from 'axios';
import Loading from './Loading';

class App extends Component {
  constructor(props){
    super(props);

    // state
    this.state = {
      users : [],
      loading : true,
      searchTerm: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeItem   = this.removeItem.bind(this);
    this.searchValue  = this.searchValue.bind(this);
  }

  componentWillMount(){
    this.getUsers();
  }

  searchValue(e){
    // debugger;
    // console.log(e.target.value);
    this.setState({
      searchTerm : e.target.value
    })
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
  removeItem(cell){ 
    // debugger;
    console.log(cell);
    const updatedList = this.state.users.filter(item => item.cell !== cell);
    this.setState({ users : updatedList });
  }

  render(){
    const { loading , users, searchTerm  } = this.state;
  return (
    <div className="App">
      
      <Search 
       onChange={ this.searchValue } value={ searchTerm }>
         Search Here: 
      </Search>

      <form onSubmit={this.handleSubmit}>
              <input type='submit' value="Load More Users"/>
      </form>

      <Table
        state={this.state}
        removeItem = { this.removeItem }
      />
    </div>
   );

}
}

class Search extends Component{
  render(){
    const { onChange , value , children } = this.props;
    console.log(this.props);
    return (
      <form>
              { children }
              <input type='text' onChange={ onChange } value={ value }/>
      </form>
    )
  }
}

class Table extends Component{
  render(){
    const { state , removeItem } = this.props;
    const { loading , users, searchTerm } = state;
    return (
      <div>
    {
      !loading ?
      users.filter((users) => users.name.first.toLowerCase().includes(searchTerm.toLowerCase()) 
      ).map(user =>
        <div key={user.cell}>
          <h2 style={{color:"red"}}>{user.name.first} {user.name.last}</h2>
          <p>{user.cell}</p>
          <button type="button" onClick={() => removeItem(user.cell) }>Remove</button>
          
          <hr/>
        </div>
      )
      :
          <Loading message = "Sending..."/>
      }
      </div>
    )
  }
}

export default App;
