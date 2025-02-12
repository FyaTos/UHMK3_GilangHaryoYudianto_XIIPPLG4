const connectToMongoDB = require('./config/db');

async function main() {
  const isConnected = await connectToMongoDB();  
  
  if (isConnected) {
    console.log(' Koneksi ke database berhasil!');
  } else {
    console.log(' Koneksi ke database gagal. ');
    process.exit(1);  
  }
}

main();
