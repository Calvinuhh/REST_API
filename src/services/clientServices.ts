import {
  CreateClientDTO,
  UpdateClientDTO,
} from "../interfaces/DTOs/clientDTOs";
import Client from "../models/Client";
import { validateDuplicateEmail } from "../utils/validateDuplicateEmail";
import formatName from "../utils/formatNames";
import { Types } from "mongoose";

export const createClient = async (data: CreateClientDTO) => {
  const { name, lastname, email, phone, userId } = data;

  await validateDuplicateEmail(email);

  const newClient = Client.create({
    name: formatName(name),
    lastname: formatName(lastname),
    email,
    phone,
    userId,
  });

  return newClient;
};

export const getAllClients = async (userId: Types.ObjectId) => {
  const clients = await Client.find({ userId, active: true }).select("-userId");

  if (clients.length === 0) throw Error("No Clients found");

  return clients;
};

export const getClientById = async (_id: string, userId: Types.ObjectId) => {
  const client = await Client.findOne({ _id, userId, active: true }).select(
    "-userId"
  );

  if (!client) throw Error("Client not found");

  return client;
};

export const updateClient = async (data: UpdateClientDTO) => {
  const { _id, name, lastname, phone, userId } = data;

  const newData: Partial<CreateClientDTO> = {};

  if (name) newData.name = formatName(name);
  if (lastname) newData.lastname = formatName(lastname);
  if (phone) newData.phone = phone;

  if (Object.keys(newData).length === 0) throw Error("No data to update");

  const newClient = await Client.findOneAndUpdate(
    { _id, userId, active: true },
    newData,
    {
      new: true,
    }
  );

  if (!newClient) throw Error("Client not found");

  return newClient;
};

export const deleteClientById = async (_id: string, userId: Types.ObjectId) => {
  const client = await Client.findOneAndUpdate(
    { _id, userId, active: true },
    { active: false, email: null }
  );

  if (!client) throw Error("Client not found");

  return `${client.name} ${client.lastname} deleted`;
};
