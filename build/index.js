"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const login_1 = require("./endpoints/login");
const signUp_1 = require("./endpoints/signUp");
const getAllUsers_1 = require("./endpoints/getAllUsers");
const getUser_1 = require("./endpoints/getUser");
const createRecipe_1 = require("./endpoints/createRecipe");
dotenv_1.default.config();
const app = express_1.default();
app.use(express_1.default.json());
app.post('/user/signup', signUp_1.signUp);
app.post('/user/login', login_1.login);
app.get('/users', getAllUsers_1.getAllUsers);
app.get('/user/:id', getUser_1.getUser);
app.post('/user/recipe', createRecipe_1.createRecipe);
const server = app.listen(process.env.PORT || 3000, () => {
    if (server) {
        const address = server.address();
        console.log(`Server is running in http://localhost: ${address.port}`);
    }
    else {
        console.error('Failure upon starting server');
    }
});
//# sourceMappingURL=index.js.map