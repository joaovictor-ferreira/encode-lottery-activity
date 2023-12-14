import { ApiProperty } from "@nestjs/swagger";

export class WithdrawDTO {
    @ApiProperty({type: BigInt, default: "100", required: true})
    amount: bigint; 
}