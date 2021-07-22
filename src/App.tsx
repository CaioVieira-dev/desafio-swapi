import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { GlobalStyle } from './styles/styles'

import { Home } from './pages/Home'
import { Characters } from './pages/Characters'
import { CharacterSingle } from './pages/CharacterSingle'

import { Header } from './components/Header'

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/characters" component={Characters} />
          <Route path="/characters/:id" component={CharacterSingle} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
