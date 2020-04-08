import React from 'react';
import img from '../image/aboutimg.jpg';
import Nirmit from '../image/Nirmit.JPG';
import Keval from '../image/Keval.jpg';
import Preksha from '../image/Preksha.jfif';
import Archan from '../image/Archan.jfif';


function About() {
  return (
    <div>
      <div className="container-fluid w-70 mt-2">
      
        <div className="d-flex row col-12">
          <div className="col-3 text-right">
            <img src={img} alt="img" className="navbar-brand"  width="180" height="230" />
          </div>
              <h4 className="text-lg w-75 ">
                Dare &amp; Defy helps organizations and entrepreneurs define and achieve their version of success purposefully and consciously.
                <p>&nbsp;</p>
                We look at your business operations, sales process and resources (people, skill sets, budget) 
                to perfect the optimal mix of tactics, tools, and technologies to promote your business, grow your audience, sell more and build a community.
                <p>&nbsp;</p>
                Together, we work on defining what makes your business truly unique, and develop a strategic roadmap and a marketing plan to take your business from where it is, to where you want it to be.
            
              </h4>
        </div> 
        <p>&nbsp;</p>

        <div className="d-flex row col-12">
          <div className="col-12">
            <h3 className="mx-auto text-lg-center w-75 text-info">
              Designed and Developed by: 
            </h3>
          </div>
        </div>

        <div className="row col-12">
          <div className="col-6">
            <h3 className="text-lg-right">
              <img src={Archan} alt="img" className="rounded-circle"  width="100" height="100" />  
            </h3>
          </div>
          <div className="col-6">
            <h3 className="text-lg-left text-info mt-4">
              <a href="https://www.linkedin.com/in/archanshahh/" className="text-success">Archan Shah</a> <br></br>
            </h3>
          </div>
        </div>

        <div className="row col-12">
          <div className="col-6">
            <h3 className="text-lg-right">
            <img src={Keval} alt="img" className="rounded-circle"  width="100" height="100" />  
            </h3>
          </div>
          <div className="col-6">
            <h3 className="text-lg-left text-info mt-4">
              <a href="https://www.linkedin.com/in/keval-shah-67b74616b/" className="text-success">Keval Shah</a> <br></br>
            </h3>
          </div>
        </div>

        <div className="row col-12">
          <div className="col-6">
            <h3 className="text-lg-right">
              <img src={Nirmit} alt="img" className="rounded-circle"  width="100" height="100" /> 
            </h3>
          </div>
          <div className="col-6">
            <h3 className="text-lg-left text-info mt-4">
              <a href="https://www.linkedin.com/in/nirmit-patel-7b1562196/" className="text-success">Nirmit Patel</a> <br></br>
            </h3>
          </div>
        </div>

        <div className="row col-12">
          <div className="col-6">
            <h3 className="text-lg-right">
              <img src={Preksha} alt="img" className="rounded-circle"  width="100" height="100" />  
            </h3>
          </div>
          <div className="col-6">
            <h3 className="text-lg-left text-info mt-4">
              <a href="https://www.linkedin.com/in/prekshapatel18/" className="text-success">Preksha Patel</a> <br></br>
            </h3>
          </div>
        </div>

        
      </div>
    </div>
  );
}

export default About;