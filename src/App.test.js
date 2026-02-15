import { render, screen, within } from '@testing-library/react';
import App from './App';

test('renders navigation links', () => {
  render(<App />);
  // Scope queries to the main navigation to avoid matching content outside the header
  const nav = screen.getByRole('navigation', { name: /Main navigation/i });
  const { getAllByRole } = within(nav);
  // Home: href '#home'
  const homeLinks = getAllByRole('link', { name: /Home/i });
  const homeLink = homeLinks.find((el) => el.getAttribute('href') === '#home');
  expect(homeLink).toBeInTheDocument();

  // Projects: href '#projects'
  const projectsLinks = getAllByRole('link', { name: /Projects/i });
  const projectsLink = projectsLinks.find((el) => el.getAttribute('href') === '#projects');
  expect(projectsLink).toBeInTheDocument();

  // Contact Us: href '#contact'
  const contactLinks = getAllByRole('link', { name: /Contact Us/i });
  const contactLink = contactLinks.find((el) => el.getAttribute('href') === '#contact');
  expect(contactLink).toBeInTheDocument();
});
