import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRecipe } from '../api/data/recipeData';
import {
    Button, Form, FormGroup, Label, Input,
  } from 'reactstrap';

const initialState = {
  name: '',
  imageURL: '',
  time: '',
  favorite: '',
  ingredients: '',
  instructions: '',
  comments: ''
};

export default function RecipeForm() {
  const [formInput, setFormInput] = useState(initialState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createRecipe({ ...formInput }).then(navigate('/'));
  };
 
    return (
        <>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="name">Recipe Name</Label>
              <Input
                onChange={(e) => handleChange(e)}
                value={formInput.name ?? ""}
                type="text"
                name="name"
                id="name"
                placeholder="Type Recipe name here..."
              />
            </FormGroup>
            <FormGroup>
              <Label for="imageURL">ImageURL</Label>
              <Input
                onChange={(e) => handleChange(e)}
                value={formInput.imageURL ?? ""}
                type="url"
                name="imageURL"
                id="imageURL"
                placeholder="Paste ImageURL here..."
              />
            </FormGroup>
            <FormGroup>
              <Label for="time">Time</Label>
              <Input
                onChange={(e) => handleChange(e)}
                value={formInput.time ?? ""}
                type="text"
                name="time"
                id="time"
                placeholder="Total time to cook..."
              />
            </FormGroup>
            <FormGroup>
              <Label for="favorite">Favorite</Label>
              <Input
                onChange={(e) => handleChange(e)}
                value={formInput.favorite ?? ""}
                type="text"
                name="favorite"
                id="favorite"
                placeholder="Is this a favorite recipe?"
              />
            </FormGroup>
            <FormGroup>
              <Label for="comments">Comments</Label>
              <Input
                onChange={(e) => handleChange(e)}
                value={formInput.comments ?? ""}
                type="textarea"
                name="comments"
                id="comments"
                placeholder="Any comments on this recipe?"
              />
            </FormGroup>
            <FormGroup>
              <Label for="ingredients">Ingredients</Label>
              <Input
                onChange={(e) => handleChange(e)}
                value={formInput.ingredients ?? ""}
                type="textarea"
                name="ingredients"
                id="ingredients"
                placeholder="List Ingredients here"
              />
            </FormGroup>
            <FormGroup>
              <Label for="instructions">Instructions</Label>
              <Input
                onChange={(e) => handleChange(e)}
                value={formInput.instructions ?? ""}
                type="textarea"
                name="instructions"
                id="instructions"
                placeholder="How to cook this recipe?"
              />
            </FormGroup>
            <FormGroup>
              <Label for="uid">User#</Label>
              <Input
                onChange={(e) => handleChange(e)}
                value={formInput.uid ?? ""}
                type="number"
                name="uid"
                id="uid"
              />
            </FormGroup>
            <Button type="submit">Submit</Button>
          </Form>
    </>
  );
  }
