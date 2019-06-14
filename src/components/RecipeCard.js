import React, { Component } from 'react';
import '../App.css';

class RecipeCard extends Component {
  render(){
    const url = this.props.recipe.images.full
    const name = this.props.recipe.title
    const description = this.props.recipe.description
    const prepTime = this.props.recipe.prepTime
    const cookTime = this.props.recipe.cookTime
    const servings = this.props.recipe.servings
    
    return(
      <div style={{display:'inline-grid'}}>
        <div className='meal-container'>
          <h2>{name}</h2>
          <div className='meal-image' style={{backgroundImage: `url(${url})`}}></div>
          <p>{description}</p>
          <div className='recipe-card-details'>
            <div>
                <span className='recipe-card-details-head'>{prepTime} min</span>
                <span className='recipe-card-details-text'>prep time</span>
            </div>
            <div>
                <span className='recipe-card-details-head'>{cookTime} min</span>
                <span className='recipe-card-details-text'>cook time</span>
            </div>
            <div>
                <span className='recipe-card-details-head'>{servings}</span>
                <span className='recipe-card-details-text'>serves</span>
            </div>
          </div>
          <button className='detail-button' onClick={()=>this.props.openRecipe(this.props.recipe)}>View Recipe</button>
        </div>
      </div>
    )
  }
}

export default RecipeCard;