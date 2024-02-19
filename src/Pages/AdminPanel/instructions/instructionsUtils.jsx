/* eslint-disable no-unused-vars */

export const handleDeleteIngredient = (i, values, setValues) => {
  const deleteIngredient = [...values.ingredients];
  deleteIngredient.splice(i, 1);
  setValues({ ...values, ingredients: deleteIngredient });
};

export const handleAddIngredient = (values, setValues) => {
  const newIngredient = [...values.ingredients];
  newIngredient.push({ ingredient: '' });
  setValues({ ...values, ingredients: newIngredient });
};

export const handleAddStep = (values, setValues) => {
  const newStep = [...values.text];
  newStep.push({ text: '' });
  setValues({ ...values, text: newStep });
};

export const handleDeleteStep = (i, values, setValues) => {
  const deleteStep = [...values.text];
  deleteStep.splice(i, 1);
  setValues({ ...values, text: deleteStep });
};
