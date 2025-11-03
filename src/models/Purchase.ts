import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema({
  medicine: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true },
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
  deliveryDate: { type: Date },
  status: {
    type: String,
    enum: ['pending', 'delivered', 'cancelled'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  invoiceNumber: { type: String, required: true, unique: true },
  batchNumber: { type: String, required: true }
}, {
  timestamps: true
});

// Create indexes for frequently queried fields
purchaseSchema.index({ invoiceNumber: 1 }, { unique: true });
purchaseSchema.index({ medicine: 1 });
purchaseSchema.index({ supplier: 1 });
purchaseSchema.index({ orderDate: 1 });

export const Purchase = mongoose.model('Purchase', purchaseSchema);
export default Purchase;