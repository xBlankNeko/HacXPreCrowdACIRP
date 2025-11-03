import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the MapComponent to avoid leaflet rendering issues in tests
jest.mock('./MapComponent', () => {
  return function MockMapComponent() {
    return <div data-testid="map-component">Map Component</div>;
  };
});

test('renders crowd simulation heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/crowd simulation/i);
  expect(headingElement).toBeInTheDocument();
});

test('renders control buttons', () => {
  render(<App />);
  const safeZoneButton = screen.getByText(/add safe zone/i);
  const threatButton = screen.getByText(/inject threat/i);
  expect(safeZoneButton).toBeInTheDocument();
  expect(threatButton).toBeInTheDocument();
});
