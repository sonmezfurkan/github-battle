import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './index.css'

import Nav from './components/Nav'
import { ThemeProvider } from './contexts/theme'
import Loading from './components/Loading'

const Populer = React.lazy(() => import('./components/Populer'))
const Battle = React.lazy(() => import('./components/Battle'))
const Results = React.lazy(() => import('./components/Results'))

class App extends Component {

    state = {
        theme: 'light',
        toggleTheme: () => {
            this.setState(({ theme }) => ({
                theme: theme === 'light' ? 'dark' : 'light'
            })
        )}
    }

    render() {
        return (
            <Router>
                <ThemeProvider value={this.state}>
                    <div className={this.state.theme }>
                        <div className="container">
                            <Nav />
                            <React.Suspense fallback={<Loading />}>
                                <Switch>
                                    <Route path="/" exact component={Populer} />
                                    <Route path="/battle" exact component={Battle} />
                                    <Route path="/battle/results" component={Results} />
                                    <Route render={() => <h1>404 - Not Found</h1>} />
                                </Switch>
                            </React.Suspense>
                        </div>
                    </div>
                </ThemeProvider>
            </Router>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))