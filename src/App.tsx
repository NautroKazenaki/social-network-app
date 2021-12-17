import React, { ComponentType } from 'react'
import store, { AppStateType } from './Redux/redux-store'
import Nav from './components/Nav/Nav'
import './App.css';
import { Route, withRouter, BrowserRouter, Switch, Redirect, NavLink, Link } from 'react-router-dom'
import Settings from './components/Settings/Settings';
import News from './components/News/News';
import Music from './components/Music/Music';
//import DialogsContainer from './components/Dialogs/DialogsContainer';
import { UsersPage } from './components/Users/UsersContainer';
//import ProfileContainer from './components/Profile/ProfileContainer';
import { Login } from './components/Login/Login';
import { Component } from 'react';
import { connect, Provider } from 'react-redux';
import { initializeApp } from './Redux/app-reducer';
import { compose } from 'redux';
import { withSuspence } from './HOC/withSuspence';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb, Avatar, Image, Button, Row, Col } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { AppHeader } from './components/Header/Header';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))

type MapStatePropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}

const SuspendedDialogs = withSuspence(DialogsContainer)
const SuspendedProfile = withSuspence(ProfileContainer)

class App extends Component<MapStatePropsType & DispatchPropsType> {

  catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
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

      <Layout>
        <AppHeader />
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
            <Sider className="site-layout-background" width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
              >
                <SubMenu key="sub1" icon={<UserOutlined />} title="My Profile">
                  <Menu.Item key="1"><Link to="/profile">Profile</Link></Menu.Item>
                  <Menu.Item key="2"><Link to="/dialogs">Messages</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<LaptopOutlined />} title="Users">
                  <Menu.Item key="3"><Link to="/users">Users</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" icon={<NotificationOutlined />} title="ToDo list">
                  <Menu.Item key="4"><Link to="/news"> News</Link></Menu.Item>
                  <Menu.Item key="5"><Link to="/music">Music</Link></Menu.Item>
                  <Menu.Item key="6"><Link to="/settings">Settings</Link></Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <Switch>
                <div className='app-wrapper-content'>

                  {/* <Redirect from="/" to="/profile" /> */}

                  <Route path='/profile/:userId?' render={() => <SuspendedProfile />} />

                  <Route path='/dialogs' render={() => <SuspendedDialogs />} />

                  <Route path='/news' render={() => <News />} />

                  <Route path='/music' render={() => <Music />} />

                  <Route path='/settings' render={() => <Settings />} />

                  <Route path='/users' render={() => <UsersPage pageTitle={"пользователи"} />} />

                  <Route path='/login' render={() => <Login />} />

                  {/* <Route path='*' render={() => <div> <Button> OK </Button> 404 not found </div>} />   */}


                </div>
              </Switch>
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Nautro Kazenaki 2021 Social-Network-APP</Footer>
      </Layout>

      //   <div className='app-wrapper'>
      //     <HeaderContainer />
      //     <Nav />
      //     <Switch>
      //     <div className='app-wrapper-content'>

      //       {/* <Redirect from="/" to="/profile" /> */}

      //       <Route path='/profile/:userId?' render= {() =><SuspendedProfile />} />

      //       <Route path='/dialogs' render={() => <SuspendedDialogs /> } />

      //       <Route path='/news' render={() => <News />} />

      //       <Route path='/music' render={() => <Music />} />

      //       <Route path='/settings' render={() => <Settings />} />

      //       <Route path='/users' render={() => <UsersPage pageTitle={"пользователи"}/>} />

      //       <Route path='/login' render={() => <Login />} />

      //       {/* <Route path='*' render={() => <div> <Button> OK </Button> 404 not found </div>} />   */}


      //     </div>
      //     </Switch>

      //   </div>
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