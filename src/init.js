import app from './app';

const PORT = 4000;

console.log(process.cwd());

const handleListening = () => console.log(`✅ Listening on http://localhost:${PORT}`);

app.listen(PORT, handleListening);
