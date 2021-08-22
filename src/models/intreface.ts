export default interface IModel<T> {
  getAll: () => Promise<T[]>;
  readonly getById: (id: string) => Promise<T>;
  //   getByProperties: (props: object) => Promise<T[]>;
  create: (props: T) => Promise<T>;
  updateById: (id: string, props: any) => Promise<T>;
  //   deleteById: (id: string) => Promise<T>;
}
