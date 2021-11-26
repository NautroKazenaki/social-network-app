import React from 'react'
import store from './Redux/redux-store'
import Nav from './components/Nav/Nav'
import './App.css';
import { Route, withRouter, BrowserRouter } from 'react-router-dom'



import Settings from './components/Settings/Settings';
import News from './components/News/News';
import Music from './components/Music/Music';

//import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
//import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginPage from './components/Login/Login';
import { Component } from 'react';
import { connect, Provider } from 'react-redux';
import { initializeApp } from './Redux/app-reducer'
import Preloader from './components/Common/Preloader/Preloader';
import { compose } from 'redux';
import { withSuspence } from './HOC/withSuspence';
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))



class App extends Component {

  componentDidMount() {
    this.props.initializeApp()
  }

  render() {
    // if (!this.props.initialized) {
    //   return <Preloader />
    // }

    return (
      <div className='app-wrapper'>
        <HeaderContainer />
        <Nav />
        <div className='app-wrapper-content'>
          <Route path='/profile/:userId?' render= {withSuspence(ProfileContainer)} />

          <Route path='/dialogs' render={withSuspence(DialogsContainer)} />
            
          <Route path='/news' render={() => <News />} />

          <Route path='/music' render={() => <Music />} />

          <Route path='/settings' render={() => <Settings />} />

          <Route path='/users' render={() => <UsersContainer />} />

          <Route path='/login' render={() => <LoginPage />} />

        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

// export default compose(
//   withRouter,
//   connect(mapStateToProps, {initializeApp})) (App);

let AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initializeApp }))(App);

const MainApp = (props) => {
  return <BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
}

export default MainApp;