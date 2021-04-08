import { ApiProperty } from '@nestjs/swagger';

export class CreateKeyDto {
  @ApiProperty({
    description: 'Key name',
    type: String,
    example: 'company',
  })
  name: string;

  @ApiProperty({
    description: 'Key value',
    type: String,
    example: 'databa.'
  })
  value: string;
}