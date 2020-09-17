import dotenv from 'dotenv';
import express from 'express';
import { AddressInfo } from 'net';
import { login } from './endpoints/login';
import { signUp } from './endpoints/signUp';
import { getAllUsers } from './endpoints/getAllUsers';
import { getUser } from './endpoints/getUser';
import { getProfile } from './endpoints/getProfile';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/users', getAllUsers);
app.post('/user/signup', signUp);
app.post('/user/login', login);
app.get('/user/profile', getProfile);
app.get('/user/:id', getUser);

const server = app.listen(process.env.PORT || 3000, () => {
  if(server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost: ${address.port}`)
  } else {
    console.error('Failure upon starting server')
  }
});

