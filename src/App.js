
import { BrowserRouter as Router, Switch, Route, useRouteMatch, useParams, useHistory } from "react-router-dom";
import { Component } from "react";

import Header from "./Components/Header";


import Login from "./Pages/Login";
import Signin from "./Pages/Signin";

import Capnhattaikhoan from "./Components/Capnhattaikhoan";


import Hienthitin from "./Components/Hienthitin";
import Chitiettin from "./Components/Chitiettin";

import Themchude from "./Components/Themchude";
import Themtintuc from "./Components/Themtintuc";
import Chinhsuabaiviet from "./Components/Chinhsuabaiviet";
import Chitietbaiviet from "./Components/Chitietbaiviet";
import Chudecuatoi from './Components/Chudecuatoi';

import Trangchu from "./Components/Trangchu";
import Trangchudecha from "./Components/Trangchudecha";

import Duyettin from "./Components/Duyettin";
import Duyetchude from "./Components/Duyetchude";

export default class App extends Component {

  render() {

    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Header />
            <Home />
          </Route>
          <Route path="/admin" render={() => {
            return (localStorage.getItem('user') === "ad") ? <Admin /> : <Login />
          }}></Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signin">
            <Signin />
          </Route>
          <Route path="/tacgia">
            <Header />
            <Tacgia />
          </Route>
          <Route path="/khoahoc">
            <Header />
            <Khoahocroute />
          </Route>
          <Route path="/quansu">
            <Header />
            <Quansuroute />
          </Route>
          <Route path="/thethao">
            <Header />
            <Thethaoroute />
          </Route>
          <Route path="/giaitri">
            <Header />
            <Giaitriroute />
          </Route>
          <Route path="/congnghe">
            <Header />
            <Congngheroute />
          </Route>
          <Route path="/themtintuc" render={() => {
            return (localStorage.getItem('type') === "tg") ? <Themtin /> : <Login />
          }}>

          </Route>
          <Route path="/themchude" render={() => {
            return (localStorage.getItem('type') === "tg") ? <Themcd /> : <Login />
          }}>

          </Route>

          <Route path="/chinhsuabaiviet" render={() => {
            return (localStorage.getItem('type') === "tg") ? <Chinhbv /> : <Login />
          }}>
          </Route>
          <Route path="/chudecuatoi" render={() => {
            return (localStorage.getItem('type') === "tg") ? <Chudect /> : <Login />
          }}>
          </Route>

          <Route path="/duyettin" render={() => {
            return (localStorage.getItem('type') === "qt") ? <Duyettintuc /> : <Login />
          }}>
          </Route>
          <Route path="/duyetchude" render={() => {
            return (localStorage.getItem('type') === "qt") ? <Duyetcd /> : <Login />
          }}>
          </Route>

          <Route path="/capnhattaikhoan" render={() => {
            return (localStorage.getItem('type') === "ad") ? <Capnhatuser /> : <Login />
          }}>
          </Route>


          <Route path="/:Id">
            <Header />
            <DetailById />
          </Route>
        </Switch>
      </Router>

    );
  }
}

function Capnhatuser() {
  return (
    <div>
      <Header />
      <Capnhattaikhoan />
    </div>
  )
}
function Duyetcd() {
  return (
    <div>
      <Header />
      <Duyetchude />
    </div>
  )
}
function Duyettintuc() {
  return (
    <div>
      <Header />
      <Duyettin />
    </div>
  )
}
function Themtin() {
  return (
    <div>
      <Header />
      <Themtintuc />
    </div>
  )
}
function Themcd() {
  return (
    <div>
      <Header />
      <Themchude />
    </div>
  )
}
function Chinhbv() {
  let { path, url } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <Header />
        <Chinhsuabaiviet />
      </Route>
      <Route path={`${url}/:Id`}>
        <Header />
        <Chitietchinhsua />
      </Route>
    </Switch>
  )
}

function Chudect() {
  let { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <Header />
        <Chudecuatoi />
      </Route>
    </Switch>
  )
}

function Chitietchinhsua() {
  let { Id } = useParams();

  return (
    <div>
      <Chitietbaiviet id={Id} />
    </div>
  );
}


function DetailById() {
  let { Id } = useParams();
  return (
    <Chitiettin id={Id} reload={true} />
  )
}

function Admin() {
  let history = useHistory();
  let logout = () => {
    localStorage.removeItem('user')
    history.push('/login')
    window.location.reload()

  }
  return <div>
    <h2>Admin</h2>
    <button onClick={logout}>Log out</button>
  </div>

}

function Tacgia() {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <h3>Page tac gia</h3>
      </Route>
      <Route path={`${path}/vietbai`}>
        <h1>Page viet bai</h1>
      </Route>
    </Switch>
  )
}


function MoreNews() {
  let { Id } = useParams();

  return (
    <div>
      <Hienthitin machudebaiviet={Id} />
    </div>
  );
}

function Home() {
  return (
    <div>
      <Trangchu />
    </div>
  );
}


function Khoahocroute() {
  let { path, url } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <Trangchudecha chude="khoahoc" />
      </Route>
      <Route path={`${url}/:Id`}>
        <MoreNews />
      </Route>

    </Switch>
  )
}

function Quansuroute() {
  let { path, url } = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route exact path={path}>
          <Trangchudecha chude="quansu" />
        </Route>
        <Route path={`${url}/:Id`}>
          <MoreNews />
        </Route>
      </Switch>
    </div>
  );
}




function Thethaoroute() {
  let { path, url } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <Trangchudecha chude="thethao" />
      </Route>
      <Route path={`${url}/:Id`}>
        <MoreNews />
      </Route>


    </Switch>
  )
}

function Giaitriroute() {
  let { path, url } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <Trangchudecha chude="giaitri" />
      </Route>
      <Route path={`${url}/:Id`}>
        <MoreNews />
      </Route>
    </Switch>
  )
}

function Congngheroute() {
  let { path, url } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <Trangchudecha chude="congnghe" />
      </Route>
      <Route path={`${url}/:Id`}>
        <MoreNews />
      </Route>
    </Switch>
  )
}