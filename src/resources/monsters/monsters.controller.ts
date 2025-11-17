import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { MonstersService } from "@/resources/monsters/monsters.service";
import { ApiExtraModels, ApiOkResponse, ApiOperation, ApiResponse, getSchemaPath } from "@nestjs/swagger";
import { IPaginatedResponse, IResponse } from "@/common/dtos/reponse.dto";
import { Monster } from "@/resources/monsters/schemas/monster.schema";
import { MonsterContent } from "@/resources/monsters/schemas/monster-content.schema";
import { PaginationMonster } from "@/resources/monsters/dtos/find-all.dto";
import { CreateMonsterDto } from "@/resources/monsters/dtos/create-monster.dto";

@ApiExtraModels(Monster, MonsterContent, IResponse, IPaginatedResponse)
@Controller("monsters")
export class MonstersController {
  constructor(private readonly monstersService: MonstersService) {}

  @Get()
  @ApiOperation({ summary: "Get a collection of paginated monsters" })
  @ApiOkResponse({
    description: "Monsters found successfully",
    schema: {
      allOf: [
        { $ref: getSchemaPath(IPaginatedResponse) },
        {
          properties: {
            data: {
              type: "array",
              items: { $ref: getSchemaPath(Monster) },
            },
          },
        },
      ],
    },
  })
  findAll(@Query() query: PaginationMonster): Promise<IPaginatedResponse<Monster[]>> {
    return this.monstersService.findAll(query);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.monstersService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: "Create a new monster" })
  @ApiOkResponse({
    description: "Monster created successfully",
    schema: {
      allOf: [
        { $ref: getSchemaPath(IResponse) },
        {
          properties: {
            data: { $ref: getSchemaPath(Monster) },
          },
        },
      ],
    },
  })
  @ApiResponse({
    status: 400,
    description: "Validation DTO failed",
    schema: {
      allOf: [
        {
          example: {
            message: ["monsterContent.name must be a string"],
            statusCode: 400,
            error: "Bad Request",
          },
        },
      ],
    },
  })
  async create(@Body() monsterDto: CreateMonsterDto): Promise<IResponse<Monster>> {
    return this.monstersService.create(monsterDto);
  }
}
