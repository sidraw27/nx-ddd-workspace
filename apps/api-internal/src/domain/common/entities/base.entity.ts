export interface EntityProps {
  id: string|number|unknown
  [index: string]: any
}

export abstract class Entity<T extends EntityProps> {
  public readonly id;
  protected readonly props: T;

  protected constructor(props: T) {
    this.id = props.id;
    this.props = Object.freeze(props);
  }
}
