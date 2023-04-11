import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class CheckRateDto {
    @ApiProperty({ type: 'string' })
    @Type(() => String)
    @IsString()
    @IsNotEmpty()
    originPostcode: string;

    @ApiProperty({ type: 'string' })
    @Type(() => String)
    @IsString()
    @IsNotEmpty()
    originAddress1: string;

    @ApiProperty({ type: 'string' })
    @Type(() => String)
    @IsString()
    @IsOptional()
    originAddress2: string;

    @ApiProperty({ type: 'string' })
    @Type(() => String)
    @IsString()
    @IsOptional()
    originCity: string;

    @ApiProperty({ type: 'string' })
    @Type(() => String)
    @IsString()
    @IsOptional()
    originState: string;

    @ApiProperty({ type: 'string' })
    @Type(() => String)
    @IsString()
    @IsNotEmpty()
    destinationPostcode: string;

    @ApiProperty({ type: 'string' })
    @Type(() => String)
    @IsString()
    @IsNotEmpty()
    destinationAddress1: string;

    @ApiProperty({ type: 'string' })
    @Type(() => String)
    @IsString()
    @IsOptional()
    destinationAddress2: string;

    @ApiProperty({ type: 'string' })
    @Type(() => String)
    @IsString()
    @IsOptional()
    destinationCity: string;

    @ApiProperty({ type: 'string' })
    @Type(() => String)
    @IsString()
    @IsOptional()
    destinationState: string;

    @ApiProperty({ type: 'number' })
    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    packageWeight: number;
}
