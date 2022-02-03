import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import UserPage from './Components/UserPage/UserPage';
import MainPage from './Components/MainPage/MainPage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={MainPage}/>
          <Route path="/userpage" component={UserPage}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
