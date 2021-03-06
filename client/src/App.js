import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './components/LandingPage.jsx';
import Home from './components/Home.jsx';
import Details from './components/Details.jsx';
import RecipeCreater from './components/RecipeCreated';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component = {LandingPage}></Route>
          <Route exact path= "/recipes" component = {Home}></Route>
          <Route exact path= "/recipes/:id" render = {({match}) => <Details props={match.params.id}/>}></Route>
          <Route exact path= "/recipe" component = {RecipeCreater}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
