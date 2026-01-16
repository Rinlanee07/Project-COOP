import { Injectable, BadRequestException } from '@nestjs/common';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

@Injectable()
export class UploadService {
  async uploadFile(file: Express.Multer.File): Promise<{ url: string; fileName: string; size: number }> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    // Validate file type
    const allowedTypes = [
      'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp',
      'application/pdf'
    ];

    const fileExt = file.originalname.split('.').pop()?.toLowerCase();
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'pdf'];

    const isValidMimeType = allowedTypes.includes(file.mimetype);
    const isValidExtension = fileExt && allowedExtensions.includes(fileExt);

    if (!isValidMimeType && !isValidExtension) {
      throw new BadRequestException('Invalid file type. Allowed types: JPG, PNG, GIF, WEBP, PDF');
    }

    // Validate file size (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new BadRequestException('File size too large. Maximum size: 5MB');
    }

    try {
      // Create uploads directory if it doesn't exist
      const uploadsDir = join(process.cwd(), 'public', 'uploads');
      if (!existsSync(uploadsDir)) {
        await mkdir(uploadsDir, { recursive: true });
      }

      // Generate unique filename
      const timestamp = Date.now();
      const fileName = `${timestamp}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = join(uploadsDir, fileName);

      // Write file
      await writeFile(filePath, file.buffer);

      // Return full file URL with backend host
      const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';
      const fileUrl = `${backendUrl}/uploads/${fileName}`;

      return {
        url: fileUrl,
        fileName: file.originalname,
        size: file.size
      };
    } catch (error) {
      throw new BadRequestException('Failed to upload file');
    }
  }
}
