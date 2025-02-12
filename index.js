const express = require('express');
const connectDB = require('./config/db');  
const rujakRoutes = require('./routes/rujakRoutes');
const orderRoutes = require('./routes/orderRoutes');  

const app = express();
const PORT = 5000;
 
app.use(express.json());
 
connectDB();
 
app.use('/rujak', rujakRoutes);
app.use('/order', orderRoutes);  

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
