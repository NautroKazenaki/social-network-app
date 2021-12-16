import React, { ComponentType } from 'react'
import store, { AppStateType } from './Redux/redux-store'
import Nav from './components/Nav/Nav'
import './App.css';
import { Route, withRouter, BrowserRouter, Switch, Redirect } from 'react-router-dom'



import Settings from './components/Settings/Settings';
import News from './components/News/News';
import Music from './components/Music/Music';

//import DialogsContainer from './components/Dialogs/DialogsContainer';
import {UsersPage} from './components/Users/UsersContainer';
//import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import {Login} from './components/Login/Login';
import { Component } from 'react';
import { connect, Provider } from 'react-redux';
import { initializeApp } from './Redux/app-reducer';
import { compose } from 'redux';
import { withSuspence } from './HOC/withSuspence';
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))

type MapStatePropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}

const SuspendedDialogs = withSuspence(DialogsContainer)
const SuspendedProfile = withSuspence(ProfileContainer)

class App extends Component<MapStatePropsType & DispatchPropsType> {

  catchAllUnhandledErrors = (e: PromiseRejectionEvent) =>{
    alert("Some error occured")
  }

  componentDidMount() {
    this.props.initializeApp()
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
  }

  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
  }

  render() {
    // if (!this.props.initialized) {
    //   return <Preloader />
    // }

    return (
      <div className='app-wrapper'>
        <HeaderContainer />
        <Nav />
        <Switch>
        <div className='app-wrapper-content'>

          {/* <Redirect from="/" to="/profile" /> */}

          <Route path='/profile/:userId?' render= {() =><SuspendedProfile />} />

          <Route path='/dialogs' render={() => <SuspendedDialogs /> } />
            
          <Route path='/news' render={() => <News />} />

          <Route path='/music' render={() => <Music />} />

          <Route path='/settings' render={() => <Settings />} />

          <Route path='/users' render={() => <UsersPage pageTitle={"пользователи"}/>} />

          <Route path='/login' render={() => <Login />} />

          {/* <Route path='*' render={() => <div> 404 not found </div>} />  */}
        

        </div>
        </Switch>

      </div>
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
})

// export default compose(
//   withRouter,
//   connect(mapStateToProps, {initializeApp})) (App);

let AppContainer = compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, { initializeApp }))(App);

const MainApp: React.FC = () => {
  return <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
}

export default MainApp;