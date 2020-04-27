import React from 'react';
import axios from 'axios';
import ProgressBar from 'react-bootstrap/ProgressBar';
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
    async onChangeEmail(e) {
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
                this.state.history.push({
                    pathname: '/secondPage',
                    state: { url: this.state.url, email: this.state.email }
                })
            }
        }, 2500)
    }

    render() {
        return (
            <div>
                <div className="container-fluid w-70 mt-2 mx-auto">
                    <div className="d-flex flex-column align-items-center text-center">
                        {/* <div className="border border-dark w-100 align-items-center text-center"> */}
                        <h1 style={{ color: "white" }}>
                            Why SeoAccess?
                        </h1>
                        <p>We provide modern SEO & Web accessibility checks for your webpage!</p>
                        <div className="border border-dark border-3 w-50 textcolor mt-2">
                            <div className="container-fluid space">
                                <div className="row">
                                    <div className="col-md-6 col-sm-6 col-xs-12 vr jus">
                                        <h3>SEO</h3>
                                        <p>SEO results in increased traffic and conversions.
                                                SEO allows companies to get traffic that can drive conversions and revenue. Rather than
                                                spending money on social media ads and other marketing tactics, we suggest building out SEO.
                                            <strong> SeoAccess</strong> will help you identify where you lack the SEO standards.
                                    </p>
                                    </div>

                                    <div className="col-md-6 col-sm-6 col-xs-12 jus">
                                        <h3>Web Accessibility</h3>
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
                            <label for="name" hidden>Name : </label>
                            <input type="text" required
                                className="form-control box"
                                id="name"
                                placeholder="Enter your name"
                                value={this.state.name}
                                onChange={this.onChangeName}
                            />
                        </div>
                        <div className="form-group"><label for="email" hidden>Email : </label>
                            <input type="email" required className="form-control box" id="email" placeholder="name@example.com "
                                value={this.state.email}
                                onChange={this.onChangeEmail}
                            />

                        </div>
                        <div className="form-group"><label for="url" hidden>URL : </label>
                            <input type="url" required className="form-control box" id="url" placeholder="www.url.com" value={this.state.url}
                                onChange={this.onChangeUrl}

                            />
                        </div>
                        <div className="form-check"><label for="privacy" hidden></label>
                            <input type="checkbox" className="form-check-input" id="privacy" required />
                            <label className="form-check-label textcolor" htmlFor="privacy">I accept privacy policy</label>
                        </div>

                        <div className="form-group"><label for="sub" hidden></label>
                            <button type="submit" id="sub" className="btn btn-primary d-block mt-4 mx-auto">See report</button>
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