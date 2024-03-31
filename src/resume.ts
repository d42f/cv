import { IResume } from '@/models/IResume';
import yamlResume from './resume.yaml';

export const {
  address,
  education,
  email,
  experience,
  greeting,
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
} = yamlResume as IResume;
