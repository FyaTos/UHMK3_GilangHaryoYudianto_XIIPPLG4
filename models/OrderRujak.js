const mongoose = require('mongoose');

const OrderRujakSchema = new mongoose.Schema({
  rujak: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rujak',   
    required: true,
  },
  jumlah: {
    type: Number,
    required: true,
    min: 1,
  },
  totalHarga: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'selesai'],  
    default: 'pending',
  },
  tanggalPesan: {
    type: Date,
    default: Date.now,
  },
});
 
const OrderRujak = mongoose.models.OrderRujak || mongoose.model('OrderRujak', OrderRujakSchema);

module.exports = OrderRujak;
