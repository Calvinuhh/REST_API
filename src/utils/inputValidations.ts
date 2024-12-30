import { OnlyLetters } from "../interfaces/DTOs/clientDTOs";

export const validateEmail = (email: string) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!regex.test(email)) throw Error("Invalid email");
};

export const validateOnlyLetters = (params: OnlyLetters) => {
  const regex = /^[a-zA-ZñÑ\s]+$/;

  for (const key in params) {
    if (!regex.test(params[key as keyof OnlyLetters]))
      throw Error(
        `Field ${key} must contain only letters, no numbers or special characters`
      );
  }
};

export const validateCompany = (company: string) => {
  const regex = /^[a-zA-ZñÑ0-9 ]+$/;

  if (!regex.test(company))
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
  const regex = /^[0-9+\s]+$/;

  if (!regex.test(phone.toString())) throw Error("Invalid phone number");
};


export const validatePhoneMaxLength = (phone: string) => { 

  
}