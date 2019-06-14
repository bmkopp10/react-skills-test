import React, { Component } from 'react';
import Api from '../service/ApiService';

export class AddPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            cookTime: '',
            description: '',
            directions: [{
                instructions: '',
                optional: false,
            }],
            editDate: Date.now(),
            images: {
                full: 'https://avatarfiles.alphacoders.com/890/89099.gif',
            },
            ingredients: [{
                ammount: '',
                name:'',
                measurement: '',
                uuid:this.generateUUID()
            }],
            postDate: Date.now(),
            prepTime: '',
            servings: '',
            title: '',
            uuid: this.generateUUID(),
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.api = new Api();
    }
  
    handleChange(event) {
        const name = event.target.name
        this.setState({
            [name]: event.target.value,
          })
    }

    handleIngredientListChange (index, event) {
        let ingredients = this.state.ingredients
        const name = event.target.name
        ingredients[index][name] = event.target.value;
        this.setState({ingredients: ingredients});
    }

    handleDirectionListChange (index, event) {
        const name = event.target.name
        const type = event.target.type
        let directions = this.state.directions
        if (type !== 'checkbox'){
            directions[index][name] = event.target.value;
            this.setState({directions: directions});
        } else {
            directions[index][name] = event.target.checked
            this.setState({directions: directions});
        }
    }
    
    validate(){
        if (this.validateIngredients() && 
            this.validateDirections() &&
            this.state.title.length > 0 &&
            this.state.description.length > 0 && 
            this.state.prepTime > 0 && 
            this.state.cookTime > 0 && 
            this.state.servings > 0){
                return true
            }
        return false
    }

    validateIngredients(){
        let validIngredients = 0
        for (let i = 0; i < this.state.ingredients.length; i++){
            if (this.state.ingredients[i].name.length > 0 &&
                this.state.ingredients[i].ammount > 0 &&
                this.state.ingredients[i].measurement.length > 0){
                    ++validIngredients
                }
        }
        if (validIngredients === this.state.ingredients.length) return true
        return false
    }

    validateDirections(){
        let validDirections = 0
        for (let i = 0; i < this.state.directions.length; i++){
            if (this.state.directions[i].instructions.length > 0){
                    ++validDirections
            }
        }
        if (validDirections === this.state.directions.length) return true
        return false
    }
    
    handleSubmit(event) {
        event.preventDefault();
        if (this.validate()) {
        this.props.addRecipeOnSuccess(this.state)
        let recipeJSON = JSON.stringify(this.state)
        this.api.addRecipe(recipeJSON).then((response)=> {
            console.log(response)
            alert('added')
            this.resetForm()
        }).catch((error)=> {
            console.log(error)
        });
        } else {
            alert('all fields must have values')
        }
    }

    addIngredient(){
        let ingredients = this.state.ingredients
        let newIngredient = {
            ammount: '',
            name:'',
            measurement: '',
            uuid: this.generateUUID()
        }
        ingredients.push(newIngredient);
        this.setState({ingredients:ingredients})
    }

    addDirection(){
        let directions = this.state.directions
        let newDirection = {
            instructions:'',
            optional: false
        }
        directions.push(newDirection);
        this.setState({directions: directions})
    }

    generateUUID (){
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    resetForm (){
        this.setState({
            cookTime: '',
            description: '',
            directions: [{
                instructions: '',
                optional: false,
            }],
            editDate: Date.now(),
            images: {
                full: 'https://avatarfiles.alphacoders.com/890/89099.gif',
            },
            ingredients: [{
                ammount: '',
                name:'',
                measurement: '',
                uuid:this.generateUUID()
            }],
            postDate: Date.now(),
            prepTime: '',
            servings: '',
            title: '',
            uuid: this.generateUUID(),
        });
    }

    render() {
        let ingredients = this.state.ingredients.map((ingredient, index) =>
            <div key={index}> {index +1 })
                <label>
                        name:
                        <input type="text" name='name' value={this.state.ingredients[index].name} onChange={this.handleIngredientListChange.bind(this, index)} />
                </label>
                <label>
                        ammount:
                        <input type="number" name='ammount' value={this.state.ingredients[index].ammount} onChange={this.handleIngredientListChange.bind(this, index)} />
                </label>
                <label>
                        measurement:
                        <input type="text" name='measurement' value={this.state.ingredients[index].measurement} onChange={this.handleIngredientListChange.bind(this, index)} />
                </label>
            </div>
        )
        let directions = this.state.directions.map((direction, index) =>
            <div key={index}> {index +1 })
                <label>
                        instruction:
                        <input type="text" name='instructions' value={this.state.directions[index].instructions} onChange={this.handleDirectionListChange.bind(this, index)} />
                </label>
                <label>
                        optional:
                        <input type="checkbox" name='optional' value={this.state.directions[index].optional} checked={direction.optional} onChange={this.handleDirectionListChange.bind(this, index)} />
                </label>
            </div>
        )
        return (
            <div className='recipe-form'>
                <button onClick={()=>this.addIngredient()}>Add ingredient</button>
                <button onClick={()=>this.addDirection()}>Add direction</button>
                <button onClick={()=>this.resetForm()}>Reset</button>
            <form onSubmit={this.handleSubmit}>
                <h5>Details</h5>
                <label>
                    Title:
                    <input type="text" name='title' value={this.state.title} onChange={this.handleChange} />
                </label>
                <label>
                    Description:
                    <input type="text" name='description' value={this.state.description} onChange={this.handleChange} />
                </label>
                <label>
                    Servings:
                    <input type="number" name='servings' value={this.state.servings} onChange={this.handleChange} />
                </label>
                <label>
                    Prep Time:
                    <input type="number" name='prepTime' value={this.state.prepTime} onChange={this.handleChange} />
                </label>
                <label>
                    Cook Time:
                    <input type="number" name='cookTime' value={this.state.cookTime} onChange={this.handleChange} />
                </label>
                <h5>Ingredients</h5>
                {ingredients}
                <h5>Directions</h5>
                {directions}
                <input className='recipe-form-submit' type="submit" value="Submit" />
            </form>
            </div>
        );
    }
}

export default AddPage;
