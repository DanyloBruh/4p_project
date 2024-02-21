export const handleAddImage = (values, setValues) => {
  const newImage = [...values.Images];
  newImage.push({ image: '' });
  setValues({ ...values, Images: newImage });
};

export const handleDeleteImages = (i, values, setValues) => {
  setValues({ ...values, Images: values.Images.filter((img, index) => index !== i) });
};
