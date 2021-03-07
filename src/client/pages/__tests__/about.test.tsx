import {render} from 'test-utils';

import AboutPage from '../about';

test('should render about page', () => {
  const {getByText} = render(<AboutPage />);

  expect(getByText(/about page/i)).toBeInTheDocument();
});
