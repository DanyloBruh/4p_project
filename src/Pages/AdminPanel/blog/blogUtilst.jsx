export const handleAddImage = (values, setValues) => {
  const newImage = [...values.Images];
  newImage.push({ image: '' });
  setValues({ ...values, Images: newImage });
};

export const handleDeleteImages = (i, values, setValues) => {
  const deleteImages = [...values.Images];
  deleteImages.splice(i, 1);
  setValues({ ...values, Images: deleteImages });
};
