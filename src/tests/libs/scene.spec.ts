import { describe, expect, test, vi } from "vitest";
import { Scene } from "../../libs/Scene";
import { Player } from "../../component/Player";
import { Block } from "../../component/Block";
import { Hitbox } from "../../component/Hitbox";

describe("Scene test suits", () => {
  test("should registers system correctly", () => {
    const mockSystem = vi.fn(() => {});

    const scene = new Scene();

    expect(scene.systems.length).toBe(0);

    scene.registerSystem(mockSystem);

    expect(scene.systems.length).toBe(1);
    expect(scene.systems[0]).toBe(mockSystem);
  });

  test("should registers component correctly", () => {
    const entityId = "id";
    const mockComponent = vi.fn(class {});

    const scene = new Scene();

    expect(scene.componentMaps.Player.get(entityId)).toBe(undefined);

    scene.registerComponent(entityId, "Player", mockComponent);

    expect(scene.componentMaps.Player.get(entityId)).toBe(mockComponent);
  });

  test("should registers multiple component correctly", () => {
    const entityId = "id";
    const player = new Player();
    const block = new Block();
    const hitbox = new Hitbox(0, 0, 0, 0);

    const scene = new Scene();

    expect(scene.componentMaps.Player.get(entityId)).toBe(undefined);
    expect(scene.componentMaps.Block.get(entityId)).toBe(undefined);
    expect(scene.componentMaps.Hitbox.get(entityId)).toBe(undefined);

    scene.registerComponents(entityId, [player, block, hitbox]);

    expect(scene.componentMaps.Player.get(entityId)).toBe(player);
    expect(scene.componentMaps.Block.get(entityId)).toBe(block);
    expect(scene.componentMaps.Hitbox.get(entityId)).toBe(hitbox);
  });

  test("should call every system on update", () => {
    const deltaTime = 0;

    const mockSystem = vi.fn(() => {});
    const mockSystem2 = vi.fn(() => {});
    const mockSystem3 = vi.fn(() => {});
    const mockSystem4 = vi.fn(() => {});

    const scene = new Scene();

    scene.registerSystem(mockSystem);
    scene.registerSystem(mockSystem2);
    scene.registerSystem(mockSystem3);
    scene.registerSystem(mockSystem4);

    scene.update(deltaTime);

    expect(mockSystem).toHaveBeenCalledOnce();
    expect(mockSystem).toHaveBeenCalledWith(scene, deltaTime);

    expect(mockSystem2).toHaveBeenCalledOnce();
    expect(mockSystem2).toHaveBeenCalledWith(scene, deltaTime);

    expect(mockSystem3).toHaveBeenCalledOnce();
    expect(mockSystem3).toHaveBeenCalledWith(scene, deltaTime);

    expect(mockSystem4).toHaveBeenCalledOnce();
    expect(mockSystem4).toHaveBeenCalledWith(scene, deltaTime);
  });

  test("should remove entity components", () => {
    const entityId = "id";
    const player = new Player();
    const block = new Block();
    const hitbox = new Hitbox(0, 0, 0, 0);

    const scene = new Scene();

    scene.registerComponents(entityId, [player, block, hitbox]);

    expect(scene.componentMaps.Player.get(entityId)).toBe(player);
    expect(scene.componentMaps.Block.get(entityId)).toBe(block);
    expect(scene.componentMaps.Hitbox.get(entityId)).toBe(hitbox);

    scene.removeEntityComponents(entityId);

    expect(scene.componentMaps.Player.get(entityId)).toBe(undefined);
    expect(scene.componentMaps.Block.get(entityId)).toBe(undefined);
    expect(scene.componentMaps.Hitbox.get(entityId)).toBe(undefined);
  });

  test("should return 0 components from query", () => {
    const entityId = "id";
    const player = new Player();
    const block = new Block();
    const hitbox = new Hitbox(0, 0, 0, 0);

    const scene = new Scene();

    scene.registerComponents(entityId, [player, block, hitbox]);

    const componentIds = scene.query(["Animation", "Block", "Hitbox"]);

    expect(componentIds.length).toBe(0);
  });

  test("should return correct components from query", () => {
    const entityId = "id";
    const player = new Player();
    const block = new Block();
    const hitbox = new Hitbox(0, 0, 0, 0);

    const scene = new Scene();

    scene.registerComponents(entityId, [player, block, hitbox]);

    const componentIds = scene.query(["Player", "Block", "Hitbox"]);

    const playerComponent = scene.componentMaps.Player.get(componentIds[0]);
    const blockComponent = scene.componentMaps.Block.get(componentIds[0]);
    const hitboxComponent = scene.componentMaps.Hitbox.get(componentIds[0]);

    expect(componentIds.length).toBe(1);
    expect(playerComponent).toBe(player);
    expect(blockComponent).toBe(block);
    expect(hitboxComponent).toBe(hitbox);
  });
});
