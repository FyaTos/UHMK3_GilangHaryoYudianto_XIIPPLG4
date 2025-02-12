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
      const { rujakId, jumlah, cara_transaksi } = req.body;
      const rujak = await Rujak.findById(rujakId);
      if (!rujak) return res.status(404).json({ message: 'Rujak tidak ditemukan!' });
   
      if (jumlah > rujak.stok) {
        return res.status(400).json({ message: 'Jumlah pesanan melebihi stok yang tersedia!' });
      }
  
      if (!['Tunai', 'Transfer', 'E-Wallet'].includes(cara_transaksi)) {
        return res.status(400).json({ message: 'Metode transaksi tidak valid!' });
      }
   
      rujak.stok -= jumlah;
      await rujak.save();
  
      const newOrder = new OrderRujak({
        rujak: rujakId,
        jumlah,
        status: 'selesai',
        cara_transaksi,
      });
  
      await newOrder.save();
  
      res.status(201).json({
        message: 'Order berhasil dibuat!',
        data: {
          _id: newOrder._id,
          namaRujak: rujak.namaRujak,
          jumlah: newOrder.jumlah,
          status: newOrder.status,
          cara_transaksi: newOrder.cara_transaksi,
          stokTersisa: rujak.stok,  
        },
      });
    } catch (error) {
      res.status(500).json({ message: 'Gagal membuat order.', error });
    }
  };
  

 
exports.updateOrder = async (req, res) => {
    try {
      const { jumlah, cara_transaksi } = req.body;
      const order = await OrderRujak.findById(req.params.id).populate('rujak', 'namaRujak harga');
  
      if (!order) return res.status(404).json({ message: 'Order tidak ditemukan!' });
  
      if (jumlah) order.jumlah = jumlah;
      if (cara_transaksi) {
        if (!['Tunai', 'Transfer', 'E-Wallet'].includes(cara_transaksi)) {
          return res.status(400).json({ message: 'Metode transaksi tidak valid!' });
        }
        order.cara_transaksi = cara_transaksi;
      }
  
      await order.save();
  
      res.status(200).json({
        message: 'Order berhasil diperbarui!',
        data: {
          _id: order._id,
          namaRujak: order.rujak.namaRujak,
          jumlah: order.jumlah,
          status: order.status,
          cara_transaksi: order.cara_transaksi,
        },
      });
    } catch (error) {
      res.status(500).json({ message: 'Gagal memperbarui order.', error });
    }
  };
  
 
  exports.deleteOrder = async (req, res) => {
    try {
      const order = await OrderRujak.findById(req.params.id);
      if (!order) return res.status(404).json({ message: 'Order tidak ditemukan!' });
  
      const rujak = await Rujak.findById(order.rujak);
      if (rujak) {
        rujak.stok += order.jumlah;  
        await rujak.save();
      }
  
      await OrderRujak.findByIdAndDelete(req.params.id);
  
      res.status(200).json({
        message: 'Order berhasil dihapus!',
        data: {
          _id: order._id,
          namaRujak: rujak ? rujak.namaRujak : 'Data rujak tidak ditemukan',
          jumlah: order.jumlah,
          stokTersisa: rujak ? rujak.stok : 'Tidak ada data stok',
        },
      });
    } catch (error) {
      res.status(500).json({ message: 'Gagal menghapus order.', error });
    }
  };
  