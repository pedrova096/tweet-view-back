import mongoose from 'mongoose';

export async function connect(URL_DB) {
  try {
    await mongoose.connect(URL_DB,{
      useNewUrlParser: true
    });
    console.log('DB coffee conect');
  } catch  {
    console.error('something went wrong!')    
  }
}