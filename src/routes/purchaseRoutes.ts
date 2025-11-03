import { Router } from 'express';
import { purchaseController } from '../controllers/purchaseController';
import { body, validationResult } from 'express-validator';

const router = Router();

const validate = (validations: any[]) => async (req: any, res: any, next: any) => {
  await Promise.all(validations.map((v) => v.run(req)));
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  return res.status(400).json({ errors: errors.array() });
};

router.post(
  '/',
  validate([
    body('medicine').isMongoId(),
    body('supplier').isMongoId(),
    body('quantity').isInt({ min: 1 }),
    body('unitPrice').isFloat({ gt: 0 }),
    body('invoiceNumber').isString().notEmpty(),
    body('batchNumber').isString().notEmpty()
  ]),
  purchaseController.createPurchase
);

router.get('/', purchaseController.getAllPurchases);
router.get('/:id', purchaseController.getPurchaseById);

export default router;