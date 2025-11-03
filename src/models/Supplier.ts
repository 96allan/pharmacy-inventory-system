import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactPerson: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Medicine' }],
  rating: { type: Number, default: 0, min: 0, max: 5 },
  lastOrderDate: { type: Date },
  paymentTerms: { type: String },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

// Create indexes for frequently queried fields
supplierSchema.index({ name: 1 });
supplierSchema.index({ email: 1 }, { unique: true });

export const Supplier = mongoose.model('Supplier', supplierSchema);
export default Supplier;