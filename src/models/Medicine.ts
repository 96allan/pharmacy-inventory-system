import mongoose from 'mongoose';

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  manufacturer: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  expiryDate: { type: Date, required: true },
  category: { type: String, required: true },
  batchNumber: { type: String, required: true },
  location: { type: String, required: true },
  minimumStockLevel: { type: Number, required: true },
  reorderPoint: { type: Number, required: true },
  unitOfMeasure: { type: String, required: true },
  isControlledSubstance: { type: Boolean, default: false },
}, {
  timestamps: true
});

// Create indexes for frequently queried fields
medicineSchema.index({ name: 1 });
medicineSchema.index({ batchNumber: 1 });
medicineSchema.index({ expiryDate: 1 });

export const Medicine = mongoose.model('Medicine', medicineSchema);
export default Medicine;