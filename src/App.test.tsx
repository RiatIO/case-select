import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('Renders an element', () => {
    render(<App />);
    const heading = screen.getByText(/Edit/i);
    expect(heading).toBeInTheDocument();
  });
});
