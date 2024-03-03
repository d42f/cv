export interface IResumePoint {
  title: string;
  date_from: string;
  date_to: string | null;
  description: string;
}

export interface IResume {
  name: string;
  position: string;
  email: string;
  phone?: string;
  telegram?: string;
  address: string;
  links: Record<string, string>;
  skills: string;
  methodologies: string;
  languages: string;
  interests: string;
  summary: string;
  greeting: string;

  speeches: Array<{
    title: string;
    date: string;
    link: string;
    description: string;
  }>;

  experience: Array<
    IResumePoint & {
      position: string;
      date_from: string;
      achievements: string[];
    }
  >;

  education: Array<IResumePoint>;
}
