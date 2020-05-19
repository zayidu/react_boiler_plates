import React, { Component } from 'react';

const user = {
    name: "Zayid" ,
    id: 576003 ,
    dept: "SAP"
}
const styles = {
    div : {
        background : '#03a9f4'
    },
    logo : {
        color:'#fff',
        fontFamily:'Anton',
        textAlign:'center'
    }

}
// const Header = () => {
// return (
//     <div>
//         <div>{user.name}</div>
//         <div>{user.id}</div>
//         <div>{user.dept}</div>

//         <input type='text'/>
//     </div>
//     )
//             }

class Header extends Component {
    // constructor(props){
    //     super(props)
    // }
    
    state = {
        title:'Developer',
        keywords:'Zayid'
    }

    inputChange(e){
        console.log(e.target.value);
        this.setState({
            keywords: e.target.value
        })
        
    }

    render() {
        console.log(this.state.keywords);
        return (
        <div style={styles.div}>
            <div style={styles.logo}>{user.name}</div>
            <div style={styles.logo}>{user.id}</div>
            <div style={styles.logo}>{user.dept}</div>
            <div style={styles.logo} >
            <input 
                type='text' 
                onChange={ e => this.inputChange(e)} 
                 />
            </div>
        <div style={styles.logo}>{this.state.title}</div>
        <div style={styles.logo}>{this.state.keywords}</div>
        </div>
        )
    }
                }


export default Header;

