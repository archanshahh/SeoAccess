import React from 'react';


function About() {
  return (
    <div>
      <div className="container-fluid w-70 mt-2 mx-auto">
        <div className="d-flex flex-column align-items-center text-center">
        
        <div className=" border border-dark border-3 w-50 bg-dark text-light mt-2">
          <div className="col-12 text-center mx-auto">
            <h4 className="mx-auto text-lg-center w-75 ">
              Dare &amp; Defy helps organizations and entrepreneurs define and achieve their version of success purposefully and consciously.
            </h4>
          </div>
        </div>
        
        <p>&nbsp;</p>

        <div className="border border-dark border-3 w-50 text-dark bg-light mt-2">
          <div className="col-12 text-center mx-auto">
            <h4 className="mx-auto text-lg-center w-75 ">
              We look at your business operations, sales process and resources (people, skill sets, budget) 
              to perfect the optimal mix of tactics, tools, and technologies to promote your business, grow your audience, sell more and build a community.
            </h4>
          </div>
        </div>

        <p>&nbsp;</p>

        <div className=" border border-dark border-3 w-50 mt-2">
          <div className="col-12 text-center mx-auto">
            <h4 className="mx-auto text-lg-center w-75 text-info">
            Together, we work on defining what makes your business truly unique, and develop a strategic roadmap and a marketing plan to take your business from where it is, to where you want it to be.
            </h4>
          </div>
        </div>

        </div>
      </div>
    </div>
  );
}

export default About;