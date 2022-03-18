import { connect, connection } from 'mongoose';
import { MONGODB_URL } from '../config';

( async () => {
    const db = await connect(MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    console.log('Database connected to:', db.connection.name);
})();

connection.on('connected', () => {
    console.log('MongoDB is connected');
});

connection.on('error', (error) => {
    console.error(error);
});

connection.on('disconnected', () => {
    console.error('MongoDB is disconnected');
});

process.on('SIGINT', async() => {
    await connection.close(() => {
        process.exit(0);
    })
});