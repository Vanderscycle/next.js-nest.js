import { existsSync } from 'fs';
import { resolve } from 'path';

export function getEnvPath(envFilePath: string): string {
  // const env: string | undefined = process.env.NODE_ENV;
  const fallback: string = resolve(`./common/envs/locahost.env`);
  let filePath: string = resolve(envFilePath);

  if (!existsSync(filePath)) {
    filePath = fallback;
  }
  console.log(`[ENV] selected env ${envFilePath}`);
  console.log(`[ENV] loaded file ${filePath}`);

  return filePath;
}
