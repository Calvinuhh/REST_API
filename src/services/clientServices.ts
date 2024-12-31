import { CreateClientDTO, UpdateClient } from "../interfaces/DTOs/clientDTOs";
import Client from "../models/Client";
import { validateDuplicateEmail } from "../utils/validateDuplicateEmail";
import formatName from "../utils/formatNames";

export const createClient = async (data: CreateClientDTO) => {
  const { name, lastname, email, company, phone } = data;

  await validateDuplicateEmail(email);

  const newClient = Client.create({
    name: formatName(name),
    lastname: formatName(lastname),
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

export const getClientById = async (_id: string) => {
  const client = await Client.findById(_id);

  if (!client) throw Error("Client not found");

  return client;
};

export const deleteClientById = async (_id: string) => {
  const client = await Client.findByIdAndDelete(_id);

  if (!client) throw Error("Client not found");

  return `${client.name} ${client.lastname} deleted`;
};



export const updateClient = async (data: UpdateClient) => {
  const { _id, name, lastname, company, phone } = data;

  const newData: Partial<CreateClientDTO> = {};

  if (name) newData.name = formatName(name);
  if (lastname) newData.lastname = formatName(lastname);
  if (company) newData.company = company;
  if (phone) newData.phone = phone;

  if (Object.keys(newData).length === 0) throw Error("No data to update");

  const newClient = await Client.findByIdAndUpdate(_id, newData, {
    new: true,
  }).select(
    `${name && "name"} ${lastname && "lastname"} ${company && "company"} ${
      phone && "phone"
    }`
  );

  if (!newClient) throw Error("Client not found");

  return newClient;
};
