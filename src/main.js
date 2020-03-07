import React from 'react';
import { Button } from 'react-bootstrap';
import { BrowserRouter, Route, Link } from "react-router-dom";
import SecondPage from './SecondPage';
import history from './history';
import axios from 'axios';

class FirstPage extends React.Component{
    constructor(props)
    {
        super(props)
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeUrl = this.onChangeUrl.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state={
            name:"",
            email:"",
            url:""
        }
    }
    onChangeName(e){
        this.setState({
            name:e.target.value
        })
    }
    onChangeEmail(e){
        this.setState({
            email:e.target.value
        })
    }
    onChangeUrl(e){
        this.setState({
            url:e.target.value
        })
    }
    onSubmit=async (e)=>
    {
        e.preventDefault();
        const url={
            url:this.state.url

        }
        console.log(this.state.url)
       let res1=await axios.post('http://localhost:5000/seo_reports/url',url)
        .then(res=>console.log(res.data)); 
       let res2= await axios.post('http://localhost:5000/tally_reports/url',url)
        .then(res=>console.log(res.data));
        await axios.post('http://localhost:5000/tally_reports/add')
        .then(res=>console.log(res.data));
       await axios.post('http://localhost:5000/seo_reports/add')
        .then(res=>console.log(res.data));
       // window.location="/secondPage";
        
    }

    render() {
      return (
        <div>
          
            <div className="container-fluid w-70 mt-2 mx-auto">
                <div className="d-flex flex-column align-items-center text-center">
                    {/* <div className="border border-dark w-100 align-items-center text-center"> */}
                    <h2 style={{color: "white"}}>
                        Title
                    </h2>
                    
                    <div className="border border-dark border-3 w-50 textcolor mt-2">
                        <a href="#" >
                            <div className="col-12 text-center h6 mx-auto">
                                AODA Details
                            </div>
                        </a>
                    </div>
                    <div className=" border border-dark border-3 w-50 textcolor mt-2">
                        <div className="col-12 text-center h6 mx-auto">
                            <a href="#" >SEO Details</a>
                        </div>
                    </div>
                    {/* </div> */}
                </div>

                <form className="centre-block mt-4 mx-auto w-50" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input type="text"
                         className="form-control box"
                          id="name" 
                          placeholder="Enter your name" 
                          value={this.state.name}
                          onChange={this.onChangeName}
                          ></input>
                    </div>
                    <div className="form-group">
                        <input type="email" className="form-control box" id="email" placeholder="name@example.com "
                         value={this.state.email}
                         onChange={this.onChangeEmail}
                         >

                         </input>
                    </div>
                    <div className="form-group">
                        <input type="url" className="form-control box" id="url" placeholder="www.url.com" value={this.state.url}
                        onChange={this.onChangeUrl}
                        
                        ></input>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="privacy" />
                        <label className="form-check-label textcolor" htmlFor="privacy">I accept privacy policy</label>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="SendEmail" />
                        <label className="form-check-label textcolor" htmlFor="SendEmail">I want report to be emailed</label>
                    </div>
                    <div className="form-group">
          <input type="submit" value="See Report" className="btn btn-primary" />
        </div>
                    {/* <Button variant="btn btn-success" >See Report</Button> */}
                    {/* onClick={() => history.push('/secondPage')} */}
                 
                    {/* <button type="submit" className="btn btn-primary d-block mt-4 mx-auto" onClick={history.push('/secondPage')}>See report</button> */}
                </form>  
                <label id="loading" hidden>Loading ...</label>
                <div className="progress center-block w-25 mt-4 mx-auto" style={{"textAlign" : "center"}}>
                    
                    <div className="progress-bar d-block bg-success" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{"width": "70%", "textAlign":"center"}}>
                    10%    
                    </div>
                </div>
            </div>
           
        </div>
      );
    }
  }
  
  
  export default FirstPage;