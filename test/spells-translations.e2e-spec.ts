import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { App } from "supertest/types";
import { SpellsModule } from "../src/resources/spells/spells.module";
import { getModelToken } from "@nestjs/mongoose";
import { Spell } from "../src/resources/spells/schemas/spell.schema";
import { Types } from "mongoose";

describe("SpellsController - Translations (e2e)", () => {
  let app: INestApplication<App>;

  const mockSpellId = new Types.ObjectId();
  const deletedSpellId = new Types.ObjectId();
  const nonExistentId = new Types.ObjectId();

  const mockSpell = {
    _id: mockSpellId,
    tag: 1,
    languages: ["en", "fr"],
    translations: new Map([
      [
        "en",
        {
          srd: true,
          name: "Fireball",
          level: 3,
          school: "Evocation",
          description: "A bright streak flashes from your pointing finger...",
          components: ["V", "S", "M"],
          castingTime: "1 action",
          duration: "Instantaneous",
          range: "150 feet",
          deletedAt: null,
          createdAt: new Date("2024-01-01"),
          updatedAt: new Date("2024-01-01"),
        },
      ],
      [
        "fr",
        {
          srd: false,
          name: "Boule de feu",
          level: 3,
          school: "Évocation",
          description: "Une traînée brillante jaillit de votre doigt pointé...",
          components: ["V", "S", "M"],
          castingTime: "1 action",
          duration: "Instantané",
          range: "45 mètres",
          deletedAt: null,
          createdAt: new Date("2024-01-02"),
          updatedAt: new Date("2024-01-02"),
        },
      ],
    ]),
    deletedAt: null,
  };

  const deletedSpell = {
    _id: deletedSpellId,
    tag: 2,
    languages: ["en"],
    translations: new Map([
      [
        "en",
        {
          srd: true,
          name: "Magic Missile",
          level: 1,
          school: "Evocation",
          description: "You create three glowing darts of magical force...",
          deletedAt: null,
          createdAt: new Date("2024-01-01"),
          updatedAt: new Date("2024-01-01"),
        },
      ],
    ]),
    deletedAt: new Date("2024-06-01"),
  };

  const mockSpellModel = {
    findById: jest.fn().mockImplementation((id: Types.ObjectId) => ({
      exec: jest.fn().mockImplementation(() => {
        if (id.toString() === mockSpellId.toString()) {
          return Promise.resolve(mockSpell);
        }
        if (id.toString() === deletedSpellId.toString()) {
          return Promise.resolve(deletedSpell);
        }
        return Promise.resolve(null);
      }),
    })),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [SpellsModule],
    })
      .overrideProvider(getModelToken(Spell.name))
      .useValue(mockSpellModel)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe("GET /spells/:id/translations", () => {
    it("should return all translations for a spell", async () => {
      const response = await request(app.getHttpServer()).get(`/spells/${mockSpellId}/translations`).expect(200);

      expect(response.body.data).toBeDefined();
      expect(response.body.data.spellId).toBe(mockSpellId.toString());
      expect(response.body.data.translations).toHaveLength(2);
      expect(response.body.data.translations.map((t: any) => t.lang)).toContain("en");
      expect(response.body.data.translations.map((t: any) => t.lang)).toContain("fr");
    });

    it("should return 404 for non-existent spell", async () => {
      const response = await request(app.getHttpServer()).get(`/spells/${nonExistentId}/translations`).expect(404);

      expect(response.body.message).toContain("not found");
    });

    it("should return 410 for deleted spell", async () => {
      const response = await request(app.getHttpServer()).get(`/spells/${deletedSpellId}/translations`).expect(410);

      expect(response.body.message).toContain("deleted");
    });

    it("should return 400 for invalid MongoDB ID", async () => {
      const response = await request(app.getHttpServer()).get("/spells/invalid-id/translations").expect(400);

      expect(response.body.message).toContain("not a valid mongoose id");
    });
  });

  describe("GET /spells/:id/translations/:lang", () => {
    it("should return a specific translation", async () => {
      const response = await request(app.getHttpServer()).get(`/spells/${mockSpellId}/translations/fr`).expect(200);

      expect(response.body.data).toBeDefined();
      expect(response.body.data.name).toBe("Boule de feu");
      expect(response.body.data.level).toBe(3);
      expect(response.body.data.school).toBe("Évocation");
    });

    it("should return 404 for non-existent spell", async () => {
      const response = await request(app.getHttpServer()).get(`/spells/${nonExistentId}/translations/en`).expect(404);

      expect(response.body.message).toContain("not found");
    });

    it("should return 410 for deleted spell", async () => {
      const response = await request(app.getHttpServer()).get(`/spells/${deletedSpellId}/translations/en`).expect(410);

      expect(response.body.message).toContain("deleted");
    });

    it("should return 404 for non-existent translation", async () => {
      const response = await request(app.getHttpServer()).get(`/spells/${mockSpellId}/translations/de`).expect(404);

      expect(response.body.message).toContain("not found");
    });

    it("should return 400 for invalid MongoDB ID", async () => {
      const response = await request(app.getHttpServer()).get("/spells/invalid-id/translations/en").expect(400);

      expect(response.body.message).toContain("not a valid mongoose id");
    });
  });
});
