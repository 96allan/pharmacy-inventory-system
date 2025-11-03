import { Request, Response } from 'express';
import Purchase from '../models/Purchase';
import Medicine from '../models/Medicine';

export const purchaseController = {
  createPurchase: async (req: Request, res: Response) => {
    try {
      const { medicine: medicineId, supplier, quantity, unitPrice, invoiceNumber, batchNumber } = req.body;
      const totalAmount = quantity * unitPrice;

      // Create purchase record
      const purchase = await Purchase.create({ medicine: medicineId, supplier, quantity, unitPrice, totalAmount, invoiceNumber, batchNumber });

      // Update medicine stock
      const medicine = await Medicine.findById(medicineId);
      if (medicine) {
        medicine.quantity = medicine.quantity + quantity;
        await medicine.save();
      }

      res.status(201).json(purchase);
    } catch (error: any) {
      if (error.code === 11000) {
        return res.status(409).json({ error: 'Invoice number must be unique' });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getPurchaseById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const purchase = await Purchase.findById(id).populate('medicine').populate('supplier');
      if (!purchase) return res.status(404).json({ error: 'Purchase not found' });
      res.status(200).json(purchase);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getAllPurchases: async (req: Request, res: Response) => {
    try {
      const purchases = await Purchase.find().populate('medicine').populate('supplier');
      res.status(200).json(purchases);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};