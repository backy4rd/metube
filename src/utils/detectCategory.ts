import IVideo from '@interfaces/IVideo';

/** return the category that all videos have (just return 1 category) */
export default function detectCategory(videos: Array<IVideo>): string | undefined {
  const map = new Map<string, number>();

  videos.forEach((video) => {
    video.categories.forEach(({ category }) => {
      const value = map.get(category);
      if (!value) {
        map.set(category, 1);
      } else {
        map.set(category, value + 1);
      }
    });
  });

  // @ts-ignore
  for (const [key, value] of map) {
    if (value === videos.length) return key;
  }
}
