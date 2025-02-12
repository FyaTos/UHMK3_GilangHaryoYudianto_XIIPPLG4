const Rujak = require('../models/Rujak');
 
exports.getAllRujak = async (req, res) => {
  try {
    const rujakList = await Rujak.find();
    res.status(200).json(rujakList);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data rujak.', error });
  }
};
 
exports.getRujakById = async (req, res) => {
  try {
    const rujak = await Rujak.findById(req.params.id);
    if (!rujak) {
      return res.status(404).json({ message: 'Rujak tidak ditemukan!' });
    }
    res.status(200).json(rujak);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data rujak.', error });
  }
};
 
exports.createRujak = async (req, res) => {
  try {
    const { namaRujak, bahan, harga, jenisRujak, stok   } = req.body;
    const newRujak = new Rujak({ namaRujak, bahan, harga,  jenisRujak, stok});
    await newRujak.save();
    res.status(201).json({ message: 'Rujak berhasil ditambahkan!', data: newRujak });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menambahkan rujak.', error });
  }
};
 
exports.updateRujak = async (req, res) => {
  try {
    const updatedRujak = await Rujak.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRujak) {
      return res.status(404).json({ message: 'Rujak tidak ditemukan!' });
    }
    res.status(200).json({ message: 'Rujak berhasil diperbarui!', data: updatedRujak });
  } catch (error) {
    res.status(500).json({ message: 'Gagal memperbarui rujak.', error });
  }
};
 
exports.deleteRujak = async (req, res) => {
  try {
    const deletedRujak = await Rujak.findByIdAndDelete(req.params.id);
    if (!deletedRujak) {
      return res.status(404).json({ message: 'Rujak tidak ditemukan!' });
    }
    res.status(200).json({ message: 'Rujak berhasil dihapus!', data: deletedRujak });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menghapus rujak.', error });
  }
};
