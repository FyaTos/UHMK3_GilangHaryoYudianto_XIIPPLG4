const OrderRujak = require('../models/OrderRujak');
const Rujak = require('../models/Rujak');
 
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await OrderRujak.find().populate('rujak', 'namaRujak harga');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data order.', error });
  }
};
 
exports.getOrderByNamaRujak = async (req, res) => {
  try {
    const { namaRujak } = req.params;
    const rujak = await Rujak.findOne({ namaRujak });
    if (!rujak) return res.status(404).json({ message: 'Rujak tidak ditemukan!' });

    const orders = await OrderRujak.find({ rujak: rujak._id }).populate('rujak', 'namaRujak harga');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data order.', error });
  }
};
 
exports.createOrder = async (req, res) => {
  try {
    const { rujakId, jumlah } = req.body;
    const rujak = await Rujak.findById(rujakId);
    if (!rujak) return res.status(404).json({ message: 'Rujak tidak ditemukan!' });

    const totalHarga = rujak.harga * jumlah;
    const newOrder = new OrderRujak({
      rujak: rujakId,
      jumlah,
      totalHarga,
      status: 'selesai',
    });

    await newOrder.save();
    
    res.status(201).json({
      message: 'Order berhasil dibuat!',
      data: {
        _id: newOrder._id,
        namaRujak: rujak.namaRujak, 
        jumlah: newOrder.jumlah,
        totalHarga: newOrder.totalHarga,
        status: newOrder.status,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Gagal membuat order.', error });
  }
};
 
exports.updateOrder = async (req, res) => {
  try {
    const { jumlah } = req.body;
    const order = await OrderRujak.findById(req.params.id).populate('rujak', 'namaRujak harga');

    if (!order) return res.status(404).json({ message: 'Order tidak ditemukan!' });

    order.jumlah = jumlah;
    order.totalHarga = order.rujak.harga * jumlah;
    await order.save();

    res.status(200).json({
      message: 'Order berhasil diperbarui!',
      data: {
        _id: order._id,
        namaRujak: order.rujak.namaRujak,  
        jumlah: order.jumlah,
        totalHarga: order.totalHarga,
        status: order.status,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Gagal memperbarui order.', error });
  }
};
 
exports.deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await OrderRujak.findByIdAndDelete(req.params.id);
    if (!deletedOrder) return res.status(404).json({ message: 'Order tidak ditemukan!' });

    res.status(200).json({ message: 'Order berhasil dihapus!', data: deletedOrder });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menghapus order.', error });
  }
};
