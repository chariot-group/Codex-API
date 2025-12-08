import { ApiProperty } from "@nestjs/swagger";

export class DeleteTranslationResponseDto {
  @ApiProperty({
    example: "Translation 'fr' for spell #507f1f77bcf86cd799439011 deleted in 15ms",
    description: "Success message",
  })
  message: string;

  @ApiProperty({
    example: "fr",
    description: "The language code of the deleted translation",
  })
  deletedLanguage: string;

  @ApiProperty({
    example: ["en", "es"],
    description: "Remaining active languages after deletion",
    type: [String],
  })
  remainingLanguages: string[];
}
