import { createHashHistory } from 'history';
import { parseQuery } from '@/utils';

const history = createHashHistory();

export default history;

export const unlisten = history.listen((location, action) => {
  // parse query string
  location.query = parseQuery(location.search);
});
