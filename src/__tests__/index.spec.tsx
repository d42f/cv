import { render, screen } from '@testing-library/react';

const RESUME_MOCK: IResume = {
  name: 'Dmitrii Frolov',
  position: '',
  email: '',
  phone: '',
  telegram: '',
  address: '',
  links: {},
  skills: { frontend: [], backend: [], tooling: [], testing: [], methodologies: [] },
  languages: '',
  summary: '',
  greeting: '',
  speeches: [],
  experience: [],
  education: [],
};

jest.mock('../resume.ts', () => RESUME_MOCK);

import { IResume } from '@/models/IResume';
import Index from '@/pages/[[...slug]]';

describe('<Index />', () => {
  it('renders component', () => {
    render(<Index />);
    expect(screen.getByText("DMITRII FROLOV'S CV")).toBeInTheDocument();
  });
});
