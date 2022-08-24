import {BigInt} from "@graphprotocol/graph-ts";
import {Gained, Leveled, Spended} from "../generated/Level/Level";
import {LevelAndShadeEntity} from "../generated/schema";

export function handleGained(event: Gained): void {
  let id =
    event.params.collection.toHex() + "-" + event.params.tokenId.toString();
  let entity = LevelAndShadeEntity.load(id);

  if (!entity) {
    entity = new LevelAndShadeEntity(id);
    entity.collection = event.params.collection;
    entity.tokenId = event.params.tokenId;
  }

  if (!entity.shade) {
    entity.shade = event.params.amount;
  } else {
    entity.shade = entity.shade!.plus(event.params.amount);
  }

  entity.save();
}

export function handleLeveled(event: Leveled): void {
  let id =
    event.params.collection.toHex() + "-" + event.params.tokenId.toString();
  let entity = LevelAndShadeEntity.load(id);

  if (!entity) {
    entity = new LevelAndShadeEntity(id);
    entity.collection = event.params.collection;
    entity.tokenId = event.params.tokenId;
  }

  entity.level = event.params.level;

  entity.save();
}

export function handleSpended(event: Spended): void {
  let id =
    event.params.collection.toHex() + "-" + event.params.tokenId.toString();
  let entity = LevelAndShadeEntity.load(id);

  if (!entity) {
    entity = new LevelAndShadeEntity(id);
    entity.collection = event.params.collection;
    entity.tokenId = event.params.tokenId;
  }

  if (!entity.shade) {
    entity.shade = BigInt.fromI32(0);
  } else {
    entity.shade = entity.shade!.minus(event.params.amount);
  }

  entity.save();
}
