import { Router } from 'express';
import { supplierController } from '../controllers/supplierController';

const router = Router();

// GET all suppliers
router.get('/', supplierController.getAllSuppliers);

// GET supplier by ID
router.get('/:id', supplierController.getSupplierById);

// POST new supplier
router.post('/', supplierController.createSupplier);

// PUT update supplier
router.put('/:id', supplierController.updateSupplier);

// DELETE supplier
router.delete('/:id', supplierController.deleteSupplier);

// GET supplier metrics
router.get('/:id/metrics', supplierController.getSupplierMetrics);

export default router;