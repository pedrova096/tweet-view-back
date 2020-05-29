const mongoose = require('mongoose');

module.exports.connect =  async (URL_DB) => {
  try {
    await mongoose.connect(URL_DB,{
      useNewUrlParser: true
    });
    console.log('DB coffee conect');
  } catch  {
    console.error('MONGO ERROR: something went wrong!')    
  }
}