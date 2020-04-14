import React from 'react';
import axios from 'axios';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import ChangingProgressProvider from "./ChangingProgressProvider";
import '../css/new.css';
import alert from 'alert-node'

class SecondPage extends React.Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      seo: [],
      aoda: [],
      Performance_result: [],
      percentage1: "",
      seo_result: [],
      aoda_summary: [],
      aoda_score: "",
      serious_impact_result: [],
      minor_impact_result: [],
      moderate_impact_result: [],
      critical_impact_result: [],
      others_impact_result: [],
      url: "",
      email: "",
      seo_summary: []
    }


  }

  async componentDidMount() {
    if(!this.props.location.state){
      alert('Error in generating report!\nPlease try again later or Get in touch with us!');
      window.location= '/';
    }
    let urlfetch = this.props.location.state.url;
    console.log("url from secondpage    "+urlfetch);
    const loc = {
      location: urlfetch
    }

    await axios.post('https://seoaccess-server.herokuapp.com/seo_reports/getByUrl', loc)
      .then(res => {
        // console.log(res.data + "hhih")

        if (res.data.length > 0) {
          this.setState({
            seo: res.data,
          })
          // console.log(this.state.seo + "data from seo")
        }
        this.setState({
          seo_summary: this.state.seo[0].summary
        })
        this.setState({
          Performance_result: this.state.seo[0].performance_results
        })
        this.setState({
          percentage1: this.state.seo[0].score
        })
        this.setState({
          seo_result: this.state.seo[0].seo_results
        })
      })
      .catch((e)=>{
        alert('Error in generating report!\nPlease try again later or Get in touch with us!')
        window.location = '/';
      })
    // console.log("hello"+request);

    await axios.post('https://seoaccess-server.herokuapp.com/tally_reports/getByUrl', loc)
      .then(res => {
        if (res.data.length > 0) {
          this.setState({
            aoda: res.data
          })
          // this.email();
        }
        this.setState({
          aoda_summary: this.state.aoda[0].summary
        })
        this.setState({
          aoda_score: this.state.aoda[0].score
        })
        this.setState({
          // aoda_results: this.state.aoda[0].results
          serious_impact_result: this.state.aoda[0].serious_impact_result,
          minor_impact_result: this.state.aoda[0].minor_impact_result,
          moderate_impact_result: this.state.aoda[0].moderate_impact_result,
          critical_impact_result: this.state.aoda[0].critical_impact_result,
          others_impact_result: this.state.aoda[0].others_impact_result

        })
        // console.log(this.state.aoda[0].results[0]);

      })
      .catch((e)=>{
        alert('Error in generating report!\nPlease try again later or Get in touch with us!')
        window.location = '/';
      })
      // let emailObj = {
      //   email : this.props.location.state.email
      // }
      //await axios.post('http://localhost:5000/email/doReport/',emailObj)
  }
  onSubmit = async (e) => {
    e.preventDefault();
    // var urlfetch = this.props.location.state.url
    // const email = {
    //   email: this.props.location.state.email,
    //   location: urlfetch
    // }
    window.print();
    // await axios.post('https://seoaccess-server.herokuapp.com/email/sendEmail/').then((res) => {
    //   //break
    //   console.log(res.data + "response from mail");
    // });
  }

  render() {

    var items = this.state.seo_result.map((value) =>
      <li className="list-group-item ">{value}</li>
    );

    const serious = this.state.serious_impact_result.map((d) =>
      <div>
        <li className="list-group-item">{d.description}</li>
      </div>
    )
    const minor = this.state.minor_impact_result.map((d) =>
      <div>
        <li className="list-group-item">{d.description}</li>
      </div>
    )
    const critical = this.state.critical_impact_result.map((d) =>
      <div>
        <li className="list-group-item">{d.description}</li>
      </div>
    )
    const moderate = this.state.moderate_impact_result.map((d) =>
      <div>
        <li className="list-group-item">{d.description}</li>
      </div>
    )

    const others = this.state.others_impact_result.map((d) =>
      <div>
        <li className="list-group-item">{d.description}</li>
      </div>
    )

    return (
      <div className="container-fluid space">
        <div className="row">
          <div className="col-md-6 col-sm-6 col-xs-12">
            <div className="row justify-content-center">
              <div className="circle">
                <h3>SEO Result</h3>

                <ChangingProgressProvider values={[this.state.percentage1]}>
                  {percentage => (
                    <CircularProgressbar value={this.state.percentage1} text={`${this.state.percentage1}%`}

                      styles={buildStyles({
                        strokeLinecap: 'butt',
                        textSize: '16px',
                        pathTransition:
                          percentage === 0 ? "none" : "stroke-dashoffset 0.5s ease 0s",

                        textColor: '#f88',
                        trailColor: '#d6d6d6',
                        backgroundColor: '#3e98c7',
                      })}
                    />
                  )}
                </ChangingProgressProvider>

              </div>
            </div>
            <div className="row justify-content-center">
              <div className="btn-group space" role="group" aria-label="Basic example">
                <button type="button" className="btn btn-danger">Errors :  {this.state.seo_summary.errors}</button>
                {/* <button type="button" className="btn btn-warning">Warnings:{this.state.aoda_summary.warnings}</button> */}
                <button type="button" className="btn btn-success">Total Rules :  {this.state.seo_summary.total_rules}</button>
              </div>
              <div className="panel-group">
                <div className="panel panel-default">

                  <div className="panel-heading">
                    <h4 className="panel-title">
                      <p data-toggle="collapse" href="#collapse2">SEO Issues<i className="fas fa-angle-double-down right left-space"></i> <i className="fa fa-circle right left-space" style={{ color: '#ff0000' }}></i></p>
                    </h4>
                  </div>
                  <div id="collapse2" className="panel-collapse show">
                    <ul className="list-group">
                      {items}
                    </ul>
                  </div>

                  <div className="panel-heading">
                    <h4 className="panel-title">
                      <p data-toggle="collapse" href="#collapse1">Performance<i className="fas fa-angle-double-down right left-space"></i> <i className="fa fa-circle right left-space" style={{ color: '#808080' }}></i></p>
                    </h4>
                  </div>
                  <div id="collapse1" className="panel-collapse show">
                    <ul className="list-group">


                      <li className="list-group-item" >First Contentful Paint: {this.state.Performance_result.FCP}ms</li>
                      <li className="list-group-item">First CPU Idle: {this.state.Performance_result.FCI}ms</li>
                      <li className="list-group-item">First Meaningful Paint: {this.state.Performance_result.FMP}ms</li>
                      <li className="list-group-item">Speed Index:  {this.state.Performance_result.SI}ms</li>
                      <li className="list-group-item">Time To Interactive: {this.state.Performance_result.TTI}ms</li>
                    </ul>

                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-sm-6 col-xs-12">
            <div className="row justify-content-center">
              <div className="circle">
                <h3>AODA Result</h3>
                <ChangingProgressProvider values={[this.state.aoda_score]}>
                  {percentage => (
                    <CircularProgressbar value={this.state.aoda_score} text={`${this.state.aoda_score}%`}

                      styles={buildStyles({
                        strokeLinecap: 'butt',
                        textSize: '16px',
                        pathTransition:
                          percentage === 0 ? "none" : "stroke-dashoffset 0.5s ease 0s",

                        textColor: '#f88',
                        trailColor: '#d6d6d6',
                        backgroundColor: '#3e98c7',
                      })}



                    />
                  )}
                </ChangingProgressProvider>


              </div>
            </div>
            <div className="row justify-content-center">
              <div className="btn-group space" role="group">
                <button type="button" className="btn btn-danger">Errors :  {this.state.aoda_summary.errors}</button>
                <button type="button" className="btn btn-warning">Warnings :  {this.state.aoda_summary.warnings}</button>
                <button type="button" className="btn btn-success">Total Elements :  {this.state.aoda_summary.total_tags}</button>
              </div>
              <div className="panel-group">
                <div className="panel panel-default">

                {this.state.critical_impact_result.length > 0 ?
                    <div>
                      <div className="panel-heading">
                        <h4 className="panel-title">
                          <p data-toggle="collapse" href="#critical">Critical Issues<i className="fas fa-angle-double-down right left-space"></i> <i className="fa fa-circle right left-space" style={{ color: '#ff0000' }}></i></p>
                        </h4>
                      </div>
                      <div id="critical" className="panel-collapse show">
                        <ul className="list-group">
                          {critical}
                        </ul>
                      </div>
                    </div> : null}

                  {this.state.serious_impact_result.length > 0 ?
                    <div>
                      <div className="panel-heading">
                        <h4 className="panel-title">
                          <p data-toggle="collapse" href="#serious">Serious Issues<i className="fas fa-angle-double-down right left-space"></i> <i className="fa fa-circle right left-space" style={{ color: '#ff9900' }}></i></p>
                        </h4>
                      </div>
                      <div id="serious" className="panel-collapse collapse show">
                        <ul className="list-group">
                          {serious}
                        </ul>
                      </div>
                    </div> : null}

                  {this.state.moderate_impact_result.length > 0 ?
                    <div>
                      <div className="panel-heading">
                        <h4 className="panel-title">
                          <p data-toggle="collapse" href="#moderate">Moderate Issues<i className="fas fa-angle-double-down right left-space"></i> <i className="fa fa-circle right left-space" style={{ color: '#FFFF00' }}></i></p>
                        </h4>
                      </div>
                      <div id="moderate" className="panel-collapse show">
                        <ul className="list-group">
                          {moderate}
                        </ul>
                      </div>
                    </div> : null}

                  {this.state.minor_impact_result.length > 0 ?
                    <div>
                      <div className="panel-heading">
                        <h4 className="panel-title">
                          <p data-toggle="collapse" href="#minor">Minor Issues<i className="fas fa-angle-double-down right left-space"></i> <i className="fa fa-circle right left-space" style={{ color: '#6BCAE2' }}></i></p>
                        </h4>
                      </div>
                      <div id="minor" className="panel-collapse show">
                        <ul className="list-group">
                          {minor}
                        </ul>
                      </div>
                    </div> : null}

                  {this.state.others_impact_result.length > 0 ?
                    <div>
                      <div className="panel-heading">
                        <h4 className="panel-title">
                          <p data-toggle="collapse" href="#others">Issues<i className="fas fa-angle-double-down right left-space"></i> <i className="fa fa-circle right left-space" style={{ color: '#808080' }}></i></p>
                        </h4>
                      </div>
                      <div id="others" className="panel-collapse show">
                        <ul className="list-group">
                          {others}
                        </ul>
                      </div>
                    </div> : null}

                </div>
              </div>
            </div>
          </div>
        </div>

        <form className="centre-block mt-4 mx-auto w-50" onSubmit={this.onSubmit}>

          <div className="form-group">
            <button type="submit" className="btn btn-primary d-block mt-4 mx-auto">Save Report</button>
          </div>
        </form>

      </div>

    );

  }
}


export default SecondPage;