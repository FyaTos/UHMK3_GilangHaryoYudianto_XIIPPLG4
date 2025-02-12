const mongoose = require('mongoose');

const RujakSchema = new mongoose.Schema({
  namaRujak: {
    type: String,
    required: true, 
    trim: true, 
  },
  jenisRujak: {
    type: String,
    required: true,
    enum: ['Buah', 'Sayur', 'Campur'], // Pilihan jenis rujak
  },
  bahan: {
    type: [String],  
    required: true,
  },
  harga: {
    type: Number,
    required: true,
    min: 1000,  
  },
  tanggalDibuat: {
    type: Date,
    default: Date.now,  
  }
});

const Rujak = mongoose.model('Rujak', RujakSchema);

module.exports = Rujak;
