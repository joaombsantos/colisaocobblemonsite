"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = configDotenv;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
function configDotenv() {
    const envPath = path_1.default.resolve(process.cwd(), '.env');
    const result = dotenv_1.default.config({ path: envPath });
    if (result.error) {
        console.error(`Erro ao carregar o arquivo .env em: ${envPath}`);
        throw result.error;
    }
}
//# sourceMappingURL=dotenv.js.map