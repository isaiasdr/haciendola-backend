import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('ProductsService');

  onModuleInit() {
    this.$connect();
    this.logger.log('DB Connected');
  }

  private async findBySKU(sku: string) {
    const product = await this.product.findFirst({
      where: { sku, deleted: false },
    });

    return product;
  }

  async create(createProductDto: CreateProductDto, userId: number) {
    const { sku } = createProductDto;

    const product = await this.findBySKU(sku);
    if (product) throw new BadRequestException('Product already exists');

    try {
      const newProduct = await this.product.create({
        data: {
          ...createProductDto,
          grams: Number(createProductDto.grams),
          price: Number(createProductDto.price),
          comparePrice: Number(createProductDto.comparePrice),
          userId,
        },
      });

      const { deleted, updatedAt, createdAt, ...rest } = newProduct;

      return rest;
    } catch (error) {
      this.logger.error(error);

      throw new HttpException(
        `Not handled exception, contact admin`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit, page } = paginationDto;

    const total = await this.product.count({
      where: { deleted: false },
    });

    const lastPage = Math.ceil(total / limit);

    const products = await this.product.findMany({
      where: { deleted: false },
      take: limit,
      skip: limit * (page - 1),
    });

    return {
      data: products,
      meta: {
        page,
        total,
        lastPage,
      },
    };
  }

  async findOne(sku: string) {
    const product = await this.findBySKU(sku);

    if (!product)
      throw new NotFoundException(`Product with SKU: ${sku} not found`);

    const { deleted, updatedAt, createdAt, ...rest } = product;

    return rest;
  }

  async update(sku: string, updateProductDto: UpdateProductDto) {
    const product = await this.findBySKU(sku);
    if (!product)
      throw new NotFoundException(`Product with SKU: ${sku} not found`);

    try {
      const updatedProduct = await this.product.update({
        where: { id: product.id },
        data: {
          ...updateProductDto,
          grams: updateProductDto.grams && Number(updateProductDto.grams),
          price: updateProductDto.price && Number(updateProductDto.price),
          comparePrice:
            updateProductDto.comparePrice &&
            Number(updateProductDto.comparePrice),
        },
      });

      const { deleted, updatedAt, createdAt, ...rest } = updatedProduct;

      return rest;
    } catch (error) {
      this.logger.error(error);

      throw new HttpException(
        `Not handled exception, contact admin`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(sku: string) {
    const product = await this.findBySKU(sku);

    if (!product)
      throw new NotFoundException(`Product with SKU: ${sku} not found`);

    const removedProduct = await this.product.update({
      where: { id: product.id },
      data: { deleted: true },
    });

    const { deleted, updatedAt, createdAt, id, ...rest } = removedProduct;

    return rest;
  }
}
