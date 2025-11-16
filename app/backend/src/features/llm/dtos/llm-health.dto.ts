import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LlmHealthRequestDto {
    @ApiProperty({ description: 'Prompt for LLM' })
    @IsString()
    @IsNotEmpty()
    prompt: string;
}

export class LlmHealthResponseDto {
    @ApiProperty({ description: 'Prompt for LLM' })
    @IsString()
    @IsNotEmpty()
    requestPrompt: string;

    @ApiProperty({ description: 'Response for LLM prompt' })
    @IsString()
    @IsNotEmpty()
    response: string;
}
