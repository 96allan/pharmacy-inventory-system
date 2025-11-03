import { Request, Response } from 'express';
import Medicine from '../models/Medicine';

export const medicineController = {
  getAllMedicines: async (req: Request, res: Response) => {
    try {
      const medicines = await Medicine.find();
      res.status(200).json(medicines);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getMedicineById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const medicine = await Medicine.findById(id);
      if (!medicine) {
        return res.status(404).json({ error: "Medicine not found" });
      }
      res.status(200).json(medicine);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  createMedicine: async (req: Request, res: Response) => {
    try {
      const medicineData = req.body;
      const medicine = await Medicine.create(medicineData);
      res.status(201).json(medicine);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  updateMedicine: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const medicine = await Medicine.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );
      if (!medicine) {
        return res.status(404).json({ error: "Medicine not found" });
      }
      res.status(200).json(medicine);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  deleteMedicine: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const medicine = await Medicine.findByIdAndDelete(id);
      if (!medicine) {
        return res.status(404).json({ error: "Medicine not found" });
      }
      res.status(200).json({ message: "Medicine deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  checkLowStock: async (req: Request, res: Response) => {
    try {
      const lowStockMedicines = await Medicine.find({
        $expr: { $lte: ["$quantity", "$minimumStockLevel"] }
      });
      res.status(200).json(lowStockMedicines);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  checkExpiring: async (req: Request, res: Response) => {
    try {
      const threeMonthsFromNow = new Date();
      threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);
      
      const expiringMedicines = await Medicine.find({
        expiryDate: {
          $gte: new Date(),
          $lte: threeMonthsFromNow
        }
      });
      res.status(200).json(expiringMedicines);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};