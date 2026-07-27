import dotenv from 'dotenv';
import path from 'path';

export default function configDotenv() {
  const envPath = path.resolve(process.cwd(), '.env');
  
  const result = dotenv.config({ path: envPath });

  if (result.error) {
    console.error(`Erro ao carregar o arquivo .env em: ${envPath}`);
    throw result.error;
  }
}