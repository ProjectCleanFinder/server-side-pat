import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Entry } from './entities/Entry/entry.entity';
import { Role } from './entities/Role/role.entity';
import { RoleModule } from './entities/Role/role.module';
import { User } from './entities/User/user.entity';
import { UserModule } from './entities/User/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'diseñodepatrones',
      database: 'dp_server',
      entities: [User, Role, Entry],
      synchronize: true,
      dropSchema: true,
    }),
    UserModule,
    RoleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
