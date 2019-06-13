import React, { Component } from 'react'

function RecipeDetails (props) {
    console.log(props.details)
    const { title } = props.details
    const ingredients = props.details.ingredients.map(ingredient => 
        <div key={ingredient.uuid}>
            <label style={{display:'block'}}>
                <input type="checkbox"/>{ingredient.ammount} {ingredient.measurement} {ingredient.name}
            </label>
            {ingredient.special && <span>{ingredient.special.title} {ingredient.special.type} {ingredient.special.text}</span>}
        </div>
    )
    const directions = props.details.directions.map((direction, index) => 
        <li key={index} style={{display:'block'}}>
            {index+1}) {direction.instructions}
            {direction.optional && <span> (optional)</span>}
        </li>
    )
    return (
        <div>
            <h2>{title}</h2>
            <h5>Ingredients</h5>
            <ul>
                {ingredients}
            </ul>
            <h5>Directions</h5>
            <ol>
                {directions}
            </ol>
        </div>
    )
}

export default RecipeDetails