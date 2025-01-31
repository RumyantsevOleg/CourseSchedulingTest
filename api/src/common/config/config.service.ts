import * as dotenv from 'dotenv'
import * as fs from 'fs'

export class ConfigService {
  private readonly envConfig: { [key: string]: string }

  constructor() {
    this.envConfig = dotenv.parse(fs.readFileSync('.env'))
    process.env.ASSETS_PATH = this.getString('ASSETS_PATH')
  }

  public getString(key: string): string {
    return this.envConfig[key]
  }

  public getNumber(key: string): number {
    return Number(this.envConfig[key])
  }

  public getBoolean(key: string): boolean {
    return this.envConfig[key] === 'true'
  }
}
