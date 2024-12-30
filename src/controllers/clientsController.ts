import { Request, Response } from "express";
import { CreateClientDTO } from "../interfaces/DTOs/clientDTOs";
import {
  createClient,
  getAllClients,
  deleteClientById,
} from "../services/clientServices";

export const createClientController = async (req: Request, res: Response) => {
  try {
    const { name, lastname, email, company }: CreateClientDTO = req.body;

    const newClient = await createClient({
      name,
      lastname,
      email,
      company,
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

export const deleteClientController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const client = await deleteClientById(id);

    res.status(200).json(client);
  } catch (error) {
    const err = error as Error;
    res.status(404).json(err.message);
  }
};
