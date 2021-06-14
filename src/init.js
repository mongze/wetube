import 'dotenv/config';
import './db';
import './models/Video';
import './models/User';
import app from './app';

const PORT = 4000;

const handleListening = () => console.log(`✅ Listening on http://localhost:${PORT}`);

app.listen(PORT, handleListening);
