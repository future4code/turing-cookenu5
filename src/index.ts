import dotenv from 'dotenv';
import express from 'express';
import { AddressInfo } from 'net';
import { login } from './endpoints/login';
import { signUp } from './endpoints/signUp';
import { getAllUsers } from './endpoints/getAllUsers';
import { getUser } from './endpoints/getUser';
import { createRecipe } from './endpoints/createRecipe';
import {fallowUser} from './endpoints/followUser'
import { getProfile } from './endpoints/getProfile';
import { deleteUser } from './endpoints/deleteUser';
import { deleteRecipe } from './endpoints/deleteRecipe';
import { refreshToken } from './endpoints/refreshToken';
import { getFeed } from './endpoints/getFeed';
import { getRecipe } from './endpoints/getRecipe';
import { unfollowUser } from './endpoints/unfollowUser';


dotenv.config();

const app = express();
app.use(express.json());

app.post('/user/signup', signUp);
app.post('/user/login', login);
app.post('/user/refresh', refreshToken);

app.get('/users', getAllUsers);
app.get('/user/profile', getProfile);
app.get('/user/feed', getFeed);

app.post('/user/:id/follow', fallowUser);

app.get('/recipes/:recipeId', getRecipe);
app.get('/user/:id', getUser);

app.post('/user/:id/recipe', createRecipe);

app.delete('/user/:id/unfollow/:followingId', unfollowUser);
app.delete('/user/:id/recipes/:recipeId/delete', deleteRecipe);
app.delete('/user/:id/delete', deleteUser);

const server = app.listen(process.env.PORT || 3000, () => {
  if(server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost: ${address.port}`)
  } else {
    console.error('Failure upon starting server')
  }
});

