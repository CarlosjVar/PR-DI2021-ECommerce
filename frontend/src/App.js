import { BrowserRouter as Router } from 'react-router-dom';

import MainNavbar from './components/layout/MainNavbar';
import MainFooter from './components/layout/MainFooter';
import Routes from './components/routing/Routes';

const App = () => {
  return (
    <Router>
      <MainNavbar />
      <main>
        <Routes />
      </main>
      <MainFooter />
    </Router>
  );
};

export default App;
