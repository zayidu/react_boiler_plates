import React, { Component} from 'react';
import axios from 'axios';
import Loading from './Loading';
import { Container, Row , FormGroup } from 'react-bootstrap';
import { sortBy} from "lodash";

// eslint-disable-next-line
// default parameters to fetch data from the api
const DEFAULT_PAGE = 0;
const DEFAULT_HPP = 100;

const DEFAULT_QUERY = 'react';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

const SORT = {
  NONE : list => list,
  TITLE : list => sortBy( list,"title" ),
  AUTHOR : list => sortBy( list,"author" ),
  COMMENTS : list => sortBy( list,"num_comments" ).reverse(),
  POINTS : list => sortBy( list,"points" ).reverse(),

};

// https://hn.algolia.com/api/v1/search?query=react
// const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}?${PARAM_PAGE}`;
const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}`;
console.log(url);

class App extends Component {
  constructor(props){
    super(props);

    // state
    this.state = {
      results : null,
      loading : true,
      searchTerm: 'react',
      searchKey: '',
      sortKey: 'NONE',
      sortReverseKey: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeItem   = this.removeItem.bind(this);
    this.searchValue  = this.searchValue.bind(this);
    this.fetchTopStories = this.fetchTopStories.bind(this);
    this.setTopStories = this.setTopStories.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSort = this.onSort.bind(this);
  }

  onSort(sortKey){

    const sortReverseKey =  this.state.sortKey === sortKey  && 
                            !this.state.sortReverseKey;

    this.setState({
      sortKey,
      sortReverseKey
    })
  }

  // setTopStories(result){

  //   const { hits, page } = result;
  //   const oldHits = page !== 0 ? this.state.result.hits : [];
  //   const updatedHits = [...oldHits, ...hits];
  //   this.setState(
  //     { results : {hits: updatedHits}, page }
  //   );
  // }

    // set top stories
    setTopStories(result){ debugger;
      // get the hits ang page from result
      const { hits, page } = result;
      // meaning page is not 0, button has been clicked, page might be 1 or 2
      // old hits are already available in the state
      // const oldHits = page !== 0 ? this.state.result.hits : [];
  
      const { searchKey, results } = this.state;
  
      const oldHits = results && results[searchKey] ? results[searchKey].hits : [];
  
      const updatedHits = [...oldHits, ...hits];
  
      this.setState({ results: { ...results, [searchKey]: {hits: updatedHits, page} } });
    }

      // check top stories search term
  checkTopStoriesSearchTerm(searchTerm){ debugger;
    return !this.state.results[searchTerm];
  }

  fetchTopStories(searchTerm , page ){
    debugger;
    this.setState({
      loading : true,
    });
    // console.log("at fetch", `${url}${searchTerm}?${PARAM_PAGE}${page}`);
    fetch(`${url}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`).then(
      // fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}
      // &${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`).then(
      response => 
        response.json()
    ).then(
      result => {
        this.setTopStories(result)
        this.setState({
        loading : false,
      })
    }
    ).catch(e => e);

  }

  componentWillMount(){
    // this.getUsers();
  }

    // component did mount
    componentDidMount() { debugger;
      this.setState({
        searchKey : this.state.searchTerm
      });
      this.fetchTopStories(this.state.searchTerm, DEFAULT_PAGE);
    }

  searchValue(e){
    // debugger;
    // console.log(e.target.value);
    this.setState({
      searchTerm : e.target.value
    })
  }

  onSubmit(e){
    debugger;
    this.setState({
      searchKey : this.state.searchTerm
    });
    if (this.checkTopStoriesSearchTerm(this.state.searchTerm)) {
      this.fetchTopStories(this.state.searchTerm, DEFAULT_PAGE);
    }
    e.preventDefault();
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
  // removeItem(cell){ 
  //   // debugger;
  //   console.log(cell);
  //   const updatedList = this.state.users.filter(item => item.cell !== cell);
  //   this.setState({ users : updatedList });
  // }

  // removeItem(id){
  //   debugger;
  //  const { result } = this.state;
  //  // const isNotId = item => item.objectID !== id;
  //  const updatedList = result.hits.filter(item => item.objectID !== id);
  //  // this.setState({ result: Object.assign({}, this.state.result, {hits: updatedList}) });
  //  this.setState({ result: {...result, hits: updatedList} });
  //  // this.setState({ result : updatedList });
  // }

   // lets rewrite removeItem function in ES6
 removeItem(id){ 
   debugger;
  const { results, searchKey } = this.state;
  const { hits, page } = results[searchKey];
  // const isNotId = item => item.objectID !== id;
  const updatedList = hits.filter(item => item.objectID !== id);
  // this.setState({ result: Object.assign({}, this.state.result, {hits: updatedList}) });
  this.setState({ results: {...results, [searchKey]: {hits: updatedList, page}} });
 }

  render(){
    // debugger;
    const { loading , results , searchTerm , searchKey, sortKey , sortReverseKey } = this.state;
    // const page = (results && results.page) || 0;

    const page = (results && results[searchKey] && results[searchKey].page) || 0;

    const list = (results && results[searchKey] && results[searchKey].hits) || [];

    // if (!result) { return null; }
    return (
    <div className="App">
      

      <Container fluid>
        <Row>
          <div className="jumbotron text-center">
          <Search 
            onChange={ this.searchValue } value={ searchTerm } onSubmit={this.onSubmit}>
           NEWS APP
          </Search>
         </div>
        </Row>
      </Container>
      

      {/* <form onSubmit={this.handleSubmit}>
              <input type='submit' value="Load More Users"/>
      </form> */}

      {
        results &&
      <Table
        list={list}
        searchTerm = {this.state.searchTerm}
        onSort={this.onSort}
        sortKey={sortKey}
        sortReverseKey={sortReverseKey}
        loading = {this.state.loading}
        removeItem = { this.removeItem }
      />
      }

      {/* { !loading ?
      <div className="text-center alert">
        <Button
          loading=loading
          className="btn btn-success"
          onClick={ () => this.fetchTopStories(searchTerm, page + 1) }>
          Load more
        </Button>
      </div> :
        <Loading message="Ouvert..."/>
       } */}
      {
      <div className="text-center alert">
        <ButtonWithLoading
          loading={loading}
          className="btn btn-success"
          onClick={ () => this.fetchTopStories(searchTerm, page + 1) }>
          Load more
        </ButtonWithLoading>
      </div>
       }

 
    </div>
   );

}
}



// `class Search extends Component{
//   render(){
//     const { onChange , value , children } = this.props;
//     console.log(this.props);
//     return (
//       <form>
//               { children }
//               <input type='text' onChange={ onChange } value={ value }/>
//       </form>
//     )
//   }
// }`

// ---------------- Stateless Componenets ----------------
// const Search = ({ onChange , value , children }) =>
//       <form>
//               { children }
//               <input type='text' onChange={ onChange } value={ value }/>
//       </form>

// ---------------- Re-Edited ----------------
class Search extends Component{
  render(){
    const { onChange, value, children , onSubmit } = this.props;
  return(
      <form onSubmit={onSubmit}>
      <FormGroup>

        <h1 style={{ fontWeight: 'bold' }}>{ children }</h1> 
        <hr style={{ border: '2px solid black', width: '100px' }} />

        <div className="input-group">

        <input
          className="form-control width100 searchForm" 
          type="text" 
          onChange={ onChange } 
          value={ value } 
          ref={(node) =>{ console.log(node); {this.input = node }}}
        />

        <span className="input-group-btn">
          <button
            className="btn btn-primary searchBtn"
            type="submit"
          >
            Search
          </button>
        </span>

        </div>

        </FormGroup>
      </form>
    )
  }

  componentDidMount(){
    this.input.focus();
  }
}

// class Table extends Component{
//   render(){
//     const { state , removeItem } = this.props;
//     const { loading , users, searchTerm } = state;
//     return (
//       <div>
//     {
//       !loading ?
//       users.filter((users) => users.name.first.toLowerCase().includes(searchTerm.toLowerCase()) 
//       ).map(user =>
//         <div key={user.cell}>
//           <h2 style={{color:"red"}}>{user.name.first} {user.name.last}</h2>
//           <p>{user.cell}</p>
//           <button type="button" onClick={() => removeItem(user.cell) }>Remove</button>
          
//           <hr/>
//         </div>
//       )
//       :
//           <Loading message = "Sending..."/>
//       }
//       </div>
//     )
//   }
// }

// const Table = ({ state , removeItem } ) => {
//   const { loading , result, searchTerm } = state;
//     return (
//       <div>
//     {
//       !loading ?
//       users.filter((users) => users.name.first.toLowerCase().includes(searchTerm.toLowerCase()) 
//       ).map(user =>
//         <div key={user.cell}>
//           <h2 style={{color:"red"}}>{user.name.first} {user.name.last}
//           <p>{user.cell}</p>
//           <button 
//           className="btn btn-xs"
//           type="button" onClick={() => removeItem(user.cell) }>Remove</button>
//           </h2>
//           <hr/>
//         </div>
//       )
//       :
//           <Loading message = "Sending..."/>
//       }
//       </div>
//     )
// }
  
  const Table = ({list, searchTerm , onSort , sortKey, sortReverseKey , loading, removeItem}) => {
  
  const tmpList = SORT[sortKey](list); 
  const updatedlist = !sortReverseKey ? tmpList : tmpList.reverse();

  return(
      <div className="col-sm-10 col-sm-offset-1">
         <div>
           <hr/>
           <Sort
              onSort={onSort}
              sortKey={ 'NONE' } 
              activeSort={sortKey}>
            Default
           </Sort>
           <Sort
              onSort={onSort}
              sortKey={ 'TITLE' } 
              activeSort={sortKey}>
            TITLE
           </Sort>

           <Sort
              onSort={onSort}
              sortKey={ 'AUTHOR' } 
              activeSort={sortKey}>
            AUTHOR
           </Sort>

           <Sort
              onSort={onSort}
              sortKey={ 'COMMENTS' } 
              activeSort={sortKey}>
            COMMENTS
           </Sort>

           <Sort
              onSort={onSort}
              sortKey={ 'POINTS' } 
              activeSort={sortKey}>
            POINTS
           </Sort>
           <hr/>
           </div>
           
        {  
          // list.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()) )
          
          updatedlist.map(item =>   
              <div key={ item.objectID }>
                <h1>
                  <a href={ item.url }>
                    { item.title }</a> 
                </h1>
                <h4>

                  { item.author } | { item.num_comments } Comments | { item.points } Points
                
                <Button
                  className="btn btn-xs"
                  type="button"
                  onClick={ () => removeItem(item.objectID) }>
                    Remove
                </Button>

                </h4> <hr />

              </div>
            )
          }
      </div>
    )
}

const Button = ({ onClick, children, className='' }) => 
  <button
    className={ className }  
    onClick={ onClick } >
    { children }
  </button>

const withLoading = (Component) => ({loading , ...rest}) =>
  !loading ? <Component/> : <Loading message="Ouvrant..."/>

const ButtonWithLoading = withLoading(Button);

const Sort = ({sortKey, onSort , activeSort , children}) =>
  {
    const sortClass = ['btn default'];
    if (sortKey === activeSort ){
      sortClass.push("btn btn-primary");
    }
  return <Button
    className={sortClass.join(" ")}
    onClick={()=> onSort(sortKey) }>
    { children }
  </Button>
  }
export default App;
