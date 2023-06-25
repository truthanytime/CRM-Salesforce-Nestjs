import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductRequestDto } from './dto/create-product.request.dto';
import { ProductResponseDto } from './dto/product.response.dto';
import { UpdateProductRequestDto } from './dto/update-product-request.dto';
import { ProductRepository } from './repositories/product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async create(
    data: CreateProductRequestDto,
    userId: number,
  ): Promise<ProductResponseDto> {
    const product = this.productRepository.create({
      ...data,
      createdBy: userId,
    });

    const savedPro = await this.productRepository.save(product);

    return savedPro;
  }

  async findOne(id: number, companyId: number): Promise<ProductResponseDto> {
    const product = await this.productRepository.findOne(id, {
      // where: { companyId },
    });
    if (!product) {
      throw new NotFoundException('Product not found!');
    }
    return product;
  }

  async update(
    id: number,
    data: UpdateProductRequestDto,
    companyId: number,
  ): Promise<void> {
    const product = await this.findOne(id, companyId);

    if (!product) {
      throw new NotFoundException('Product not found!');
    }

    await this.productRepository.save({ ...product, ...data });
  }

  async findAll(companyId: number): Promise<ProductResponseDto[]> {
    const productResponse: ProductResponseDto[] = await this.productRepository
      .find
      // { where: { companyId } }
      ();
    return productResponse;
  }

  async delete(id: number, companyId: number): Promise<void> {
    const product = await this.productRepository.findOne(id, {
      // where: { companyId },
    });

    if (!product) {
      throw new NotFoundException('Product not found!');
    }

    await this.productRepository.remove([product]);
  }
}
