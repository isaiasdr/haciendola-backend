import * as path from 'path';
import * as fs from 'fs';
import {
  ForbiddenException,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { parse } from 'csv-parse';

import { envs } from 'src/config';
import { AppModes } from 'src/shared/interfaces/app-modes.interface';
import { users } from './constants/user';

@Injectable()
export class SeedService extends PrismaClient implements OnModuleInit {
  private logger = new Logger('SeedService');

  onModuleInit() {
    this.$connect();
    this.logger.log('DB Connected');
  }

  private mapCsvDataToUser(row: any[]): any {
    return {
      handle: row.at(0),
      title: row.at(1),
      description: row.at(2),
      sku: row.at(3),
      grams: Number(row.at(4)),
      stock: Number(row.at(5)),
      price: Number(row.at(6)),
      comparePrice: Number(row.at(7)),
      barcode: row.at(8),
    };
  }

  private async readCsvData(userId: number) {
    const dataSource = path.join(
      process.cwd(),
      'data/productos_prueba_tecnica.csv',
    );

    return new Promise((res, rej) => {
      fs.createReadStream(dataSource)
        .pipe(parse({ delimiter: ',', from_line: 2 }))
        .on('data', async (row) => {
          const product = this.mapCsvDataToUser(row);

          await this.product.create({
            data: {
              ...product,
              userId,
            },
          });
        })
        .on('error', (error) => {
          this.logger.error(error);
        })
        .on('end', () => {
          res(true);
        });
    });
  }

  async runSeed() {
    if (envs.app_mode === AppModes.PROD)
      throw new ForbiddenException('Only call this endpoint in dev mode');

    //clear all data
    await this.product.deleteMany();
    await this.user.deleteMany();

    await this.user.createMany({
      data: users,
    });

    const user = await this.user.findFirst({
      where: { role: 'ADMIN' },
    });

    await this.readCsvData(user.id);
    return 'Seed executed!!';
  }
}
