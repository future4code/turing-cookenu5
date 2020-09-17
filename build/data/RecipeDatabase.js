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
exports.RecipeDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class RecipeDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.table = "recipes";
    }
    createRecipe(id, name, recipe_description, creation_date) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getConnection().insert({ id, name, recipe_description, creation_date }).into(this.table);
            }
            catch (error) {
                throw new Error(error);
            }
            finally {
                BaseDatabase_1.BaseDatabase.destroyConnection();
            }
        });
    }
}
exports.RecipeDatabase = RecipeDatabase;
//# sourceMappingURL=RecipeDatabase.js.map