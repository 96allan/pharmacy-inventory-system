import { Request, Response } from 'express';
import Supplier from '../models/Supplier';

export const supplierController = {
  // Get all suppliers
  getAllSuppliers: async (req: Request, res: Response) => {
    try {
      const suppliers = await Supplier.find().populate('products');
      res.status(200).json(suppliers);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Get supplier by ID
  getSupplierById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const supplier = await Supplier.findById(id).populate('products');
      if (!supplier) {
        return res.status(404).json({ error: 'Supplier not found' });
      }
      res.status(200).json(supplier);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Create new supplier
  createSupplier: async (req: Request, res: Response) => {
    try {
      const supplierData = req.body;
      const supplier = await Supplier.create(supplierData);
      res.status(201).json(supplier);
    } catch (error: any) {
      if (error.code === 11000) {
        return res.status(409).json({ error: 'Supplier with this email already exists' });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Update supplier
  updateSupplier: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const supplier = await Supplier.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
      if (!supplier) {
        return res.status(404).json({ error: 'Supplier not found' });
      }
      res.status(200).json(supplier);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Delete supplier
  deleteSupplier: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const supplier = await Supplier.findByIdAndDelete(id);
      if (!supplier) {
        return res.status(404).json({ error: 'Supplier not found' });
      }
      res.status(200).json({ message: 'Supplier deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Get supplier performance metrics
  getSupplierMetrics: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      // Example metric: number of purchases, last order date, average delivery time
      const purchasesCount = await (await import('../models/Purchase')).Purchase.countDocuments({ supplier: id });
      const lastPurchase = await (await import('../models/Purchase')).Purchase.findOne({ supplier: id }).sort({ orderDate: -1 });

      res.status(200).json({
        supplierId: id,
        purchasesCount,
        lastOrderDate: lastPurchase?.orderDate || null
      });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};