import { DeepPartial } from 'typeorm';

export abstract class BaseEntity {
  protected constructor(input?: DeepPartial<BaseEntity>) {
    if (input) {
      for (const [key, descriptor] of Object.entries(
        Object.getOwnPropertyDescriptors(input),
      )) {
        if (descriptor.get && !descriptor.set) {
          continue;
        }
        (this as any)[key] = descriptor.value;
      }
    }
  }
}
