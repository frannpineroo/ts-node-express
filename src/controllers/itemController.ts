import type { Request, Response, NextFunction } from "express";
import { items } from "../models/item.js";
import type { Item } from "../models/item.js";

// Crear un item
export const createItem = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body;
        const newItem: Item = {id: Date.now(), name};
        items.push(newItem);
        res.status(201).json(newItem);
    } catch (error) {
        next(error);
    }
};

// Leer todos los items
export const getItems = (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(items);
    } catch (error) {
        next(error);
    }
};

// Leer un solo item por ID
export const getItemById = (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id, 10);
        const item = items.find((i) => i.id === id);
        if (!item) {
            res.status(404).json({ message: "Item no encontrado" });
            return;
        }
        res.json(item);
    } catch (error) {
        next(error);
    }
};

// Actualizar un item por ID
export const updateItem = (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id, 10);
        const { name } = req.body;
        const itemIndex = items.findIndex((i) => i.id === id);
        if (itemIndex === -1) {
            res.status(404).json({ message: "Item no encontrado" });
            return;
        }
        items[itemIndex].name = name;
        res.json(items[itemIndex]);
    } catch (error) {
        next(error);
    }
};

// Eliminar un item por ID
export const deleteItem = (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id, 10);
        const itemIndex = items.findIndex((i) => i.id === id);
        if (itemIndex === -1) {
            res.status(404).json({ message: 'Item not found' });
            return;
        }
        const deleteItem = items.splice(itemIndex, 1)[0];
        res.json(deleteItem);
    } catch (error) {
        next(error);
    }
};