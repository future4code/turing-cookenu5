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
exports.getAllUsers = void 0;
const UserDatabase_1 = require("../data/UserDatabase");
const Authenticator_1 = require("../services/Authenticator");
exports.getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        const authenticator = new Authenticator_1.Authenticator();
        const authenticationData = authenticator.getData(token);
        if (authenticationData.role !== 'ADMIN') {
            throw new Error('Unathorized User');
        }
        const userDatabase = new UserDatabase_1.UserDatabase();
        const user = yield userDatabase.getUserById(authenticationData.id);
        if (!user) {
            throw new Error('User not found');
        }
        const students = yield userDatabase.getAllUsers();
        res.status(200).send(students);
    }
    catch (e) {
        res.status(400).send({
            message: e.message
        });
    }
});
//# sourceMappingURL=getAllUsers.js.map