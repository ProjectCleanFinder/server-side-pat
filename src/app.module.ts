import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Poster } from './Poster/poster.entity';
import { PosterModule } from './Poster/poster.module';
import { Role } from './Role/role.entity';
import { User } from './User/user.entity';
import { UsersModule } from './User/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'diseñodepatrones',
      database: 'dp_server',
      entities: [User, Role, Poster],
      synchronize: true,
      dropSchema: true,
    }),
    UsersModule,
    PosterModule 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
