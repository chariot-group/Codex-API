import { DtoMapper } from "@/common/mappers/common.mapper";
import { Monster } from "@/resources/monsters/schemas/monster.schema";
import { MonsterContent } from "@/resources/monsters/schemas/monster-content.schema";
import { Condition, Types } from "mongoose";
import { CreateMonsterDto } from "@/resources/monsters/dtos/create-monster.dto";
import { Stats } from "@/resources/monsters/schemas/stats/stats.schema";
import { Speed } from "@/resources/monsters/schemas/stats/sub/speed.schema";
import { AbilityScores } from "@/resources/monsters/schemas/stats/sub/abilityScores.schema";
import { SavingThrows } from "@/resources/monsters/schemas/stats/sub/savingThrows.schema";
import { Skills } from "@/resources/monsters/schemas/stats/sub/skill.schema";
import { Sense } from "@/resources/monsters/schemas/stats/sub/sense";
import { Affinities } from "@/resources/monsters/schemas/affinities/affinities.schema";
import { Ability } from "@/resources/monsters/schemas/ability/ability.schema";
import { Spellcasting } from "@/resources/monsters/schemas/spellcasting/spellcasting.schema";
import { Actions } from "@/resources/monsters/schemas/actions/actions.schema";
import { Action } from "@/resources/monsters/schemas/actions/sub/action.schema";
import { Damage } from "@/resources/monsters/schemas/actions/sub/damage.schema";
import { Challenge } from "@/resources/monsters/schemas/challenge/challenge.schema";
import { Profile } from "@/resources/monsters/schemas/profile/profile.schema";
import { MonsterDto } from "../dtos/content/monster.dto";
import { MonsterTranslationDto } from "../dtos/content/monsterTranslation.dto";
import { StatsDto } from "../dtos/content/stats/stats.dto";
import { AbilityScoresDto } from "../dtos/content/stats/abilityScores/abilityScores.dto";
import { SavingThrowsDto } from "../dtos/content/stats/savingThrows/savingThrows.dto";
import { SpeedDto } from "../dtos/content/stats/speed/speed.dto";
import { SkillsDto } from "../dtos/content/stats/skills/skills.dto";
import { SenseDto } from "../dtos/content/stats/sens/sens.dto";
import { AffinitiesDto } from "../dtos/content/affinities/affinities.dto";
import { AbilityDto } from "../dtos/content/ability/ability.dto";
import { SpellcastingDto } from "../dtos/content/spellCasting/spellCasting.dto";
import { AppearanceDto } from "../dtos/content/appearance/appearance.dto";
import { Appearance } from "../schemas/appearance/appearance.schema";
import { Background } from "../schemas/background/background.schema";
import { BackgroundDto } from "../dtos/content/background/background.dto";
import { TreasureDto } from "../dtos/content/treasure/treasure.dto";
import { Treasure } from "../schemas/treasure/treasure.schema";
import { ConditionsDto } from "../dtos/content/conditions/conditions.dto";
import { Conditions } from "../schemas/conditions/conditions.schema";
import { ActionsDto } from "../dtos/content/actions/actions.dto";
import { ActionDto } from "../dtos/content/actions/action/action.dto";
import { DamageDto } from "../dtos/content/actions/action/damage.dto";
import { DifficultyClassDto } from "../dtos/content/actions/action/dificultyClass.dto";
import { DifficultyClass } from "../schemas/actions/sub/dificultyClass.schema";
import { ChallengeDto } from "../dtos/content/challenge/challenge.dto";
import { ProfileDto } from "../dtos/content/profile/profil.dto";
import { AbilityTranslationDto } from "../dtos/content/ability/abilityTranslation.dto";
import e from "express";
import { ActionTranslationDto } from "../dtos/content/actions/action/actionTranslation.dto";
import { SpellcastingTranslationDto } from "../dtos/content/spellCasting/spellCastingTranslation.dto";

export class MonstersMapper extends DtoMapper<Monster> {
  /**
   * Convert CreateMonsterDto to Monster entity
   * @param dto CreateMonsterDto source
   * @returns Monster entity
   */
  dtoToEntity(dto: CreateMonsterDto): Monster {
    const monster: Monster = new Monster();

    monster.translations = new Map<string, MonsterContent>();
    const monsterContent: MonsterContent = this.dtoMonsterContentToEntity(dto.monsterContent);

    monster.translations.set(dto.lang, monsterContent);
    monster.languages = [dto.lang];

    return monster;
  }

  /**
   * Convert CreateMonsterContentDto to MonsterContent entity
   * @param dto CreateMonsterContentDto source
   * @returns MonsterContent entity
   */
  dtoMonsterContentToEntity(dto: MonsterDto): MonsterContent {
    const monsterContent: MonsterContent = new MonsterContent();

    monsterContent.srd = false; // Par défaut true
    monsterContent.firstname = dto.firstname;
    monsterContent.lastname = dto.lastname;
    monsterContent.surname = dto.surname;
    monsterContent.avatar = dto.avatar;
    monsterContent.hitPointsRoll = dto.hitPointsRoll;

    // Stats
    if (dto.stats) {
      monsterContent.stats = this.dtoStatsToEntity(dto.stats);
    }

    // Affinities
    if (dto.affinities) {
      monsterContent.affinities = this.dtoAffinitiesToEntity(dto.affinities);
    }

    // Abilities
    if (dto.abilities && dto.abilities.length > 0) {
      monsterContent.abilities = dto.abilities.map((ability) => this.dtoAbilityToEntity(ability));
    }

    // Spellcasting
    if (dto.spellcasting && dto.spellcasting.length > 0) {
      monsterContent.spellcasting = dto.spellcasting.map((spellcasting) => this.dtoSpellcastingToEntity(spellcasting));
    }

    if (dto.appearance) {
      monsterContent.appearance = this.dtoAppearanceToEntity(dto.appearance);
    }

    if (dto.background) {
      monsterContent.background = this.dtoBackgroundToEntity(dto.background);
    }

    if (dto.treasure) {
      monsterContent.treasure = this.dtoTreasureToEntity(dto.treasure);
    }

    if (dto.conditions) {
      monsterContent.conditions = this.dtoConditionsToEntity(dto.conditions);
    }

    // Actions
    if (dto.actions) {
      monsterContent.actions = this.dtoActionsToEntity(dto.actions);
    }

    // Challenge
    if (dto.challenge) {
      monsterContent.challenge = this.dtoChallengeToEntity(dto.challenge);
    }

    // Profile
    if (dto.profile) {
      monsterContent.profile = this.dtoProfileToEntity(dto.profile);
    }

    return monsterContent;
  }

  /**
   * Convert CreateMonsterTranslationDto to MonsterContent entity.
   * This method merges the text translations from the DTO with the numeric/game values
   * from the original MonsterContent.
   * @param dto CreateMonsterTranslationDto source with text translations only
   * @param original MonsterContent to copy numeric values from
   * @returns MonsterContent entity with merged values
   */
  dtoTranslationToEntity(dto: MonsterTranslationDto, original: MonsterContent): MonsterContent {
    const monsterContent: MonsterContent = new MonsterContent();

    // Copy numeric values from original
    monsterContent.srd = original.srd;
    monsterContent.createdAt = new Date();
    monsterContent.updatedAt = new Date();

    // Set translated name
    monsterContent.firstname = dto.firstname;
    monsterContent.lastname = dto.lastname;
    monsterContent.surname = dto.surname;
    monsterContent.avatar = original.avatar;

    // Stats: copy numeric values from original, apply translated languages
    if (original.stats) {
      const stats = new Stats();
      stats.size = original.stats.size;
      stats.maxHitPoints = original.stats.maxHitPoints;
      stats.currentHitPoints = original.stats.currentHitPoints;
      stats.tempHitPoints = original.stats.tempHitPoints;
      stats.armorClass = original.stats.armorClass;
      stats.initiative = original.stats.initiative;
      stats.passivePerception = original.stats.passivePerception;
      stats.speed = original.stats.speed;
      stats.abilityScores = original.stats.abilityScores;
      stats.savingThrows = original.stats.savingThrows;
      stats.skills = original.stats.skills;
      stats.senses = original.stats.senses;

      // Apply translated languages if provided, otherwise use original
      stats.languages = dto.stats?.languages ?? original.stats.languages ?? [];

      monsterContent.stats = stats;
    }

    // Affinities: copy entirely from original (not translatable)
    if (original.affinities) {
      const affinities = new Affinities();
      affinities.resistances = dto.affinities?.resistances ?? original.affinities.resistances;
      affinities.vulnerabilities = dto.affinities?.vulnerabilities ?? original.affinities.vulnerabilities;
      affinities.immunities = dto.affinities?.immunities ?? original.affinities.immunities;
      monsterContent.affinities = affinities;
    }

    // Abilities: merge translations with original order
    if (original.abilities && original.abilities.length > 0) {
      monsterContent.abilities = original.abilities.map((originalAbility, index) => {
        const ability = new Ability();
        // If translation is provided for this index, use it
        if (dto.abilities && dto.abilities[index]) {
          ability.name = dto.abilities[index].name;
          ability.description = dto.abilities[index].description;
        } else {
          // Otherwise, keep original values
          ability.name = originalAbility.name;
          ability.description = originalAbility.description;
        }
        return ability;
      });
    }

    // Spellcasting: copy entirely from original (not translatable)
    if (original.spellcasting && original.spellcasting.length > 0) {
      monsterContent.spellcasting = original.spellcasting.map((originalSpellcasting, index) => {
        const spellcasting = new Spellcasting();
        spellcasting.className = dto.spellcasting?.[index]?.className ?? originalSpellcasting.className;
        spellcasting.ability = dto.spellcasting?.[index]?.ability ?? originalSpellcasting.ability;
        spellcasting.saveDC = originalSpellcasting.saveDC;
        spellcasting.attackBonus = originalSpellcasting.attackBonus;
        spellcasting.spellSlotsByLevel = originalSpellcasting.spellSlotsByLevel;
        spellcasting.totalSlots = originalSpellcasting.totalSlots;
        spellcasting.spells = originalSpellcasting.spells;
        return spellcasting;
      });
    }

    if (original.appearance) {
      const appearance = new Appearance();
      appearance.age = original.appearance.age;
      appearance.height = original.appearance.height;
      appearance.weight = original.appearance.weight;
      appearance.eyes = dto.appearance?.eyes ?? original.appearance.eyes;
      appearance.skin = dto.appearance?.skin ?? original.appearance.skin;
      appearance.hair = dto.appearance?.hair ?? original.appearance.hair;
      appearance.description = dto.appearance?.description ?? original.appearance.description;
      monsterContent.appearance = appearance;
    }

    if (original.background) {
      const background = new Background();
      background.personalityTraits = dto.background?.personalityTraits ?? original.background.personalityTraits;
      background.ideals = dto.background?.ideals ?? original.background.ideals;
      background.bonds = dto.background?.bonds ?? original.background.bonds;
      background.flaws = dto.background?.flaws ?? original.background.flaws;
      background.alliesAndOrgs = dto.background?.alliesAndOrgs ?? original.background.alliesAndOrgs;
      background.backstory = dto.background?.backstory ?? original.background.backstory;
      monsterContent.background = background;
    }

    if (original.treasure) {
      const treasure = new Treasure();
      treasure.cp = original.treasure.cp;
      treasure.sp = original.treasure.sp;
      treasure.ep = original.treasure.ep;
      treasure.gp = original.treasure.gp;
      treasure.pp = original.treasure.pp;
      treasure.treasure = dto.treasure?.treasure ?? original.treasure.treasure;
      treasure.equipment = dto.treasure?.equipment ?? original.treasure.equipment;
      monsterContent.treasure = treasure;
    }

    monsterContent.conditions = original.conditions;

    // Actions: merge translated name/description with original numeric values
    if (original.actions) {
      const actions = new Actions();

      // Helper function to merge action arrays
      const mergeActions = (
        originalActions: Action[],
        translatedActions?: ActionTranslationDto[],
      ): Action[] => {
        return originalActions.map((originalAction, index) => {
          const action = new Action();
          // Copy all numeric/game values from original
          action.attackBonus = originalAction.attackBonus;
          action.cost = originalAction.cost;
          action.dc.dcValue = originalAction.dc?.dcValue;

          // Apply translated name/description if provided
          action.name = translatedActions[index].name ?? originalAction.name;
          action.type = translatedActions[index].type ?? originalAction.type;
          action.description = translatedActions[index].description ?? originalAction.description;
          action.range = originalAction.range;

          action.dc.dcType = translatedActions[index].dc.dcType ?? originalAction.dc?.dcType;
          action.dc.successType = translatedActions[index].dc.successType ?? originalAction.dc?.successType;

          //update damage
          for (let i = 0; i < action.damage.length; i++) {
              action.damage[i].type = translatedActions[index].damage[i].type ?? originalAction.damage[i].type;
              action.damage[i].dice = originalAction.damage[i].dice;
          }
            
          return action;
        });
      };

      actions.standard = mergeActions(original.actions.standard ?? [], dto.actions?.standard);
      actions.legendary = mergeActions(original.actions.legendary ?? [], dto.actions?.legendary);
      actions.lair = mergeActions(original.actions.lair ?? [], dto.actions?.lair);

      monsterContent.actions = actions;
    }

    // Challenge: copy entirely from original (not translatable)
    monsterContent.challenge = original.challenge;

    // Profile: merge translated values with original
    if (original.profile) {
      const profile = new Profile();
      profile.type = dto.profile?.type ?? original.profile.type;
      profile.subtype = dto.profile?.subtype ?? original.profile.subtype;
      profile.alignment = original.profile.alignment;
      monsterContent.profile = profile;
    }

    monsterContent.hitPointsRoll = original.hitPointsRoll;

    return monsterContent;
  }

  /**
   * Update an existing MonsterContent translation with partial text data.
   * This method only updates textual fields while preserving all numeric/game values.
   * Uses the same rules as dtoTranslationToEntity for consistency.
   *
   * @param dto UpdateMonsterTranslationDto with partial text translations
   * @param existing Current MonsterContent to update
   * @returns Record of field paths and values to update in MongoDB
   */
  updateTranslationEntity(dto: MonsterTranslationDto, existing: MonsterContent): Record<string, any> {
    const updateFields: Record<string, any> = {};

    // Update name if provided
    updateFields["firstname"] = dto.firstname ?? existing.firstname;
    updateFields["lastname"] = dto.lastname ?? existing.lastname;
    updateFields["surname"] = dto.surname ?? existing.surname;

    // Stats: only languages can be updated (other values are numeric)
    if (dto.stats?.languages !== undefined) {
      // Create new stats object preserving all numeric values
      const stats = new Stats();
      stats.size = existing.stats?.size ?? "Tiny";
      stats.maxHitPoints = existing.stats?.maxHitPoints ?? 0;
      stats.currentHitPoints = existing.stats?.currentHitPoints ?? 0;
      stats.tempHitPoints = existing.stats?.tempHitPoints ?? 0;
      stats.armorClass = existing.stats?.armorClass ?? 10;
      stats.initiative = existing.stats?.initiative ?? 0;
      stats.passivePerception = existing.stats?.passivePerception ?? 0;
      stats.speed = existing.stats?.speed;
      stats.abilityScores = existing.stats?.abilityScores;
      stats.savingThrows = existing.stats?.savingThrows;
      stats.skills = existing.stats?.skills;
      stats.senses = existing.stats?.senses;
      stats.languages = dto.stats.languages;
      updateFields["stats"] = stats;
    }

    if (dto.affinities !== undefined) {
      const affinities = new Affinities();
      affinities.resistances = dto.affinities?.resistances ?? existing.affinities?.resistances;
      affinities.vulnerabilities = dto.affinities?.vulnerabilities ?? existing.affinities?.vulnerabilities;
      affinities.immunities = dto.affinities?.immunities ?? existing.affinities?.immunities;
      updateFields["affinities"] = affinities;
    }

    // Abilities: update name and description only
    if (dto.abilities !== undefined && existing.abilities && existing.abilities.length > 0) {
      updateFields["abilities"] = this.mergeAbilities(existing.abilities, dto.abilities);
    }

    if (dto.spellcasting !== undefined && existing.spellcasting && existing.spellcasting.length > 0) {
      updateFields["spellcasting"] = this.mergeSpellcasting(existing.spellcasting, dto.spellcasting);
    }

    if (dto.appearance !== undefined && existing.appearance) {
      const appearance = new Appearance();
      appearance.age = existing.appearance.age;
      appearance.height = existing.appearance.height;
      appearance.weight = existing.appearance.weight;
      appearance.eyes = dto.appearance.eyes ?? existing.appearance.eyes;
      appearance.skin = dto.appearance.skin ?? existing.appearance.skin;
      appearance.hair = dto.appearance.hair ?? existing.appearance.hair;
      appearance.description = dto.appearance.description ?? existing.appearance.description;
      updateFields["appearance"] = appearance;
    }

    if (dto.background !== undefined && existing.background) {
      const background = new Background();
      background.personalityTraits = dto.background.personalityTraits ?? existing.background.personalityTraits;
      background.ideals = dto.background.ideals ?? existing.background.ideals;
      background.bonds = dto.background.bonds ?? existing.background.bonds;
      background.flaws = dto.background.flaws ?? existing.background.flaws;
      background.alliesAndOrgs = dto.background.alliesAndOrgs ?? existing.background.alliesAndOrgs;
      background.backstory = dto.background.backstory ?? existing.background.backstory;
      updateFields["background"] = background;
    }

    if (dto.treasure !== undefined && existing.treasure) {
      const treasure = new Treasure();
      treasure.cp = existing.treasure.cp;
      treasure.sp = existing.treasure.sp;
      treasure.ep = existing.treasure.ep;
      treasure.gp = existing.treasure.gp;
      treasure.pp = existing.treasure.pp;
      treasure.treasure = dto.treasure.treasure ?? existing.treasure.treasure;
      treasure.equipment = dto.treasure.equipment ?? existing.treasure.equipment;
      updateFields["treasure"] = treasure;
    }

    updateFields["conditions"] = existing.conditions;

    // Actions: update name and description only, preserve numeric values
    if (dto.actions !== undefined && existing.actions) {
      updateFields["actions"] = this.mergeActionsForUpdate(existing.actions, dto.actions);
    }

    updateFields["challenge"] = existing.challenge;

    // Profile: update textual fields only
    if (dto.profile !== undefined && existing.profile) {
      const profile = new Profile();
      profile.type = dto.profile.type ?? existing.profile.type;
      profile.subtype = dto.profile.subtype ?? existing.profile.subtype;
      profile.alignment = existing.profile.alignment;
      updateFields["profile"] = profile;
    }

    updateFields["hitPointsRoll"] = existing.hitPointsRoll;

    return updateFields;
  }

  /**
   * Helper method to merge ability translations with existing abilities.
   * Preserves the original abilities array structure, only updating name and description.
   */
  private mergeAbilities(existingAbilities: Ability[], translatedAbilities: AbilityTranslationDto[]): Ability[] {
    return existingAbilities.map((existingAbility, index) => {
      const ability = new Ability();
      if (translatedAbilities[index]) {
        ability.name = translatedAbilities[index].name ?? existingAbility.name;
        ability.description = translatedAbilities[index].description ?? existingAbility.description;
      } else {
        ability.name = existingAbility.name;
        ability.description = existingAbility.description;
      }
      return ability;
    });
  }

  /**
   * Helper method to merge action translations with existing actions.
   * Preserves all numeric values (attackBonus, damage, etc.), only updates name and description.
   */
  private mergeActionsForUpdate(
    existingActions: Actions,
    translatedActions: {
      standard?: ActionTranslationDto[];
      legendary?: ActionTranslationDto[];
      lair?: ActionTranslationDto[];
    },
  ): Actions {
    const actions = new Actions();

    // Helper function to merge action arrays
    const mergeActionArray = (
      existingArray: Action[] | undefined,
      translatedArray?: ActionTranslationDto[],
    ): Action[] => {
      if (!existingArray) return [];
      return existingArray.map((existingAction, index) => {
        const action = new Action();
        // Preserve all numeric/game values
        action.attackBonus = existingAction.attackBonus;
        action.cost = existingAction.cost;

        action.dc.dcValue = existingAction.dc?.dcValue;

        // Apply translations if provided
        action.name = translatedArray[index].name ?? existingAction.name;
        action.description = translatedArray[index].description ?? existingAction.description;
        action.type = translatedArray[index].type ?? existingAction.type;

        action.range = existingAction.range;


        action.dc.dcType = translatedArray[index].dc.dcType ?? existingAction.dc?.dcType;
        action.dc.successType = translatedArray[index].dc.successType ?? existingAction.dc?.successType;

        //update damage
        for (let i = 0; i < action.damage.length; i++) {
          action.damage[i].type = translatedArray[index].damage[i].type ?? existingAction.damage[i].type;
          action.damage[i].dice = existingAction.damage[i].dice;
        }
        
        return action;
      });
    };

    actions.standard = mergeActionArray(existingActions.standard, translatedActions.standard);
    actions.legendary = mergeActionArray(existingActions.legendary, translatedActions.legendary);
    actions.lair = mergeActionArray(existingActions.lair, translatedActions.lair);

    return actions;
  }

  private mergeSpellcasting(existingSpellcasting: Spellcasting[], translatedSpellcasting: SpellcastingTranslationDto[]): Spellcasting[] {
  
    return existingSpellcasting.map((existingSpellcasting, index) => {
      const spellcasting = new Spellcasting();
      if (translatedSpellcasting[index]) {
        spellcasting.className = translatedSpellcasting[index].className ?? existingSpellcasting.className;
        spellcasting.ability = translatedSpellcasting[index].ability ?? existingSpellcasting.ability;
        spellcasting.saveDC = existingSpellcasting.saveDC;
        spellcasting.attackBonus = existingSpellcasting.attackBonus;
        spellcasting.spellSlotsByLevel = existingSpellcasting.spellSlotsByLevel;
        spellcasting.totalSlots = existingSpellcasting.totalSlots;
        spellcasting.spells = existingSpellcasting.spells;
      } else {
        spellcasting.className = existingSpellcasting.className;
        spellcasting.ability = existingSpellcasting.ability;
        spellcasting.saveDC = existingSpellcasting.saveDC;
        spellcasting.attackBonus = existingSpellcasting.attackBonus;
        spellcasting.spellSlotsByLevel = existingSpellcasting.spellSlotsByLevel;
        spellcasting.totalSlots = existingSpellcasting.totalSlots;
        spellcasting.spells = existingSpellcasting.spells;
      }
      return spellcasting;
    });
  }

  /**
   * Convert CreateStatsDto to Stats entity
   * @param dto CreateStatsDto source
   * @returns Stats entity
   */
  public dtoStatsToEntity(dto: StatsDto): Stats {
    const stats: Stats = new Stats();

    stats.size = dto.size ?? "Tiny";
    stats.maxHitPoints = dto.maxHitPoints ?? 0;
    stats.currentHitPoints = dto.currentHitPoints ?? dto.maxHitPoints ?? 0;
    stats.tempHitPoints = dto.tempHitPoints ?? 0;
    stats.armorClass = dto.armorClass ?? 10;
    stats.initiative = dto.initiative ?? 0;
    stats.passivePerception = dto.passivePerception ?? 0;
    stats.languages = dto.languages ?? [];
    
    // Ability Scores
    if (dto.abilityScores) {
      stats.abilityScores = this.dtoAbilityScoresToEntity(dto.abilityScores);
    }

    // Saving Throws
    if (dto.savingThrows) {
      stats.savingThrows = this.dtoSavingThrowsToEntity(dto.savingThrows);
    }

    // Speed
    if (dto.speed) {
      stats.speed = this.dtoSpeedToEntity(dto.speed);
    }

    // Skills
    if (dto.skills) {
      stats.skills = this.dtoSkillsToEntity(dto.skills);
    }

    // Senses
    if (dto.senses && dto.senses.length > 0) {
      stats.senses = dto.senses.map((sense) => this.dtoSenseToEntity(sense));
    }

    return stats;
  }

  /**
   * Convert CreateSpeedDto to Speed entity
   * @param dto CreateSpeedDto source
   * @returns Speed entity
   */
  private dtoSpeedToEntity(dto: SpeedDto): Speed {
    const speed: Speed = new Speed();

    speed.walk = dto.walk;
    speed.climb = dto.climb;
    speed.swim = dto.swim;
    speed.fly = dto.fly;
    speed.burrow = dto.burrow;

    return speed;
  }

  /**
   * Convert CreateAbilityScoresDto to AbilityScores entity
   * @param dto CreateAbilityScoresDto source
   * @returns AbilityScores entity
   */
  private dtoAbilityScoresToEntity(dto: AbilityScoresDto): AbilityScores {
    const abilityScores: AbilityScores = new AbilityScores();

    abilityScores.strength = dto.strength ?? 10;
    abilityScores.dexterity = dto.dexterity ?? 10;
    abilityScores.constitution = dto.constitution ?? 10;
    abilityScores.intelligence = dto.intelligence ?? 10;
    abilityScores.wisdom = dto.wisdom ?? 10;
    abilityScores.charisma = dto.charisma ?? 10;

    return abilityScores;
  }

  /**
   * Convert CreateSavingThrowsDto to SavingThrows entity
   * @param dto CreateSavingThrowsDto source
   * @returns SavingThrows entity
   */
  private dtoSavingThrowsToEntity(dto: SavingThrowsDto): SavingThrows {
    const savingThrows: SavingThrows = new SavingThrows();

    savingThrows.strength = dto.strength ?? 0;
    savingThrows.dexterity = dto.dexterity ?? 0;
    savingThrows.constitution = dto.constitution ?? 0;
    savingThrows.intelligence = dto.intelligence ?? 0;
    savingThrows.wisdom = dto.wisdom ?? 0;
    savingThrows.charisma = dto.charisma ?? 0;

    return savingThrows;
  }

  /**
   * Convert CreateSkillsDto to Skills entity
   * @param dto CreateSkillsDto source
   * @returns Skills entity
   */
  private dtoSkillsToEntity(dto: SkillsDto): Skills {
    const skills: Skills = new Skills();

    skills.athletics = dto.athletics ?? 0;
    skills.acrobatics = dto.acrobatics ?? 0;
    skills.sleightHand = dto.sleightHand ?? 0;
    skills.stealth = dto.stealth ?? 0;
    skills.arcana = dto.arcana ?? 0;
    skills.history = dto.history ?? 0;
    skills.investigation = dto.investigation ?? 0;
    skills.nature = dto.nature ?? 0;
    skills.religion = dto.religion ?? 0;
    skills.animalHandling = dto.animalHandling ?? 0;
    skills.insight = dto.insight ?? 0;
    skills.medicine = dto.medicine ?? 0;
    skills.perception = dto.perception ?? 0;
    skills.survival = dto.survival ?? 0;
    skills.deception = dto.deception ?? 0;
    skills.intimidation = dto.intimidation ?? 0;
    skills.performance = dto.performance ?? 0;
    skills.persuasion = dto.persuasion ?? 0;

    return skills;
  }

  /**
   * Convert CreateSenseDto to Sense entity
   * @param dto CreateSenseDto source
   * @returns Sense entity
   */
  private dtoSenseToEntity(dto: SenseDto): Sense {
    const sense: Sense = new Sense();

    sense.name = dto.name;
    sense.value = dto.value;

    return sense;
  }

  /**
   * Convert CreateAffinitiesDto to Affinities entity
   * @param dto CreateAffinitiesDto source
   * @returns Affinities entity
   */
  public dtoAffinitiesToEntity(dto: AffinitiesDto): Affinities {
    const affinities: Affinities = new Affinities();

    affinities.resistances = dto.resistances ?? [];
    affinities.immunities = dto.immunities ?? [];
    affinities.vulnerabilities = dto.vulnerabilities ?? [];

    return affinities;
  }

  /**
   * Convert CreateAbilityDto to Ability entity
   * @param dto CreateAbilityDto source
   * @returns Ability entity
   */
  public dtoAbilityToEntity(dto: AbilityDto): Ability {
    const ability: Ability = new Ability();

    ability.name = dto.name;
    ability.description = dto.description;

    return ability;
  }

  public dtoAppearanceToEntity(dto: AppearanceDto): Appearance {
    const appearance: Appearance = new Appearance();

    appearance.age = dto.age;
    appearance.height = dto.height;
    appearance.weight = dto.weight;
    appearance.eyes = dto.eyes;
    appearance.skin = dto.skin;
    appearance.hair = dto.hair;
    appearance.description = dto.description;

    return appearance;
  }

  public dtoBackgroundToEntity(dto: BackgroundDto): Background {
    const background: Background = new Background();

    background.personalityTraits = dto.personalityTraits;
    background.ideals = dto.ideals;
    background.bonds = dto.bonds;
    background.flaws = dto.flaws;
    background.alliesAndOrgs = dto.alliesAndOrgs;
    background.backstory = dto.backstory;

    return background;
  }

  public dtoTreasureToEntity(dto: TreasureDto): Treasure {
    const treasure: Treasure = new Treasure();

    treasure.cp = dto.cp ?? 0;
    treasure.sp = dto.sp ?? 0;
    treasure.ep = dto.ep ?? 0;
    treasure.gp = dto.gp ?? 0;
    treasure.pp = dto.pp ?? 0;
    treasure.treasure = dto.treasure;
    treasure.equipment = dto.equipment;

    return treasure;
  }

  public dtoConditionsToEntity(dto: ConditionsDto): Conditions {
    const conditions: Conditions = new Conditions();

    conditions.blinded = dto.blinded ?? false;
    conditions.charmed = dto.charmed ?? false;
    conditions.deafened = dto.deafened ?? false;
    conditions.frightened = dto.frightened ?? false;
    conditions.grappled = dto.grappled ?? false;
    conditions.incapacitated = dto.incapacitated ?? false;
    conditions.invisible = dto.invisible ?? false;
    conditions.paralyzed = dto.paralyzed ?? false;
    conditions.petrified = dto.petrified ?? false;
    conditions.poisoned = dto.poisoned ?? false;
    conditions.prone = dto.prone ?? false;
    conditions.restrained = dto.restrained ?? false;
    conditions.stunned = dto.stunned ?? false;
    conditions.unconscious = dto.unconscious ?? false;

    return conditions;
  }

  /**
   * Convert CreateSpellcastingDto to Spellcasting entity
   * @param dto CreateSpellcastingDto source
   * @returns Spellcasting entity
   */
  public dtoSpellcastingToEntity(dto: SpellcastingDto): Spellcasting {
    const spellcasting: Spellcasting = new Spellcasting();

    spellcasting.className = dto.className
    spellcasting.ability = dto.ability;
    spellcasting.saveDC = dto.saveDC;
    spellcasting.attackBonus = dto.attackBonus ?? 0;
    spellcasting.totalSlots = dto.totalSlots ?? 0;

    // Safely convert spell IDs, filtering out invalid ones
    spellcasting.spells =
      dto.spells
        ?.filter((id) => typeof id === "string" && id.length === 24 && Types.ObjectId.isValid(id))
        .map((id) => new Types.ObjectId(id)) ?? [];

    // Convert spellSlotsByLevel (Record ou Map)
    if (dto.spellSlotsByLevel) {
      if (dto.spellSlotsByLevel instanceof Map) {
        spellcasting.spellSlotsByLevel = dto.spellSlotsByLevel;
      } else {
        // Convert Record to Map
        spellcasting.spellSlotsByLevel = new Map<number, { total?: number; used?: number }>(
          Object.entries(dto.spellSlotsByLevel).map(([key, value]) => [Number(key), value]),
        );
      }
    }

    return spellcasting;
  }

  /**
   * Convert CreateActionsDto to Actions entity
   * @param dto CreateActionsDto source
   * @returns Actions entity
   */
  public dtoActionsToEntity(dto: ActionsDto): Actions {
    const actions: Actions = new Actions();

    actions.standard = dto.standard?.map((action) => this.dtoActionToEntity(action)) ?? [];
    actions.legendary = dto.legendary?.map((action) => this.dtoActionToEntity(action)) ?? [];
    actions.lair = dto.lair?.map((action) => this.dtoActionToEntity(action)) ?? [];

    return actions;
  }

  /**
   * Convert CreateActionDto to Action entity
   * @param dto CreateActionDto source
   * @returns Action entity
   */
  private dtoActionToEntity(dto: ActionDto): Action {
    const action: Action = new Action();

    action.name = dto.name;
    action.type = dto.type;
    action.description = dto.description;
    action.attackBonus = dto.attackBonus;
    action.range = dto.range;
    action.cost = dto.cost;

    // Damage
    if (dto.damage && dto.damage.length > 0) {
      action.damage = dto.damage.map((damage) => this.dtoDamageToEntity(damage));
    }

    if (dto.dc) {
      action.dc = this.dtoDifficultyClassToEntity(dto.dc);
    }

    return action;
  }

  /**
   * Convert CreateDamageDto to Damage entity
   * @param dto CreateDamageDto source
   * @returns Damage entity
   */
  private dtoDamageToEntity(dto: DamageDto): Damage {
    const damage: Damage = new Damage();

    damage.dice = dto.dice;
    damage.type = dto.type;

    return damage;
  }

  private dtoDifficultyClassToEntity(dto: DifficultyClassDto): DifficultyClass {
    const dc: DifficultyClass = new DifficultyClass();

    dc.dcType = dto.dcType;
    dc.dcValue = dto.dcValue;
    dc.successType = dto.successType;

    return dc;
  
  }

  /**
   * Convert CreateChallengeDto to Challenge entity
   * @param dto CreateChallengeDto source
   * @returns Challenge entity
   */
  public dtoChallengeToEntity(dto: ChallengeDto): Challenge {
    const challenge: Challenge = new Challenge();

    challenge.challengeRating = dto.challengeRating;
    challenge.experiencePoints = dto.experiencePoints;

    return challenge;
  }

  /**
   * Convert CreateProfileDto to Profile entity
   * @param dto CreateProfileDto source
   * @returns Profile entity
   */
  public dtoProfileToEntity(dto: ProfileDto): Profile {
    const profile: Profile = new Profile();

    profile.type = dto.type;
    profile.subtype = dto.subtype;
    profile.alignment = dto.alignment;

    return profile;
  }
}
