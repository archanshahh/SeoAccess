import React from 'react';
import axios from 'axios';
import ProgressBar from 'react-bootstrap/ProgressBar';
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
                    pathname: '/secondPage',
                    state: { url: this.state.url, email: this.state.email }
                })
            }

        }, 2000)
    }

    render() {
        // const {count}=this.state

        return (
            <div>

                <div className="container-fluid w-70 mt-2 mx-auto">
                    <div className="d-flex flex-column align-items-center text-center">
                        {/* <div className="border border-dark w-100 align-items-center text-center"> */}
                        <h1 style={{ color: "white" }}>
                            Why SeoAccess?
                        </h1>
                        <p>How fast and accessible is your website?</p>
                        <div className="border border-dark border-3 w-50 textcolor mt-2">
                            <div className="container-fluid space">
                                <div className="row">
                                    <div className="col-md-6 col-sm-6 col-xs-12 vr jus">
                                        <p>SEO results in increased traffic and conversions.
                                                SEO allows companies to get traffic that can drive conversions and revenue. Rather than
                                                spending money on social media ads and other marketing tactics, we suggest building out SEO.
                                            <strong> SeoAccess</strong> will help you identify where you lack the SEO standards.
                                    </p>
                                    </div>

                                    <div className="col-md-6 col-sm-6 col-xs-12 jus">
                                        <p>
                                            It is important that the Web is open to all so that people with different abilities have fair access and equal opportunities.
                                            An accessible web can help people with different abilities to participate more actively in society.
                                        <strong> SeoAccess</strong> will inform you where there is a lack of web accessibility compliance.
                                    </p>
                                    </div>
                                </div>
                            </div>

                        </div>
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
                            <input type="checkbox" className="form-check-input" id="privacy" required />
                            <label className="form-check-label textcolor" htmlFor="privacy">I accept privacy policy</label>
                        </div>

                        <div className="form-group">
                            <button type="submit" className="btn btn-primary d-block mt-4 mx-auto">See report</button>
                        </div>
                    </form>
                    <label id="loading" hidden>Loading ...</label>

                    <br /><br /><br />
                    <div>
                        <ProgressBar animated striped variant="success" now={this.state.count} label={`${this.state.count}%`} key={1} />
                    </div>
                </div>

            </div>
        );
    }
}


export default FirstPage;