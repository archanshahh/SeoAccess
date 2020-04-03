import React from 'react';


import { BrowserRouter as Router, Route} from "react-router-dom";
import About from './about';


function Contact() {
  return (
    <div>
      <div className="container-fluid w-70 mt-2 mx-auto">
        <div className="d-flex flex-column align-items-center text-center">
        
        <div className=" border border-dark border-3 w-50 bg-dark text-light mt-2">
          <div className="col-12 text-center mx-auto">
            <h4 className="mx-auto text-lg-center w-75 ">
              We’re located at:
            </h4>
            <p>&nbsp;</p>
            <h6 className="mx-auto text-lg-center w-75 ">
              1179 King Street West, Unit 008 <br></br>
              Toronto, ON&nbsp; M6K 3C5
            </h6>
          </div>
        </div>
        
        <p>&nbsp;</p>

        <div className="border border-dark border-3 w-50 text-dark bg-light mt-2">
          <div className="col-12 text-center mx-auto">
            <h4 className="mx-auto text-lg-center w-75 ">
              email: <a href="mailto:hello@dndstrategy.com">hello@dndstrategy.com</a>  
            </h4>
            <h4 className="mx-auto text-lg-center w-75 ">
              <p>phone: 416.919.6817</p>  
            </h4>
            
          </div>
        </div>

        <p>&nbsp;</p>

        <div className=" border border-dark border-3 w-50 mt-2">
          <div className="col-12 text-center mx-auto">
            <h4 className="mx-auto text-lg-center w-75 text-info">
              Follow us on: <br></br>
              <a href="https://www.instagram.com/dndstrategy/" className="text-success">Instagram @dndstrategy</a> <br></br>
              <a href="https://www.facebook.com/dndstrategy/" className="text-success">Facebook @dndstrategy</a> <br></br>
              <a href="https://www.linkedin.com/company/d&amp;d-strategy/" className="text-success">LinkedIn Dare &amp; Defy</a> <br></br>
            </h4>
          </div>
        </div>

        </div>
      </div>
    </div>
  );
}

export default Contact;