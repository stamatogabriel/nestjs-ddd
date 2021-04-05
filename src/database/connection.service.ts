import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseConnectionService {
  private readonly connectionString: string;

  constructor(private readonly config: ConfigService) {
    this.connectionString = this.config.get<string>('DB_CONNECTION_STRING');
  }

  public get = (): string => this.connectionString;
}
