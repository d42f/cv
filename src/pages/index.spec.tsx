import { render, screen } from '@testing-library/react';

import Index from './[[...slug]]';

describe('<Index />', () => {
  it('renders component', () => {
    render(<Index />);
    expect(screen.getByText('Get started by editing')).toBeInTheDocument();
  });
});
