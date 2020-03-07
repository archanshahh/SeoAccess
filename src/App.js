import React from 'react';
import Header from './header';
import Footer from './footer';
import './App.css';
import FirstPage from './main';
import AboutPage from'./about';
import ContactUs from './contact';
import SecondPage from './SecondPage';
import { Router, Route, Link,Switch } from "react-router-dom";
import history from './history';
import New from './new'
class App extends React.Component{
  render() {
    return (
        <Router history={history}>
          <Header />
     
      <Route path="/" exact component={FirstPage}></Route>
      <Route path="/about" component={AboutPage}></Route>
      <Route path="/contact" component={ContactUs}></Route>
      <Route path="/secondPage" component={SecondPage}></Route>

        <Footer />
        </Router>
         
      
    );
  }
}


export default App;
