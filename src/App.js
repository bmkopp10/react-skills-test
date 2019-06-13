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

  componentDidMount() {
    //https://github.com/typicode/json-server
    //json-server --port 3001 --watch /Users/briankopp/Repos/recipe-app/db.json 
    this.getRecipes()
  }

  getRecipes(){
    const URL = 'http://localhost:3001/recipes';
    fetch(URL)
      .then(response => response.json())
      .then(data => {
        let recipes = data
        this.getSpecials(recipes);
      })
  }

  getSpecials(recipes){
    const URL = 'http://localhost:3001/specials';
    fetch(URL)
      .then(response => response.json())
      .then(data => {
        let specials = data
        for (let ri = 0; ri < recipes.length; ri++) {
          for (let ii = 0; ii < recipes[ri].ingredients.length; ii++) {
            for (let special of specials){
              if (special.ingredientId === recipes[ri].ingredients[ii].uuid){
                recipes[ri].ingredients[ii].special = special
              }
            }
          }
        }
        this.setState({
          recipes: recipes,
          loading:false
        })
      })
  }

  render(){
    if (this.state.loading) return <h1>Loading...</h1>
    return (
      <div style={{backgroundColor: '#e9ebf2'}}>
        <RecipePage recipes={this.state.recipes} />
      </div>
    )
  }
}

export default App;
