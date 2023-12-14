import { ApiProperty } from "@nestjs/swagger";

export class BetDTO {
    
    @ApiProperty({type: Number, default: "1", required: true})
    index: number; 

    @ApiProperty({type: BigInt, default: "3", required: true})
    times: bigint; 
}