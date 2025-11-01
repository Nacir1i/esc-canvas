import { InputManager } from "./InputManager";
import { components, type ComponentName } from "../component";

type System = (scene: Scene, deltaTIme: number) => void;
export type ComponentMaps = {
  [C in ComponentName]: Map<string, InstanceType<(typeof components)[C]>>;
};

export class Scene {
  systems: System[] = [];
  inputManager: InputManager;
  componentMaps: ComponentMaps;

  constructor() {
    this.inputManager = new InputManager();

    this.componentMaps = Object.keys(components).reduce((acc, key) => {
      const componentName = key as ComponentName;
      acc[componentName] = new Map();
      return acc;
    }, {} as Partial<ComponentMaps>) as ComponentMaps;
  }

  update(deltaTime: number) {
    for (const system of this.systems) {
      system(this, deltaTime);
    }
  }

  private queryCache: Map<string, string[]> = new Map();

  public registerSystem(system: System) {
    this.systems.push(system);
  }

  public registerComponent<C extends ComponentName>(
    entityId: string,
    name: C,
    component: InstanceType<(typeof components)[C]>
  ) {
    this.componentMaps[name].set(entityId, component);
  }

  public registerComponents(
    entityId: string,
    componentsToAdd: InstanceType<(typeof components)[ComponentName]>[]
  ) {
    for (const componentInstance of componentsToAdd) {
      const componentName = componentInstance.constructor.name;

      if (componentName in this.componentMaps) {
        const name = componentName as ComponentName;

        this.componentMaps[name].set(entityId, componentInstance as any);
      } else {
        console.warn(
          `Component class "${componentName}" is not registered in your 'components' object.`
        );
      }
    }
  }

  public removeEntityComponents(id: string) {
    Object.values(this.componentMaps).map((map) => {
      map.delete(id);
    });

    this.queryCache.clear();
  }

  public query(componentNames: ComponentName[]): string[] {
    const queryKey = componentNames.sort().join(",");

    if (this.queryCache.has(queryKey)) {
      return this.queryCache.get(queryKey)!;
    }

    const componentMaps = componentNames.map(
      (name) => this.componentMaps[name]
    );
    const smallestMap = componentMaps.sort((a, b) => a.size - b.size)[0];
    const otherMaps = componentMaps.slice(1);

    const result: string[] = [];
    for (const entityId of smallestMap.keys()) {
      const hasAllComponents = otherMaps.every((map) => map.has(entityId));
      if (hasAllComponents) {
        result.push(entityId);
      }
    }

    this.queryCache.set(queryKey, result);
    return result;
  }
}
