import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRecipe, updateRecipe  } from '../api/data/recipeData';
import { getSingleUser } from '../api/data/userData';
import PropTypes from 'prop-types';



const initialState = {
  name: '',
  imageUrl: '',
  time: '',
  ingredients: '',
  instructions: '',
  comments: '',
  userId:''
};
export default function RecipeForm({ editRecipe, firebaseUser }) {
  
  const [formInput, setFormInput] = useState(initialState);
  const navigate = useNavigate();
  
  // const extractUid = async () => {
  //   const user = await getUserByFirebase(firebaseUser.FirebaseId);
  //   setFormInput((prevState) => ({
  //     ...prevState, userId:user.id}));
  //   // setFormInput({...formInput, userId:user.id});
  //   console.warn(user.id);
  // }

    const extractId = async () => {
    const user = await getSingleUser(firebaseUser.id);
    // setFormInput((prevState) => ({
    //   ...prevState, userId:user.id}));
    setFormInput({...formInput, userId:user.id});
    // console.warn(user.id);
  }

  useEffect(() => { 
    if (editRecipe) {
      setFormInput({
        name: editRecipe.name,
        imageUrl: editRecipe.imageUrl,
        time: editRecipe.time,
        ingredients: editRecipe.ingredients,
        instructions: editRecipe.instructions,
        comments: editRecipe.comments,
        userId: editRecipe.userId,
        id: editRecipe.id
      });
    } 
    else {
      extractId();
      // setFormInput((prevState) => ({
      //   ...prevState, userId:firebaseUser.id}));
    }
  }, [editRecipe]);

  const resetForm = () => {
    setFormInput(initialState);
  };

  const handleChange = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editRecipe) {
      updateRecipe(editRecipe.id, formInput).then(() => {
        resetForm();
        navigate('/');
      })
    } else {
      // console.warn(`this is what going to create`,formInput);
      // createRecipe({ ...formInput, userId: firebaseUser.id }, firebaseUser.FirebaseId).then(() => {
        createRecipe({ ...formInput, userId: firebaseUser.id}).then(() => {
        resetForm();
        navigate('/');
      })
    }
  }
 
  return (
    <>
      <h1>{editRecipe ? (`Edit Recipe`) : (`Recipe Form`)}</h1>
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
        {editRecipe ? (`Update`) : (`Submit`)}
        </button>
        </form>
</>
);
}

RecipeForm.propTypes = {
  editRecipe: PropTypes.shape().isRequired,
  firebaseUser: PropTypes.shape().isRequired
};