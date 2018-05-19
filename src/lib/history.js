import CreateHistory from 'history/createBrowserHistory';
import { parseQuery } from '../utils';

const history = CreateHistory();

export default history;

export const unlisten = history.listen((location, action) => {
  // parse query string
  location.query = parseQuery(location.search);
});
