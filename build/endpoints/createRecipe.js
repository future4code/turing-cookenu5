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
exports.createRecipe = void 0;
const RecipeDatabase_1 = require("../data/RecipeDatabase");
const UserDatabase_1 = require("../data/UserDatabase");
exports.createRecipe = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const userDb = new UserDatabase_1.UserDatabase();
    const recipeDb = new RecipeDatabase_1.RecipeDatabase();
    try {
        const user = yield userDb.getUserByEmail(req.body.user_email);
        yield recipeDb.createRecipe(user.id, req.body.name, req.body.recipe_description, req.body.creation_date);
        resp.status(200).send();
    }
    catch (error) {
        resp.status(400).send(error);
    }
});
//# sourceMappingURL=createRecipe.js.map