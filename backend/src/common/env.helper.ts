import { existsSync } from 'fs';
import { resolve } from 'path';

export function getEnvPath(filename: string): string {
  // const env: string | undefined = process.env.NODE_ENV;
  const fallback: string = resolve(`./envs/development.env`);
  let filePath: string = resolve(`./envs/${filename}.env`);

  if (!existsSync(filePath)) {
    filePath = fallback;
  }
  console.log(`[ENV] loaded file ${filePath} - ${fallback}`);

  return filePath;
}
