import mongoose from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/wetube', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
// mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
// access about connection between server and db server

const db = mongoose.connection;

const handleOpen = () => console.log('✅ Connected to DB');
const handleError = (error) => console.log('❌ DB Error', error);
db.on('error', handleError); // 여러번 이벤트 발생
db.once('open', handleOpen); // once 한번만 발생
