import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { GlobalStyle } from './styles/styles'
import { Home } from './pages/Home'

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
