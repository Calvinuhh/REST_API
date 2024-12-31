import { Types } from "mongoose";

import { Request, Response } from "express";
import { CreateClientDTO } from "../interfaces/DTOs/clientDTOs";
import {
  createClient,
  getAllClients,
  deleteClientById,
  getClientById,
  updateClient,
} from "../services/clientServices";

export const createClientController = async (req: Request, res: Response) => {
  try {
    const { name, lastname, email, company, phone }: CreateClientDTO = req.body;

    const newClient = await createClient({
      name,
      lastname,
      email,
      company,
      phone,
    });

    if (newClient) res.status(201).json(newClient);
  } catch (error) {
    const err = error as Error;
    res.status(400).json(err.message);
  }
};

export const getClientsController = async (req: Request, res: Response) => {
  try {
    const clients = await getAllClients();

    res.status(200).json(clients);
  } catch (error) {
    const err = error as Error;
    res.status(400).json(err.message);
  }
};

export const getClientByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const client = await getClientById(id);
    res.status(200).json(client);
  } catch (error) {
    const err = error as Error;
    res.status(404).json(err.message);
  }
};

export const updateClientController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, lastname, company, phone }: CreateClientDTO = req.body;

    const newClient = await updateClient({
      _id: new Types.ObjectId(id),
      name,
      lastname,
      company,
      phone,
    });

    res.status(200).json(newClient);
  } catch (error) {
    const err = error as Error;
    res.status(404).json(err.message);
  }
};

export const deleteClientByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const client = await deleteClientById(id);

    res.status(200).json(client);
  } catch (error) {
    const err = error as Error;
    res.status(404).json(err.message);
  }
};
