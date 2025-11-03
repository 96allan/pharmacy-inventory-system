import { Router } from 'express';
import { medicineController } from '../controllers/medicineController';

const router = Router();

// GET all medicines
router.get('/', medicineController.getAllMedicines);

// GET medicine by ID
router.get('/:id', medicineController.getMedicineById);

// POST new medicine
router.post('/', medicineController.createMedicine);

// PUT update medicine
router.put('/:id', medicineController.updateMedicine);

// DELETE medicine
router.delete('/:id', medicineController.deleteMedicine);

// GET low stock medicines
router.get('/check/low-stock', medicineController.checkLowStock);

// GET expiring medicines
router.get('/check/expiring', medicineController.checkExpiring);

export default router;