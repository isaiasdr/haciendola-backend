import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { User } from '@prisma/client';

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiResponse({ status: 201, description: 'Product created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unathorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiBearerAuth()
  @ApiBody({ type: [CreateProductDto] })
  @Post()
  @Auth(ValidRoles.admin)
  create(@Body() createProductDto: CreateProductDto, @GetUser() user: User) {
    return this.productsService.create(createProductDto, user.id);
  }

  @ApiResponse({ status: 200, description: 'List products' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiBearerAuth()
  @Get()
  @Auth()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto);
  }

  @ApiResponse({ status: 200, description: 'Get product data by SKU' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 401, description: 'Unathorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiParam({
    name: 'sku',
    type: String,
  })
  @ApiBearerAuth()
  @Get(':sku')
  @Auth()
  findOne(@Param('sku') sku: string) {
    return this.productsService.findOne(sku);
  }

  @ApiResponse({ status: 200, description: 'Product updated' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 401, description: 'Unathorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiParam({
    name: 'sku',
    type: String,
  })
  @ApiBearerAuth()
  @ApiBody({ type: [UpdateProductDto] })
  @Patch(':sku')
  @Auth(ValidRoles.admin)
  update(
    @Param('sku') sku: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(sku, updateProductDto);
  }

  @ApiResponse({ status: 200, description: 'Product deleted' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiParam({
    name: 'sku',
    type: String,
  })
  @ApiBearerAuth()
  @Delete(':sku')
  @Auth(ValidRoles.admin)
  remove(@Param('sku') sku: string) {
    return this.productsService.remove(sku);
  }
}
