import React, { useContext } from 'react';
import axios from 'axios';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import ChangingProgressProvider from "./ChangingProgressProvider";
import '../css/new.css';
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
      aoda_results: [],
      url: "",
      email: ""


    }


  }

  componentDidMount() {


    var urlfetch = this.props.match.params.id + '//' + this.props.match.params.url + '/';
    console.log(urlfetch);
    const loc = {
      location: urlfetch
    }
   


    axios.post('http://localhost:5000/seo_reports/getByUrl', loc)
      .then(res => {
        console.log(res.data + "hhih")

        if (res.data.length > 0) {
          this.setState({
            seo: res.data,
          })
          console.log(this.state.seo + "data from seo")


        }
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
    // console.log("hello"+request);

    axios.post('http://localhost:5000/tally_reports/getByUrl', loc)
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
          aoda_results: this.state.aoda[0].results

        })
        console.log(this.state.aoda[0].results[0]);

      })
    // axios.post('http://localhost:5000/email/sendEmail/', email).then((res) => {
    //   //break
    //   console.log(res.data + "response from mail");
    // });

    // if (this.state.flag == 0) {
    //   console.log("inside component did mount calling email function");
    //   this.email();
    // }






  }
  onSubmit = async (e) => {
    e.preventDefault();
    var urlfetch = this.props.match.params.id + '//' + this.props.match.params.url + '/';
    const email = {
      email: this.props.match.params.email,
      location: urlfetch
    }

    axios.post('http://localhost:5000/email/sendEmail/', email).then((res) => {
    //break
    console.log(res.data + "response from mail");
  });

 
   

}





  render() {

    var items = this.state.seo_result.map((value) =>
      <li className="list-group-item">{value}</li>
    );




    const result = this.state.aoda_results.map((d) =>
      <div>
        <li className="list-group-item"><h5>Type:</h5>  {d.type}<br />
          <h5> Description:</h5>  {d.description} <br />
          <h5> Impact:</h5> <b>{d.impact}</b>


        </li>
        {/* <li className="list-group-item" key={d.description}>{d.description}</li> */}
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
              <div className="panel-group">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h4 className="panel-title">
                      <p data-toggle="collapse" href="#collapse1">Performance Result <i className="fas fa-angle-double-down right"></i></p>
                    </h4>
                  </div>
                  <div id="collapse1" className="panel-collapse uncollapse">
                    <ul className="list-group">


                      <li className="list-group-item" >First Contentful Paint: {this.state.Performance_result.FCP}</li>
                      <li className="list-group-item">First CPU Idle: {this.state.Performance_result.FCI}</li>
                      <li className="list-group-item">First Meaningful Paint: {this.state.Performance_result.FMP}</li>
                      <li className="list-group-item">Speed Index:  {this.state.Performance_result.SI}</li>
                      <li className="list-group-item">Time To Interactive: {this.state.Performance_result.TTI}</li>
                    </ul>

                  </div>

                  <div className="panel-heading">
                    <h4 className="panel-title">
                      <p data-toggle="collapse" href="#collapse2">Result <i className="fas fa-angle-double-down right"></i></p>
                    </h4>
                  </div>
                  <div id="collapse2" className="panel-collapse uncollapse">
                    <ul className="list-group">
                      {items}

                      {/* <li className="list-group-item">Four</li>
                        <li className="list-group-item">Five</li>
                        <li className="list-group-item">Six</li> */}
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
              <div className="panel-group">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h4 className="panel-title">
                      <p data-toggle="collapse" href="#collapse3">Summary <i className="fas fa-angle-double-down right"></i></p>
                    </h4>
                  </div>
                  <div id="collapse3" className="panel-collapse uncollapse">
                    <ul className="list-group">
                      <li className="list-group-item">Errors:{this.state.aoda_summary.errors}</li>
                      <li className="list-group-item">Warnings:{this.state.aoda_summary.warnings}</li>
                      <li className="list-group-item">Total Tags:{this.state.aoda_summary.total_tags}</li>
                    </ul>
                  </div>

                  <div className="panel-heading">
                    <h4 className="panel-title">
                      <p data-toggle="collapse" href="#collapse4">Aoda Results <i className="fas fa-angle-double-down right"></i></p>
                    </h4>
                  </div>
                  <div id="collapse4" className="panel-collapse uncollapse">
                    <ul className="list-group">
                      {result}
                      {/* <li className="list-group-item">Four</li>
                        <li className="list-group-item">Five</li>
                        <li className="list-group-item">Six</li> */}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <form className="centre-block mt-4 mx-auto w-50" onSubmit={this.onSubmit}>
                     
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary d-block mt-4 mx-auto">Send Report</button>
                            {/* <input className="btn btn-primary d-block mt-4 mx-auto"  type="submit" value="See Report" className="btn btn-primary" /> */}
                        </div>
                        {/* <Button variant="btn btn-success" >See Report</Button> */}
                        {/* onClick={() => history.push('/secondPage')} */}

                        {/* <button type="submit" className="btn btn-primary d-block mt-4 mx-auto" onClick={history.push('/secondPage')}>See report</button> */}

                    </form>

      </div>

    );

  }
}


export default SecondPage;