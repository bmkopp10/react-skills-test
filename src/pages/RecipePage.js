import React, { Component } from 'react';
import RecipeCard from '../components/RecipeCard';
import ReactModal from 'react-modal';
import RecipeDetails from '../components/RecipeDetails';

ReactModal.setAppElement('#root');

class RecipePage extends Component {
    constructor(props){
        super(props)
        this.state = {
            modalVisible:false,
            recipeDetails:{}
        }
        this.closeRecipe = this.closeRecipe.bind(this)
        this.openRecipe = this.openRecipe.bind(this)
    }

    render(){
        const recipes = this.props.recipes.map((recipe) => 
                <RecipeCard 
                    key={recipe.uuid} 
                    recipe={recipe}
                    openRecipe={this.openRecipe} 
                />
        )
        return(
            <div>
                <ReactModal isOpen={this.state.modalVisible}>
                    <button onClick={this.closeRecipe}>Close Modal</button>
                    <RecipeDetails details={this.state.recipeDetails}/>
                </ReactModal>
                {recipes}
            </div>
        )
    }

    openRecipe(recipe){
        this.setState({
            modalVisible:true,
            recipeDetails: recipe,
        })
    }

    closeRecipe(){
        this.setState({
            modalVisible:false,
        })
    }
}

export default RecipePage;