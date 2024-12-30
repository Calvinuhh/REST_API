import Client from "../models/Client";

export const validateDuplicateEmail = async (email: string) => {
  const client = await Client.findOne({ email });

  if (client) throw Error("Email already in use");
};
