import React from 'react';
//import Badge from './Badge';
import '../App.css';

class RecipeCard extends React.Component {
  render(){
    const url = this.props.recipe.images.full
    const name = this.props.recipe.title
    //const ingredientList = this.props.recipe.ingredients
    
    return(
      <div style={{display:'inline-grid'}}>
        <div className='meal-container'>
          <img style={{width:300, height:300, borderRadius:40, display:'block'}} src={url} />
          <span>{name}</span>
        </div>
      </div>
    )
  }
}

export default RecipeCard;