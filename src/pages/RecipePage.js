import React, { Component } from 'react';
import RecipeCard from '../components/RecipeCard';

class RecipePage extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        console.log(this.props)
    }

    render(){
        const recipes = this.props.recipes.map((recipe) => 
                <RecipeCard key={recipe.uuid} recipe={recipe} />
        )
        return(
            <div>
                {recipes}
            </div>
        )
    }
}

export default RecipePage;