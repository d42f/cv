import { IResume } from '@/models/IResume';
import yamlResume from './resume.yaml';

const resume = yamlResume as IResume;

export const {
  address,
  education,
  email,
  experience,
  interests,
  languages,
  links,
  methodologies,
  name,
  phone,
  position,
  skills,
  speeches,
  summary,
  telegram,
} = resume;
