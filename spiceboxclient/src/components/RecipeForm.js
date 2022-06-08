import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import auth from '../api/data/auth/firebaseConfig';
import { createRecipe, getSingleRecipe, updateRecipe  } from '../api/data/recipeData';


const initialState = {
  name: '',
  imageUrl: '',
  time: '',
  ingredients: '',
  instructions: '',
  comments: '',
  uid:''
};

export default function RecipeForm({firebaseUser}) {
  
  const [formInput, setFormInput] = useState(initialState);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [uid, setUid] = useState(null);
  const { recipeId } = useParams();

  useEffect(() => {
    if (recipeId) {
      getSingleRecipe(recipeId).then((recipeObj) => {
        setFormInput({
          name: recipeObj.name,
          imageUrl: recipeObj.imageUrl,
          time: recipeObj.time,
          ingredients: recipeObj.ingredients,
          instructions: recipeObj.instructions,
          comments: recipeObj.comments,
          userId: recipeObj.userId
      })
      })
    } else {
      const currentUID = auth.currentUser?.uid;
      setUid(currentUID);
      setFormInput(initialState);
    }
  }, [])

  const resetForm = () => {
    setFormInput({ ...initialState });
  };

  const handleChange = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (recipeId) {
      updateRecipe(recipeId, formInput).then(() => {
        resetForm();
        navigate('/');
      })
    } else {
      console.log(firebaseUser.token);
      createRecipe({ ...formInput }, firebaseUser.uid).then(() => {
        resetForm();
        navigate('/');
      })
    }
  }
 
    return (
        <>
          <h1>Recipe Form</h1>
          <form onSubmit={handleSubmit}>
          <div>
            <div>
              <input 
              onChange={(e) => handleChange(e)}
              value={formInput.name || ''}
              type="text"
              name="name"
              placeholder="Type Recipe name here..."
              required
              />
            </div>
            <div>
              <input 
               onChange={(e) => handleChange(e)}
               value={formInput.imageUrl || ''}
               type="url"
               name="imageUrl"
               placeholder="Paste ImageURL here..."
               required
              />
            </div>
            <div>
              <input 
               onChange={(e) => handleChange(e)}
               value={formInput.time || ''}
               type="text"
               name="time"
               placeholder="Total time to cook..."
               required
              />
            </div>
            <div>
              <input 
               onChange={(e) => handleChange(e)}
               value={formInput.comments || ''}
               type="textarea"
               name="comments"
               placeholder="Any comments on this recipe?"
               required
              />
            </div>
            <div>
              <input 
               onChange={(e) => handleChange(e)}
               value={formInput.ingredients || ''}
               type="textarea"
               name="ingredients"
               placeholder="List Ingredients here"
               required
              />
            </div>
            <div>
              <input 
               onChange={(e) => handleChange(e)}
               value={formInput.instructions || ''}
               type="textarea"
               name="instructions"
               placeholder="How to cook this recipe?"
               required
              />
            </div>
            </div>
            <button type='submit' className='btn btn-success'>
              Submit
            </button>
            </form>
    </>
  );
  }
