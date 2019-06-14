import React, { Component } from 'react';
import './App.css';
import RecipePage from './pages/RecipePage';
import AddPage from './pages/AddPage';
import Header from './components/Header';


class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      recipes:[],
      loading:true,
      page:'view',
      buttonTitle: 'Add Recipe'
    }
    this.switchPage = this.switchPage.bind(this)
    this.addRecipeOnSuccess = this.addRecipeOnSuccess.bind(this)
  }

  componentDidMount() {
    //https://github.com/typicode/json-server
    //json-server --id uuid --port 3001 /Users/briankopp/Repos/recipe-app/db.json
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

  addRecipeOnSuccess(newRecipe){
    let recipeArr = this.state.recipes
    recipeArr.push(newRecipe)
    this.setState({recipes: recipeArr})
  }

  switchPage () {
    if (this.state.page === 'view') this.setState({page: 'add', buttonTitle: 'View Recipes'})
    if (this.state.page === 'add') this.setState({page: 'view', buttonTitle: 'Add Recipe'})
  }

  render(){
    if (this.state.loading) return <h1>Loading...</h1>
    return (
      <div>
        <Header title="Welcome!" switchPage={this.switchPage} buttonTitle={this.state.buttonTitle}/>
        {this.state.page === 'view' && <RecipePage recipes={this.state.recipes} />}
        {this.state.page === 'add' && <AddPage addRecipeOnSuccess={this.addRecipeOnSuccess}/>}
      </div>
    )
  }
}

export default App;
