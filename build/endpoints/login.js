"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const BaseDatabase_1 = require("../data/BaseDatabase");
const UserDatabase_1 = require("../data/UserDatabase");
const Authenticator_1 = require("../services/Authenticator");
const HashManager_1 = require("../services/HashManager");
exports.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = {
            email: req.body.email,
            password: req.body.password
        };
        if (!userData.email || !userData.password) {
            throw new Error('Inser all required information');
        }
        const userDatabase = new UserDatabase_1.UserDatabase();
        const user = yield userDatabase.getUserByEmail(userData.email);
        const hashManager = new HashManager_1.HashManager();
        const isPasswordCorrect = yield hashManager.compare(userData.password, user.password);
        if (!isPasswordCorrect) {
            throw new Error('Email or password incorrect');
        }
        const authenticator = new Authenticator_1.Authenticator();
        const token = authenticator.generateToken({
            id: user.id,
            role: user.role
        });
        res.status(200).send({
            message: 'User successfully logged in',
            token
        });
    }
    catch (e) {
        res.status(400).send({
            message: e.message
        });
    }
    finally {
        BaseDatabase_1.BaseDatabase.destroyConnection();
    }
});
//# sourceMappingURL=login.js.map