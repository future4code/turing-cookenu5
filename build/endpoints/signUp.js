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
exports.signUp = void 0;
const BaseDatabase_1 = require("../data/BaseDatabase");
const UserDatabase_1 = require("../data/UserDatabase");
const Authenticator_1 = require("../services/Authenticator");
const HashManager_1 = require("../services/HashManager");
const IdGenerator_1 = require("../services/IdGenerator");
exports.signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        };
        if (!userData.name || !userData.email || !userData.password || !userData.role) {
            throw new Error('Insert all required information');
        }
        const idGenerator = new IdGenerator_1.IdGenerator();
        const id = idGenerator.generateId();
        const hashManager = new HashManager_1.HashManager();
        const hashedPassword = yield hashManager.hash(userData.password);
        const userDatabase = new UserDatabase_1.UserDatabase();
        yield userDatabase.createUser(id, userData.name, userData.email, hashedPassword, userData.role);
        const authenticator = new Authenticator_1.Authenticator();
        const token = authenticator.generateToken({
            id,
            role: userData.role
        });
        res.status(200).send({
            message: 'User created successfully',
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
//# sourceMappingURL=signUp.js.map