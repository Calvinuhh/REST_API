import { CreateClientDTO } from "../interfaces/DTOs/clientDTOs";
import Client from "../models/Client";
import { validateDuplicateEmail } from "../utils/validateDuplicateEmail";

export const createClient = async (data: CreateClientDTO) => {
  const { name, lastname, email, company, phone } = data;

  await validateDuplicateEmail(email);

  const newClient = Client.create({
    name,
    lastname,
    email,
    company,
    phone,
  });

  return newClient;
};

export const getAllClients = async () => {
  const clients = await Client.find();

  if (clients.length === 0) throw Error("No Clients found");

  return clients;
};

export const deleteClientById = async (id: string) => {
  const client = await Client.findByIdAndDelete(id);

  if (!client) throw Error("Client not found");

  return `${client.name} ${client.lastname} deleted`;
};
