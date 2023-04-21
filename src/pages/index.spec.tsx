import { render, screen } from '@testing-library/react';

import Home from './index';

describe('<Home />', () => {
  it('renders component', () => {
    render(<Home />);
    expect(screen.getByText('Get started by editing')).toBeInTheDocument();
  });
});
