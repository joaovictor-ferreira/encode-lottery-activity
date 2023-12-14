import { ApiProperty } from "@nestjs/swagger";

export class BuyTokensDTO {
    
    @ApiProperty({type: Number, default: "1", required: true})
    index: number; 

    @ApiProperty({type: String, default: "0.001", required: true})
    amount: string; 
}