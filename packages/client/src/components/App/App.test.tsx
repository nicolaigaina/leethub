import React from 'react';
import { render } from '@testing-library/react';

test('renders hello', () => {
  const app = render(<h1>Hello</h1>);
  expect(app.baseElement).toContainHTML('Hello');
});
