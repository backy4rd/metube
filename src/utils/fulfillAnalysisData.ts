import { IVideoAnalysis } from '@interfaces/IVideo';

function processDate(date: Date, unit: 'day' | 'month' | 'year'): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  switch (unit) {
    case 'day':
      return `${year}-${month}-${day}`;
    case 'month':
      return `${year}-${month}`;
    case 'year':
      return `${year}`;
  }
}

export default function fulfillAnalysisData(
  data: IVideoAnalysis,
  {
    unit,
    from,
    uploadedAt,
  }: {
    unit: 'day' | 'month' | 'year';
    from?: string | Date;
    uploadedAt: Date;
  }
): IVideoAnalysis {
  const result: IVideoAnalysis = {
    views: [],
    comments: [],
    videoReactions: [],
  };
  const now = new Date();
  const i = from ? new Date(from) : new Date(uploadedAt);
  while (i <= now) {
    const view = data.views.find((e) => e.date === processDate(i, unit));
    const comment = data.comments.find((e) => e.date === processDate(i, unit));
    const reaction = data.videoReactions.find((e) => e.date === processDate(i, unit));
    result.views.push(view ? view : { date: processDate(i, unit), views: 0 });
    result.comments.push(comment ? comment : { date: processDate(i, unit), comments: 0 });
    result.videoReactions.push(
      reaction ? reaction : { date: processDate(i, unit), likes: 0, dislikes: 0 }
    );

    switch (unit) {
      case 'day':
        i.setDate(i.getDate() + 1);
        break;
      case 'month':
        i.setMonth(i.getMonth() + 1);
        break;
      case 'year':
        i.setFullYear(i.getFullYear() + 1);
        break;
    }
  }
  return result;
}
