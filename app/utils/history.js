import createHistory from 'history/createBrowserHistory';
import { publicPath } from '../config/path';

const history = createHistory({ basename: `${publicPath}` });
export default history;
