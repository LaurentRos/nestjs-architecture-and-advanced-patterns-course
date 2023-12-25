export type SerializedEventPayload<T> = T extends object
  ? {
      [K in keyof T]: T[K] extends { toJSON(): infer U }
        ? U
        : SerializedEventPayload<T[K]>;
    }
  : T;

export interface SerializableEvent<T = any> {
  streamId: string;
  type: string;
  position: number;
  data: SerializedEventPayload<T>;
}
