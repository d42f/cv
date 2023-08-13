import { render, screen } from '@testing-library/react';

jest.mock(
  '../resume.ts',
  () => ({
    education: [],
    experience: [],
    links: {},
    speeches: [],
  }),
  { virtual: true },
);

import Index from '@/pages/[[...slug]]';

describe('<Index />', () => {
  it('renders component', () => {
    render(<Index />);
    expect(screen.getByText("DMITRII FROLOV'S CV")).toBeInTheDocument();
  });
});
