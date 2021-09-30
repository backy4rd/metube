import ISkeleton from '@interfaces/ISkeleton';

export default function generateSkeletons(length: number): Array<ISkeleton> {
  return new Array<ISkeleton>(Math.floor(length))
    .fill(0 as any)
    .map(() => ({ bone: Math.random() }));
}
