export const validateEmail = (email: string) => {
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
    throw Error("Invalid email");
};

export const validateOnlyLetters = (params: {
  name: string;
  lastname: string;
}) => {
  for (const key in params) {
    if (!/^[a-zA-ZñÑ\s]+$/.test(params[key as keyof typeof params]))
      throw Error(
        `Field ${key} must contain only letters, no numbers or special characters`
      );
  }
};

export const validateStrings = (param: string, input: string) => {
  if (!/^[a-zA-ZñÑ\s]+$/.test(param))
    throw Error(
      `Field ${input} must contain only letters, no numbers or special characters`
    );
};

export const validateLengthFromTo = (
  value: string,
  input: string,
  min: number,
  max: number
) => {
  if (value.length < min || value.length > max)
    throw Error(`Field ${input} must be between ${min} and ${max} characters`);
};

export const validatePhone = (phone: string) => {
  if (!/^[0-9+\s]+$/.test(phone.toString()))
    throw Error("Invalid phone number");
};

export const validatePhoneMaxLength = (phone: string) => {
  if (phone.length > 20)
    throw Error("Phone number must be less than 20 characters");
};

export const validateOnlyNumbers = (param: number, input: string) => {
  if (!/^[0-9]+$/.test(String(param)))
    throw Error(`Field ${input} must contain only numbers`);
};

export const validateStringsAndDot = (param: string, input: string) => {
  if (!/^[a-zA-ZñÑ\s.\d]+$/.test(param))
    throw Error(
      `Field ${input} must contain only letters and numbers, no special characters`
    );
};

export const securePassword = (
  param: string,
  input: string,
  minLength: number
) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;

  if (!regex.test(param))
    throw Error(
      `${input} must be at least ${minLength} characters long, upper and lower case, one number and one special character.`
    );
};
