import { Injectable } from '@nestjs/common';
import { SumsArrayDto } from './dto/sums-array.dto';

@Injectable()
export class SumsArrayService {

    async create(sumsArrayDto:SumsArrayDto){
      return this.findPair(sumsArrayDto.sumArray,sumsArrayDto.expectedSum)
    }

    async findPair(numberArrays:number[], expectedSum:number) {
        // sort first make the array is sorted so the function can run properly
        const sortedArr = [...numberArrays].sort((a, b) => a - b);
    
        // define the left number and right number
      let leftNumber = 0;
      let rightNumber = sortedArr.length - 1;
    
      while (leftNumber < rightNumber) {
        // array loop until finish everything
        const sum = sortedArr[leftNumber] + sortedArr[rightNumber];
    
        // if equal the expected sum we just return out 
        if (sum === expectedSum) {
          return true;
        } else if (sum < expectedSum) {
            // if sum added more than the expected we minus the left number
            leftNumber++;
        } else {
            rightNumber--;
        }
      }
    
        // if finish loop then found nothing just return false
      return false;
    }
}
