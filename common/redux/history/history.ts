import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();

// only dev
(window as any).routerHistory = history;

export default history;
