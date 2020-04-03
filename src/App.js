import React from 'react';
import Header from './components/header';
import Footer from './components/footer';
import './css/App.css';
import FirstPage from './components/main';
import AboutPage from'./components/about';
import ContactUs from './components/contact';
import SecondPage from './components/SecondPage';
import { Router, Route, Link,Switch } from "react-router-dom";
import history from './components/history';
import New from './components/new'
class App extends React.Component{
  render() {
    return (
        <Router history={history}>
          <Header />
     
      <Route path="/" exact component={FirstPage}></Route>
      <Route path="/about" component={AboutPage}></Route>
      <Route path="/contact" component={ContactUs}></Route>
      <Route path="/secondPage/:email/:id//:url+"component={SecondPage}></Route>
      <br></br>
        <Footer />
        </Router>
         
      
    );
  }
}


export default App;
