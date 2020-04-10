import React, { Component } from 'react';
import Map from './maps';

export class Contact extends Component {
  render() {
    return (
      <div>
        <div className="container">
        <div className=" row col-12">
          <div className="col-6">
            <div className="container-fluid mt-4">
              <div className="text-light mt-2">
                <div className="col-12 text-left">
                  <h4 className="mx-auto text-lg-left ">
                    We’re located at:
                    </h4>
                  <p>&nbsp;</p>
                  <h6 className="text-lg-left">
                    1179 King Street West, Unit 008 <br></br>
                      Toronto, ON&nbsp; M6K 3C5
                    </h6>
                  <p>&nbsp;</p>
                  <h4 className="mx-auto text-lg-left d-inline-block">
                    Email: <a rel="author" href="mailto:hello@dndstrategy.com">hello@dndstrategy.com</a>
                  </h4>
                  <h4 className="mx-auto text-lg-left d-inline-block">
                    <p>Phone: 416.919.6817</p>
                  </h4>
                  <p>&nbsp;</p>
                  <h4 className="mx-auto text-lg-left text-info d-inline-block">
                    Follow us on: <br></br>
                    <a rel="author" href="https://www.instagram.com/dndstrategy/" className="text-success">Instagram @dndstrategy</a> <br></br>
                    <a href="https://www.facebook.com/dndstrategy/" className="text-success" rel="author">Facebook @dndstrategy</a> <br></br>
                    <a href="https://www.linkedin.com/company/d&amp;d-strategy/" className="text-success" rel="author">LinkedIn Dare &amp; Defy</a> <br></br>
                  </h4>
                </div>
              </div>
            <br/><br/><br/>
            </div>
          </div>
          <div className="col-6 mt-3">
            <Map />
          </div>
        </div>
      </div>
      <div className="mt-5"></div>
    </div >
  );
  }
}

export default Contact;