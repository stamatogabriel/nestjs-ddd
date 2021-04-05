import { Module } from '@nestjs/common';
import { DatabaseConnectionService } from './connection.service';

@Module({
  providers: [DatabaseConnectionService],
  exports: [DatabaseConnectionService],
})
export class DatabaseModule {}
