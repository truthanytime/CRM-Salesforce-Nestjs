import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductRequestDto } from './dto/create-product.request.dto';
import { UpdateProductRequestDto } from './dto/update-product-request.dto';
import { SuccessResponseObject } from '../common/http';
import { PayloadExistsValidationPipe } from '@/common/pipes/payload-exists.pipe';
import { ProductResponseDto } from './dto/product.response.dto';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthedUser } from '@/auth/decorators/authed-user.decorator';
import { IAuthedUser } from '@/auth/types';

@ApiTags('Product')
@UseGuards(AuthGuard('jwt'))
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: 'Create product' })
  @ApiCreatedResponse({
    description: 'Product created successfully!',
    type: ProductResponseDto,
  })
  @Post()
  async createProduct(
    @AuthedUser() authedUser: IAuthedUser,
    @Body() body: CreateProductRequestDto,
  ) {
    try {
      const product = await this.productService.create(
        body,
        authedUser.userId as number,
      );

      return new SuccessResponseObject(
        'Product created successfully!',
        product,
      );
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Update product by id' })
  @ApiOkResponse({ description: 'Product updated successfully!' })
  @Put(':id')
  async updateProduct(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: number,
    @Body(PayloadExistsValidationPipe) body: UpdateProductRequestDto,
  ) {
    try {
      await this.productService.update(id, body, authedUser.tenantId as number);

      return new SuccessResponseObject('Product updated successfully!');
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }

      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Get all products' })
  @ApiOkResponse({
    description: 'Products fetched successfully!',
    type: [ProductResponseDto],
  })
  @Get()
  async getProducts(@AuthedUser() authedUser: IAuthedUser) {
    try {
      const products = await this.productService.findAll(
        authedUser.tenantId as number,
      );

      return new SuccessResponseObject(
        'Products fetched successfully!',
        products,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Get product by id' })
  @ApiOkResponse({
    description: 'Product fetched successfully!',
    type: ProductResponseDto,
  })
  @Get(':id')
  async getProduct(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: number,
  ) {
    try {
      const product = await this.productService.findOne(
        id,
        authedUser.tenantId as number,
      );

      return new SuccessResponseObject(
        'Product fetched successfully!',
        product,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }

      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Delete product by id' })
  @ApiNoContentResponse({ description: 'Product successfully deleted!' })
  @Delete(':id')
  async deleteProduct(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: number,
  ) {
    try {
      await this.productService.delete(id, authedUser.tenantId as number);

      return new SuccessResponseObject('Product successfully deleted!');
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }

      throw new InternalServerErrorException();
    }
  }
}
