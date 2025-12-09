import {
  Controller,
  Get,
  BadRequestException,
  Logger,
  Query,
  Param,
  Patch,
  Body,
  Post,
  Delete,
  ForbiddenException,
  GoneException,
} from "@nestjs/common";
import {
  ApiOperation,
  ApiResponse,
  ApiOkResponse,
  ApiExtraModels,
  getSchemaPath,
  ApiParam,
  ApiCreatedResponse,
  ApiSecurity,
} from "@nestjs/swagger";
import { SpellsService } from "@/resources/spells/spells.service";
import { Types } from "mongoose";
import { Spell } from "@/resources/spells/schemas/spell.schema";
import { ParseMongoIdPipe } from "@/common/pipes/parse-mong-id.pipe";
import { IPaginatedResponse, IResponse } from "@/common/dtos/reponse.dto";
import { PaginationSpell } from "@/resources/spells/dtos/find-all.dto";
import { langParam } from "@/resources/spells/dtos/find-one.dto";
import { SpellContent } from "@/resources/spells/schemas/spell-content.schema";
import { UpdateSpellDto } from "@/resources/spells/dtos/update-spell.dto";
import { UpdateSpellTranslationDto } from "@/resources/spells/dtos/update-spell-translation.dto";
import { CreateSpellDto } from "@/resources/spells/dtos/create-spell.dto";
import { CreateSpellTranslationDto } from "@/resources/spells/dtos/create-spell-translation.dto";
import { ProblemDetailsDto } from "@/common/dtos/errors.dto";
import { DeleteTranslationResponseDto } from "@/resources/spells/dtos/delete-translation.dto";
import {
  SpellTranslationSummaryDto,
  SpellTranslationsListDto,
} from "@/resources/spells/dtos/spell-translation-summary.dto";
import { Public } from "@/auth/public.decorator";
import { CurrentUser, JwtPayload } from "@/auth/current-user.decorator";

@ApiExtraModels(
  Spell,
  SpellContent,
  IResponse,
  IPaginatedResponse,
  DeleteTranslationResponseDto,
  SpellTranslationSummaryDto,
  SpellTranslationsListDto,
)
@ApiSecurity("oauth2")
@Controller("spells")
export class SpellsController {
  constructor(private readonly spellsService: SpellsService) {}

  private readonly CONTROLLER_NAME = SpellsController.name;
  private readonly logger = new Logger(this.CONTROLLER_NAME);

  /**
   * Verify that the resource exists
   * @param id Resource ID
   * @returns object IResponse<Spell>
   */
  private async validateResource(id: Types.ObjectId, lang: string): Promise<IResponse<Spell>> {
    if (!Types.ObjectId.isValid(id)) {
      const message = `Error while fetching spell #${id}: Id is not a valid mongoose id`;
      this.logger.error(message);
      throw new BadRequestException(message);
    }
    return await this.spellsService.findOne(id, lang);
  }

  @Get()
  @Public()
  @ApiOperation({
    summary: "Get a collection of paginated spells",
    description: "Public endpoint - No authentication required",
    security: [],
  })
  @ApiOkResponse({
    description: "Spells found successfully",
    schema: {
      allOf: [
        { $ref: getSchemaPath(IPaginatedResponse) },
        {
          properties: {
            data: {
              type: "array",
              items: { $ref: getSchemaPath(Spell) },
            },
          },
        },
      ],
    },
  })
  findAll(@Query() query: PaginationSpell): Promise<IPaginatedResponse<Spell[]>> {
    return this.spellsService.findAll(query);
  }

  @Get(":id")
  @Public()
  @ApiOperation({
    summary: "Get a spell by ID",
    description: "Public endpoint - No authentication required",
    security: [],
  })
  @ApiParam({
    name: "id",
    type: String,
    required: true,
    description: "The ID of the spell to get",
    example: "507f1f77bcf86cd799439011",
  })
  @ApiParam({
    name: "lang",
    type: String,
    description: "The ISO 2 code of translation",
    example: "en",
  })
  @ApiOperation({ summary: "Get a spell by ID" })
  @ApiOkResponse({
    description: "Spell found successfully",
    schema: {
      allOf: [
        { $ref: getSchemaPath(IResponse) },
        {
          properties: {
            data: { $ref: getSchemaPath(Spell) },
          },
        },
      ],
    },
  })
  @ApiResponse({ status: 404, description: "Spell #ID not found", type: ProblemDetailsDto })
  @ApiResponse({
    status: 400,
    description: "Error while fetching spell #ID: Id is not a valid mongoose id",
    type: ProblemDetailsDto,
  })
  @ApiResponse({ status: 410, description: "Spell #ID has been deleted", type: ProblemDetailsDto })
  async findOne(
    @Param("id", ParseMongoIdPipe) id: Types.ObjectId,
    @Query() query: langParam,
  ): Promise<IResponse<Spell>> {
    const { lang = "en" } = query;
    return this.validateResource(id, lang);
  }

  @Get(":id/translations")
  @Public()
  @ApiParam({
    name: "id",
    type: String,
    required: true,
    description: "The ID of the spell to get translations for",
    example: "507f1f77bcf86cd799439011",
  })
  @ApiOperation({
    summary: "Get all available translations for a spell",
    description: "Public endpoint - No authentication required",
    security: [],
  })
  @ApiOkResponse({
    description: "Spell translations found successfully",
    schema: {
      allOf: [
        { $ref: getSchemaPath(IResponse) },
        {
          properties: {
            data: { $ref: getSchemaPath(SpellTranslationsListDto) },
          },
        },
      ],
    },
  })
  @ApiResponse({ status: 404, description: "Spell #ID not found", type: ProblemDetailsDto })
  @ApiResponse({
    status: 400,
    description: "Error while fetching spell #ID: Id is not a valid mongoose id",
    type: ProblemDetailsDto,
  })
  @ApiResponse({ status: 410, description: "Spell #ID has been deleted", type: ProblemDetailsDto })
  async getTranslations(
    @Param("id", ParseMongoIdPipe) id: Types.ObjectId,
  ): Promise<IResponse<SpellTranslationsListDto>> {
    if (!Types.ObjectId.isValid(id)) {
      const message = `Error while fetching spell #${id}: Id is not a valid mongoose id`;
      this.logger.error(message);
      throw new BadRequestException(message);
    }
    return this.spellsService.getTranslations(id);
  }

  @Get(":id/translations/:lang")
  @Public()
  @ApiParam({
    name: "id",
    type: String,
    required: true,
    description: "The ID of the spell to get the translation for",
    example: "507f1f77bcf86cd799439011",
  })
  @ApiParam({
    name: "lang",
    type: String,
    required: true,
    description: "The ISO 2 letters language code (e.g., 'fr', 'es', 'de')",
    example: "fr",
  })
  @ApiOperation({
    summary: "Get a specific translation for a spell by language code",
    description: "Public endpoint - No authentication required",
    security: [],
  })
  @ApiOkResponse({
    description: "Spell translation found successfully",
    schema: {
      allOf: [
        { $ref: getSchemaPath(IResponse) },
        {
          properties: {
            data: { $ref: getSchemaPath(SpellContent) },
          },
        },
      ],
    },
  })
  @ApiResponse({ status: 404, description: "Spell #ID not found or translation not found", type: ProblemDetailsDto })
  @ApiResponse({
    status: 400,
    description: "Error while fetching spell #ID: Id is not a valid mongoose id",
    type: ProblemDetailsDto,
  })
  @ApiResponse({
    status: 410,
    description: "Spell #ID has been deleted or translation has been deleted",
    type: ProblemDetailsDto,
  })
  async getTranslation(
    @Param("id", ParseMongoIdPipe) id: Types.ObjectId,
    @Param("lang") lang: string,
  ): Promise<IResponse<SpellContent>> {
    if (!Types.ObjectId.isValid(id)) {
      const message = `Error while fetching spell #${id}: Id is not a valid mongoose id`;
      this.logger.error(message);
      throw new BadRequestException(message);
    }
    return this.spellsService.getTranslation(id, lang);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a spell by ID" })
  @ApiParam({
    name: "id",
    type: String,
    required: true,
    description: "The ID of the spell to update",
    example: "507f1f77bcf86cd799439011",
  })
  @ApiOkResponse({
    description: "Spell updated successfully",
    schema: {
      allOf: [
        { $ref: getSchemaPath(IResponse) },
        {
          properties: {
            data: { $ref: getSchemaPath(Spell) },
          },
        },
      ],
    },
  })
  @ApiResponse({
    status: 400,
    description: "Validation error",
    type: ProblemDetailsDto,
  })
  @ApiResponse({ status: 404, description: "Spell #ID not found", type: ProblemDetailsDto })
  @ApiResponse({ status: 410, description: "Spell #ID has been deleted", type: ProblemDetailsDto })
  async update(
    @Param("id", ParseMongoIdPipe) id: Types.ObjectId,
    @Body() updateData: UpdateSpellDto,
    @CurrentUser() user: JwtPayload,
  ): Promise<IResponse<Spell>> {
    const oldSpell = await this.spellsService.findOneWithAllTranslations(id);

    if (oldSpell.deletedAt) {
      const message = `Spell #${id} has been deleted`;
      this.logger.error(message);
      throw new GoneException(message);
    }

    // Check if any translation is SRD - SRD resources cannot be modified
    for (const [, translation] of oldSpell.translations) {
      if (translation.srd) {
        const message = `Spell #${id} has SRD translations and cannot be modified`;
        this.logger.error(message);
        throw new ForbiddenException(message);
      }
    }

    // Check if user is the owner of the resource
    if (oldSpell.createdBy && oldSpell.createdBy !== user?.userId) {
      const message = `You are not allowed to modify spell #${id}: you are not the owner`;
      this.logger.error(message);
      throw new ForbiddenException(message);
    }

    return this.spellsService.update(id, oldSpell, updateData);
  }

  @Post()
  @ApiOperation({ summary: "Create a new spell" })
  @ApiOkResponse({
    description: "Spell created successfully",
    schema: {
      allOf: [
        { $ref: getSchemaPath(IResponse) },
        {
          properties: {
            data: { $ref: getSchemaPath(Spell) },
          },
        },
      ],
    },
  })
  @ApiResponse({
    status: 400,
    description: "Validation error",
    type: ProblemDetailsDto,
  })
  async create(@Body() spellDto: CreateSpellDto, @CurrentUser() user: JwtPayload): Promise<IResponse<Spell>> {
    return this.spellsService.create(spellDto, user?.userId);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a spell by ID" })
  @ApiParam({
    name: "id",
    type: String,
    required: true,
    description: "The ID of the spell to delete",
    example: "507f1f77bcf86cd799439011",
  })
  @ApiOkResponse({
    description: "Spell #ID deleted",
    schema: {
      allOf: [
        { $ref: getSchemaPath(IResponse) },
        {
          properties: {
            data: { $ref: getSchemaPath(Spell) },
          },
        },
      ],
    },
  })
  @ApiResponse({ status: 404, description: "Spell #ID not found", type: ProblemDetailsDto })
  @ApiResponse({
    status: 400,
    description: "Error while fetching spell #ID: Id is not a valid mongoose id",
    type: ProblemDetailsDto,
  })
  @ApiResponse({ status: 410, description: "Spell #ID has been deleted", type: ProblemDetailsDto })
  async delete(
    @Param("id", ParseMongoIdPipe) id: Types.ObjectId,
    @CurrentUser() user: JwtPayload,
  ): Promise<IResponse<Spell>> {
    const spell = await this.spellsService.findOneWithAllTranslations(id);

    if (spell.deletedAt) {
      const message = `Spell #${id} has been deleted`;
      this.logger.error(message);
      throw new GoneException(message);
    }

    // Check if any translation is SRD - SRD resources cannot be deleted
    const hasSrdTranslation = Array.from(spell.translations.values()).some((translation) => translation.srd === true);

    if (hasSrdTranslation) {
      const message = `Cannot delete spell #${id}: it has at least one SRD translation`;
      this.logger.error(message);
      throw new ForbiddenException(message);
    }

    // Check if user is the owner of the resource
    if (spell.createdBy && spell.createdBy !== user?.userId) {
      const message = `You are not allowed to delete spell #${id}: you are not the owner`;
      this.logger.error(message);
      throw new ForbiddenException(message);
    }

    return this.spellsService.delete(id, spell);
  }

  @Post(":id/translations/:lang")
  @ApiOperation({ summary: "Add a new translation to an existing spell" })
  @ApiParam({
    name: "id",
    type: String,
    required: true,
    description: "The ID of the spell to add translation to",
    example: "507f1f77bcf86cd799439011",
  })
  @ApiParam({
    name: "lang",
    type: String,
    required: true,
    description: "The ISO 2-letter language code in lowercase",
    example: "fr",
  })
  @ApiCreatedResponse({
    description: "Translation added successfully",
    schema: {
      allOf: [
        { $ref: getSchemaPath(IResponse) },
        {
          properties: {
            data: { $ref: getSchemaPath(Spell) },
          },
        },
      ],
    },
  })
  @ApiResponse({
    status: 400,
    description: "Validation error or invalid language code",
    type: ProblemDetailsDto,
  })
  @ApiResponse({
    status: 403,
    description: "User does not have permission to add translation",
    type: ProblemDetailsDto,
  })
  @ApiResponse({ status: 404, description: "Spell #ID not found", type: ProblemDetailsDto })
  @ApiResponse({
    status: 409,
    description: "Translation for this language already exists",
    type: ProblemDetailsDto,
  })
  @ApiResponse({ status: 410, description: "Spell #ID has been deleted", type: ProblemDetailsDto })
  async addTranslation(
    @Param("id", ParseMongoIdPipe) id: Types.ObjectId,
    @Param("lang") lang: string,
    @Body() translationDto: CreateSpellTranslationDto,
    @CurrentUser() user: JwtPayload,
  ): Promise<IResponse<Spell>> {
    // Check if user is the owner of the resource
    const spell = await this.spellsService.findOneWithAllTranslations(id);

    if (spell.deletedAt) {
      const message = `Spell #${id} has been deleted`;
      this.logger.error(message);
      throw new GoneException(message);
    }

    if (spell.createdBy && spell.createdBy !== user?.userId) {
      const message = `You are not allowed to add translations to spell #${id}: you are not the owner`;
      this.logger.error(message);
      throw new ForbiddenException(message);
    }

    // TODO: Implement authentication/authorization to determine if user is admin
    // For now, we'll determine based on the srd flag and spell tag
    const isAdmin = false; // This should come from auth guard/decorator

    return this.spellsService.addTranslation(id, lang, translationDto, isAdmin);
  }

  /**
   * Validate resource exists and return it with all translations
   * @param id Resource ID
   * @returns object Spell with all translations
   */
  private async validateResourceWithAllTranslations(id: Types.ObjectId): Promise<Spell> {
    if (!Types.ObjectId.isValid(id)) {
      const message = `Error while fetching spell #${id}: Id is not a valid mongoose id`;
      this.logger.error(message);
      throw new BadRequestException(message);
    }
    // Get spell with all translations for validation
    const result = await this.spellsService.findOneWithAllTranslations(id);
    return result;
  }

  @Patch(":id/translations/:lang")
  @ApiOperation({ summary: "Update a specific translation of a spell" })
  @ApiParam({
    name: "id",
    type: String,
    required: true,
    description: "The ID of the spell",
    example: "507f1f77bcf86cd799439011",
  })
  @ApiParam({
    name: "lang",
    type: String,
    required: true,
    description: "The ISO 2-letter code of the language to update",
    example: "en",
  })
  @ApiOkResponse({
    description: "Translation updated successfully",
    schema: {
      allOf: [
        { $ref: getSchemaPath(IResponse) },
        {
          properties: {
            data: { $ref: getSchemaPath(SpellContent) },
          },
        },
      ],
    },
  })
  @ApiResponse({
    status: 400,
    description: "Validation error or invalid language code",
    type: ProblemDetailsDto,
  })
  @ApiResponse({
    status: 403,
    description: "Cannot modify components count (must remain consistent across translations)",
    type: ProblemDetailsDto,
  })
  @ApiResponse({
    status: 404,
    description: "Spell or translation not found",
    type: ProblemDetailsDto,
  })
  @ApiResponse({
    status: 410,
    description: "Spell or translation has been deleted",
    type: ProblemDetailsDto,
  })
  async updateTranslation(
    @Param("id", ParseMongoIdPipe) id: Types.ObjectId,
    @Param("lang") lang: string,
    @Body() updateData: UpdateSpellTranslationDto,
    @CurrentUser() user: JwtPayload,
  ): Promise<IResponse<SpellContent>> {
    // Validate lang parameter (must be 2 lowercase letters)
    if (!/^[a-z]{2}$/.test(lang)) {
      const message = `Invalid language code '${lang}': must be a 2-letter ISO code in lowercase`;
      this.logger.error(message);
      throw new BadRequestException(message);
    }

    // Check if user is the owner of the resource
    const spell = await this.spellsService.findOneWithAllTranslations(id);

    if (spell.deletedAt) {
      const message = `Spell #${id} has been deleted`;
      this.logger.error(message);
      throw new GoneException(message);
    }

    // Check if the translation is SRD - SRD translations cannot be modified
    const translation = spell.translations.get(lang);
    if (translation?.srd) {
      const message = `Cannot modify SRD translation '${lang}' for spell #${id}`;
      this.logger.error(message);
      throw new ForbiddenException(message);
    }

    if (spell.createdBy && spell.createdBy !== user?.userId) {
      const message = `You are not allowed to modify translations for spell #${id}: you are not the owner`;
      this.logger.error(message);
      throw new ForbiddenException(message);
    }

    return this.spellsService.updateTranslation(id, lang, updateData);
  }

  @Delete(":id/translations/:lang")
  @ApiOperation({ summary: "Delete a specific translation for a spell" })
  @ApiParam({
    name: "id",
    type: String,
    required: true,
    description: "The ID of the spell",
    example: "507f1f77bcf86cd799439011",
  })
  @ApiParam({
    name: "lang",
    type: String,
    required: true,
    description: "The ISO 2-letter code of the language to delete",
    example: "fr",
  })
  @ApiOkResponse({
    description: "Translation deleted successfully",
    type: DeleteTranslationResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: "Invalid spell ID or language code",
    type: ProblemDetailsDto,
  })
  @ApiResponse({
    status: 403,
    description: "Cannot delete SRD translation or last active translation",
    type: ProblemDetailsDto,
  })
  @ApiResponse({
    status: 404,
    description: "Spell or translation not found",
    type: ProblemDetailsDto,
  })
  @ApiResponse({
    status: 410,
    description: "Spell or translation has been deleted",
    type: ProblemDetailsDto,
  })
  async deleteTranslation(
    @Param("id", ParseMongoIdPipe) id: Types.ObjectId,
    @Param("lang") lang: string,
    @CurrentUser() user: JwtPayload,
  ): Promise<DeleteTranslationResponseDto> {
    // Validate language code format
    if (!/^[a-z]{2}$/.test(lang)) {
      const message = `Invalid language code '${lang}': must be a 2-letter ISO code in lowercase`;
      this.logger.error(message);
      throw new BadRequestException(message);
    }

    // Get spell with all translations
    const spell = await this.validateResourceWithAllTranslations(id);

    // Check if spell is deleted
    if (spell.deletedAt) {
      const message = `Spell #${id} has been deleted`;
      this.logger.error(message);
      throw new GoneException(message);
    }

    // Check if user is the owner of the resource
    if (spell.createdBy && spell.createdBy !== user?.userId) {
      const message = `You are not allowed to delete translations for spell #${id}: you are not the owner`;
      this.logger.error(message);
      throw new ForbiddenException(message);
    }

    return this.spellsService.deleteTranslation(id, lang, spell);
  }
}
