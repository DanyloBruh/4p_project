export const validateUser = (formData) => {
  // name validation
  let isValidated = true;
  if (formData.name === '') {
    isValidated = false;
    return { msg: 'Name is required', isValidated };
  }
  if (!formData.name.match('^[A-Za-z]{1,20} [A-Za-z]{1,20}')) {
    isValidated = false;
    return { msg: 'Name is not valid', isValidated };
  }
  // role validation
  if (formData.role === '') {
    isValidated = false;
    return { msg: 'Role is required', isValidated };
  }
  if (formData.role !== 'admin' && formData.role !== 'employee') {
    isValidated = false;
    return { msg: 'Role is not valid', isValidated };
  }
  // email validation
  const emailPattern = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;

  if (formData.email === '') {
    isValidated = false;
    return { msg: 'Email is required', isValidated };
  }
  if (!emailPattern.test(formData.email)) {
    isValidated = false;
    return { msg: 'Email is not valid', isValidated };
  }
  // pasword validation
  if (formData.password === '') {
    isValidated = false;
    return { msg: 'Password is required', isValidated };
  }
  if (formData.password.length < 6) {
    isValidated = false;
    return { msg: 'At least 6 characters', isValidated };
  }
  isValidated = true;
  return { msg: 'validation for user complete', isValidated };
};

export const validateBlog = (formData) => {
  let isValidated = true;
  if (formData.name === '') {
    isValidated = false;
    return { msg: 'Name is required', isValidated };
  }
  if (formData.text === '') {
    isValidated = false;
    return { msg: 'Text is required', isValidated };
  }
  if (formData.text.match('["]')) {
    isValidated = false;
    return { msg: 'Text must not contain double quotes', isValidated };
  }
  if (formData.images === '') {
    isValidated = false;
    return { msg: 'Image is required', isValidated };
  }
  isValidated = true;
  return { msg: 'validation for blog complete', isValidated };
};

export const validateInstruction = (formData) => {
  let isValidated = true;
  if (formData.name === '') {
    isValidated = false;
    return { msg: 'Name is required', isValidated };
  }

  if (formData.difficulty === '') {
    isValidated = false;
    return { msg: 'Difficulty is required', isValidated };
  }
  if (
    /* eslint-disable operator-linebreak */
    formData.difficulty !== 'Easy' &&
    formData.difficulty !== 'Medium' &&
    formData.difficulty !== 'Hard'
  ) {
    isValidated = false;
    return { msg: 'Difficulty is not valid', isValidated };
  }

  if (formData.time === '') {
    isValidated = false;
    return { msg: 'Time is required', isValidated };
  }

  if (formData.makes === '') {
    isValidated = false;
    return { msg: 'Makes is required', isValidated };
  }

  if (formData.description === '') {
    isValidated = false;
    return { msg: 'Description is required', isValidated };
  }
  if (formData.description.match('["]')) {
    isValidated = false;
    return { msg: 'Description must not contain double quotes', isValidated };
  }

  // if (formData.ingredients === '') {
  //   isValidated = false;
  //   return { msg: 'Ingredients is required', isValidated };
  // }
  // if (formData.ingredients.match('["]')) {
  //   isValidated = false;
  //   return { msg: 'Ingredients must not contain double quotes', isValidated };
  // }

  // if (formData.text === '') {
  //   isValidated = false;
  //   return { msg: 'Text is required', isValidated };
  // }
  // if (formData.text.match('["]')) {
  //   isValidated = false;
  //   return { msg: 'Text must not contain double quotes', isValidated };
  // }
  if (formData.image === '') {
    isValidated = false;
    return { msg: 'Image is required', isValidated };
  }
  isValidated = true;
  return { msg: 'validation for instruction complete', isValidated };
};

export const validateProduct = (formData) => {
  let isValidated = true;
  if (formData.name === '') {
    isValidated = false;
    return { msg: 'Name is required', isValidated };
  }
  if (!formData.name.match('^[A-Za-z]{1,20}')) {
    isValidated = false;
    return { msg: 'Name is not valid', isValidated };
  }

  if (formData.weight === '') {
    isValidated = false;
    return { msg: 'Weight is required', isValidated };
  }

  if (formData.price === '') {
    isValidated = false;
    return { msg: 'Price is required', isValidated };
  }

  if (formData.description === '') {
    isValidated = false;
    return { msg: 'Description is required', isValidated };
  }
  if (formData.description.match('["]')) {
    isValidated = false;
    return { msg: 'Description must not contain double quotes', isValidated };
  }

  // if (formData.ingredients === '') {
  //   isValidated = false;
  //   return { msg: 'Ingredients is required', isValidated };
  // }
  // if (formData.ingredients.match('["]')) {
  //   isValidated = false;
  //   return { msg: 'Ingredients must not contain double quotes', isValidated };
  // }
  if (formData.image === '') {
    isValidated = false;
    return { msg: 'Image is required', isValidated };
  }
  isValidated = true;
  return { msg: 'validation for product complete', isValidated };
};
