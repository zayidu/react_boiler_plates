import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// Components
import Header from './components/header';
import List   from './components/list';


// Data File:
import db from './data.json';


// const App = () => {
//     console.log(db);
//     return (
//         <div>
//             <Header/>
//         </div>
//     )
// }

class App extends Component {
    state = {
        list: db
    }


    render(){
    console.log(db);
        return (
        <div>
            <Header/>
            <List list={this.state.list}>
                <h3>Expertise:</h3>
            </List>
        </div>
    )
}
}

ReactDOM.render(<App/> , document.querySelector("#zroot")); 



