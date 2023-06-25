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
import { AuthGuard } from '@nestjs/passport';
import { TenantService } from './services/tenant.service';
import { CreateTenantRequestDto } from './dto/create-tenant.request.dto';
import { SuccessResponseObject } from '../common/http';
import { UpdateTenantRequestDto } from './dto/update-tenant.request.dto';
import { PayloadExistsValidationPipe } from '@/common/pipes/payload-exists.pipe';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { TenantResponseDto } from './dto/tenant.response.dto';

@ApiTags('Tenant')
@UseGuards(AuthGuard('jwt'))
@Controller('tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @ApiOperation({ summary: 'Create tenant' })
  @ApiCreatedResponse({
    description: 'User created successfully!',
    type: TenantResponseDto,
  })
  @Post()
  async createTenant(@Body() body: CreateTenantRequestDto) {
    try {
      const tenant = await this.tenantService.create(body);

      return new SuccessResponseObject('Tenant created successfully!', tenant);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Get all companies' })
  @ApiOkResponse({
    description: 'Companies fetched successfully!',
    type: [TenantResponseDto],
  })
  @Get()
  async getCompanies() {
    try {
      const companies = await this.tenantService.findAll();

      return new SuccessResponseObject(
        'Companies fetched successfully!',
        companies,
      );
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Get tenant by id' })
  @ApiOkResponse({
    description: 'Tenant fetched successfully!',
    type: TenantResponseDto,
  })
  @Get(':id')
  async getTenant(@Param('id') id: number) {
    try {
      const tenant = await this.tenantService.findOne(id);

      return new SuccessResponseObject('Tenant fetched successfully!', tenant);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Update tenant by id' })
  @ApiOkResponse({ description: 'Tenant updated successfully!' })
  @Put(':id')
  async updateTenant(
    @Param('id') id: number,
    @Body(PayloadExistsValidationPipe) body: UpdateTenantRequestDto,
  ) {
    try {
      await this.tenantService.update(id, body);

      return new SuccessResponseObject('Tenant updated successfully!');
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Delete tenant by id' })
  @ApiNoContentResponse({ description: 'Tenant successfully deleted!' })
  @Delete(':id')
  async deleteTenant(@Param('id') id: number) {
    try {
      await this.tenantService.delete(id);

      return new SuccessResponseObject('Tenant successfully deleted!');
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }

      throw new InternalServerErrorException();
    }
  }
}
