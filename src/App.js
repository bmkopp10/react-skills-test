import React, { Component } from 'react';
import './App.css';
import RecipePage from './pages/RecipePage';


class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      recipes:[],
      loading:true,
    }
  }

  componentDidMount(){
    //https://github.com/typicode/json-server
    //json-server --port 3001 --watch /Users/briankopp/Repos/recipe-app/db.json 
    const URL = 'http://localhost:3001/recipes';
    fetch(URL)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({
          recipes: data,
          loading:false
        })
        console.log(this.state.recipes)
      })
  }

  render(){
    if (this.state.loading) return <h1>Loading...</h1>
    return (
      <div>
        <RecipePage recipes={this.state.recipes} />
      </div>
    )
  }
}

export default App;
