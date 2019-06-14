import axios from 'axios';

export default class Api{

    addRecipe( recipeJSON ){
        console.log(recipeJSON)
        return axios({
            method: 'POST',
            url: 'http://localhost:3001/recipes',
            data: recipeJSON,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}