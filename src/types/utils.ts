/** * Inspired by https://effectivetypescript.com/ ** */

type KVPair = { k: PropertyKey; v: unknown };

type OmitKV<T extends KVPair, V> = T extends { v: V } ? never : T;

type PickKV<T extends KVPair, V> = T extends { v: V } ? T : never;

type SwapKV<T> = T extends { k: infer K; v: infer V }
  ? V extends PropertyKey
    ? { k: V; v: K }
    : never
  : never;

export type Jsonify<T> = T extends { toJSON(): infer U }
  ? U
  : T extends object
  ? {
      [k in keyof T]: Jsonify<T[k]>;
    }
  : T;

export type Unionize<T extends object> = {
  [k in keyof T]: { k: k; v: T[k] };
}[keyof T];

export type Objectify<T extends KVPair> = {
  [k in T["k"]]: Extract<T, { k: k }>["v"];
};

export type PickProperties<T extends object, V> = Objectify<PickKV<Unionize<T>, V>>;

export type OmitProperties<T extends object, V> = Objectify<OmitKV<Unionize<T>, V>>;

export type PickKeys<T extends object, V> = Extract<Unionize<T>, { v: V }>["k"];

export type OmitKeys<T extends object, V> = Exclude<Unionize<T>, { v: V }>["k"];

export type Inverted<T extends object> = Objectify<SwapKV<Unionize<T>>>;
