import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import SecondPage from './SecondPage';
import axios from 'axios';
import ProgressBar from 'react-bootstrap/ProgressBar';
import UrlContext from '../context/urlContext';
// import {alert} from 'node-popup';
import history from './history';

class FirstPage extends React.Component {
    constructor(props) {
        super(props)
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeUrl = this.onChangeUrl.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            name: "",
            email: "",
            url: "",
            count: 0,
            history
        }
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }
    onChangeUrl(e) {
        this.setState({
            url: e.target.value
        })
    }
    onSubmit = async (e) => {
        e.preventDefault();
        const url = {
            url: this.state.url

        }

        console.log(this.state.url)
        console.log(this.state.email)

        await axios.post('https://seoaccess-server.herokuapp.com/seo_reports/url/', url);
        await axios.post('https://seoaccess-server.herokuapp.com/tally_reports/url/', url);
        this.myInterval = setInterval(() => {
            this.setState(prevState => ({
                count: this.state.count + 10
            }))
            if (this.state.count === 100) {
                console.log("inside if" + this.state.count)

                // axios.post('http://localhost:5000/email/sendEmail', email)
                //window.location = '/secondPage/' + this.state.email + '/' + this.state.url;
                this.state.history.push({
                    pathname : '/secondPage',
                    state : {url: this.state.url, email : this.state.email}
                })
            }

        }, 2000)



        //         let res1=await axios.post('http://localhost:5000/seo_reports/url',url)
        //           if(res1)
        //           {
        //               console.log("get report seo")
        //             await axios.post('http://localhost:5000/seo_reports/add').then(
        //                 res=>console.log(res.data)
        //             )
        //           }
        //          else{
        //    console.log("not added seo")
        //          }
        //          let res2=await axios.post('http://localhost:5000/tally_reports/url',url)
        //          if(res2)
        //          {
        //             console.log("get report tally")
        //             await axios.post('http://localhost:5000/tally_reports/add').then
        //             (
        //                 res=>console.log(res.data)
        //             )

        //          }







        //    let res2= await axios.post('http://localhost:5000/tally_reports/url',url)
        //     .then(res=>console.log(res.data)).
        //     then(


        //         axios.post('http://localhost:5000/tally_reports/add')
        //         .then(res=>console.log(res.data))

        //     );
        // window.location("/secondPage");




    }

    render() {
        // const {count}=this.state

        return (
            <div>

                <div className="container-fluid w-70 mt-2 mx-auto">
                    <div className="d-flex flex-column align-items-center text-center">
                        {/* <div className="border border-dark w-100 align-items-center text-center"> */}
                        <h2 style={{ color: "white" }}>
                            SeoAccess
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
                            <input type="text" required
                                className="form-control box"
                                id="name"
                                placeholder="Enter your name"
                                value={this.state.name}
                                onChange={this.onChangeName}
                            ></input>
                        </div>
                        <div className="form-group">
                            <input type="email" required className="form-control box" id="email" placeholder="name@example.com "
                                value={this.state.email}
                                onChange={this.onChangeEmail}
                            >

                            </input>
                        </div>
                        <div className="form-group">
                            <input type="url" required className="form-control box" id="url" placeholder="www.url.com" value={this.state.url}
                                onChange={this.onChangeUrl}

                            ></input>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="privacy" required/>
                            <label className="form-check-label textcolor" htmlFor="privacy">I accept privacy policy</label>
                        </div>
                       
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary d-block mt-4 mx-auto">See report</button>
                            {/* <input className="btn btn-primary d-block mt-4 mx-auto"  type="submit" value="See Report" className="btn btn-primary" /> */}
                        </div>
                        {/* <Button variant="btn btn-success" >See Report</Button> */}
                        {/* onClick={() => history.push('/secondPage')} */}

                        {/* <button type="submit" className="btn btn-primary d-block mt-4 mx-auto" onClick={history.push('/secondPage')}>See report</button> */}

                    </form>
                    <label id="loading" hidden>Loading ...</label>
                    {/* <div className="progress center-block w-25 mt-4 mx-auto" style={{"textAlign" : "center"}}>
                    
                    <div className="progress-bar d-block bg-success" role="progressbar" aria-valuenow={count} aria-valuemin="0" aria-valuemax="10" style={{"width":   {count} , "textAlign":"center"}}>
                    {count+"%"}  
                    </div>
             
                </div> */}
                    {/* <ProgressBar  animated now={count}  label={`${count}%`} /> */}
                    <br/><br/><br/>
                    <div>
                        <ProgressBar animated striped variant="success" now={this.state.count} label={`${this.state.count}%`} key={1} />
                    </div>
                </div>

            </div>
        );
    }
}


export default FirstPage;