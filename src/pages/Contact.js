import React from "react";
import Layout from "./../components/Layout/Layout";

const Contact = () => {
    return (
        <Layout title={"Contact Us"}>
            {/* <div className="row contactus">
                <div className="col-md-4">
                    <img
                        src="/images/contactus.jpeg"
                        alt="contactus"
                        style={{ width: "100%" }}
                    />
                </div> */}
            <div className="col-md-12">
                <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
                <div>
                    <iframe
                        src="https://docs.google.com/forms/d/e/1FAIpQLScrT4fpEDC1lkov-OU3GQ3Zr4fDg7azLTCtkRHDIX_O-Amixg/viewform?usp=header"
                        width="100%"
                        height="600"
                    >
                        Loading…
                    </iframe>
                </div>
            </div>
            {/* </div> */}
        </Layout >
    );
};

export default Contact;
