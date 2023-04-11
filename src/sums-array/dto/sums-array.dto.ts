import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber } from "class-validator";


export class SumsArrayDto {
    @ApiProperty({ type: [Number] })
    @Type(() => Number)
    @IsArray()
    @IsNotEmpty()
    sumArray: number[];

    @ApiProperty({ type: 'number' })
    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    expectedSum: number;
}
