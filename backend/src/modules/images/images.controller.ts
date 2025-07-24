import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { ImagesService } from './images.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateImageDto } from './dto/create-image.dto';
import { GetUser } from '../auth/decorators/get-user.decorator';

@ApiTags('images')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @ApiOperation({ summary: 'Upload medical image' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: 'Image uploaded successfully' })
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() createImageDto: CreateImageDto,
    @GetUser() user: any,
  ) {
    return this.imagesService.uploadImage(file, createImageDto, user.id);
  }

  @ApiOperation({ summary: 'Get all images' })
  @ApiResponse({ status: 200, description: 'Images retrieved successfully' })
  @Get()
  async findAll(@Query('patientId') patientId?: string) {
    return this.imagesService.findAll(patientId);
  }

  @ApiOperation({ summary: 'Get image by ID' })
  @ApiResponse({ status: 200, description: 'Image retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Image not found' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.imagesService.findOne(id);
  }

  @ApiOperation({ summary: 'Delete image' })
  @ApiResponse({ status: 200, description: 'Image deleted successfully' })
  @ApiResponse({ status: 404, description: 'Image not found' })
  @Delete(':id')
  async remove(@Param('id') id: string, @GetUser() user: any) {
    return this.imagesService.remove(id, user.id);
  }
}