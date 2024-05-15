import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDecimal, IsPositive, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'cola-glitter-23-grs',
    description: 'Handle',
    nullable: false,
    required: true,
    type: String,
  })
  @IsString()
  @Transform(({ value }) => value.trim().toLowerCase())
  handle: string;

  @ApiProperty({
    example: 'COLA GLITTER 23 GRS',
    description: 'Title',
    nullable: false,
    required: true,
    type: String,
  })
  @IsString()
  @Transform(({ value }) => value.trim().toUpperCase())
  title: string;

  @ApiProperty({
    example: `<p><strong>Características:</strong></p>
    <ul>
    <li>Para hacer pegaduras, contornos, decorar y pintar sobre papel, papel cartón y cartulina.</li>
    <li>Posee un brillo intenso con glitter.</li>
    <li>Lavable (no mancha las ropas).</li>
    </ul>`,
    description: 'Description',
    nullable: false,
    required: true,
    type: String,
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: '60870131001',
    description: 'SKU',
    nullable: false,
    required: true,
    type: String,
  })
  @IsString()
  sku: string;

  @ApiProperty({
    example: 100.0,
    description: 'Grams',
    nullable: false,
    required: true,
    type: Number,
  })
  @IsDecimal({ decimal_digits: '2' })
  grams: number;

  @ApiProperty({
    example: '1013',
    description: 'Stock',
    nullable: false,
    required: true,
    type: Number,
  })
  @IsPositive()
  @Min(0)
  stock: number;

  @ApiProperty({
    example: '1161',
    description: 'Price',
    nullable: false,
    required: true,
    type: Number,
  })
  @IsDecimal({ decimal_digits: '2' })
  price: number;

  @ApiProperty({
    example: '1290',
    description: 'Compare Price',
    nullable: false,
    required: true,
    type: Number,
  })
  @IsDecimal({ decimal_digits: '2' })
  comparePrice: number;

  @ApiProperty({
    example: '7891153003689',
    description: 'Barcode',
    nullable: false,
    required: true,
    type: String,
  })
  @IsString()
  barcode: string;
}
