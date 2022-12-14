export const validatePassword = (requestedPassword: string) => {
  if (requestedPassword === '') {
    return false;
  } else if (requestedPassword.length <= 6) {
    return false;
  } else {
    return true;
  }
};

export const validateEmail = (requestedEmail: string) => {
  if (requestedEmail === '') {
    return false;
  } else if (requestedEmail.length <= 6) {
    return false;
  } else {
    return true;
  }
};

export const validateName = (requestedName: string) => {
  if (requestedName === '') {
    return false;
  } else if (requestedName.length <= 3) {
    return false;
  } else {
    return true;
  }
};
