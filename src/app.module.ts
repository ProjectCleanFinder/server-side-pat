import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './User/user.entity';
import { UsersModule } from './User/user.module';
import TYPEORM_MYSQL_CONFIG from '../env.config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'diseñodepatrones',
      database: 'users',
      entities: [User],
      synchronize: true,
      dropSchema: true,
    }),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
