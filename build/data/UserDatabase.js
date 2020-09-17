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
exports.UserDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class UserDatabase extends BaseDatabase_1.BaseDatabase {
    createUser(id, name, email, password, role) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getConnection()
                .insert({
                id,
                name,
                email,
                password,
                role
            })
                .into(UserDatabase.TABLE_NAME);
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getConnection()
                .select('*')
                .from(UserDatabase.TABLE_NAME)
                .where({ email });
            return result[0];
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getConnection()
                .select('name', 'email', 'role')
                .from(UserDatabase.TABLE_NAME)
                .where({ id });
            return result[0];
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getConnection()
                .select('id', 'name', 'email', 'role')
                .from(UserDatabase.TABLE_NAME)
                .where({ role: 'NORMAL' });
            return result;
        });
    }
}
exports.UserDatabase = UserDatabase;
UserDatabase.TABLE_NAME = 'cookenu_users';
//# sourceMappingURL=UserDatabase.js.map