import { OnlyLetters } from "../interfaces/DTOs/clientDTOs";

export const validateEmail = (email: string) => {
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
    throw Error("Invalid email");
};

export const validateOnlyLetters = (params: OnlyLetters) => {
  for (const key in params) {
    if (!/^[a-zA-ZñÑ\s]+$/.test(params[key as keyof OnlyLetters]))
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

export const validateCompany = (company: string) => {
  if (!/^[a-zA-ZñÑ0-9 ]+$/.test(company))
    throw Error("Field company must contain only letters and numbers");
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
