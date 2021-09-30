export function isSkeleton(obj: any): obj is ISkeleton {
  return 'bone' in obj;
}

export default interface ISkeleton {
  bone: number;
}
