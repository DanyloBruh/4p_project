import React from 'react';

import { Container } from 'react-bootstrap';
import './PrivacyPolicy.scss';

function PrivacyPolicy() {
  return (
    <div className="privacy-policy">
      <Container>
        <h1>Privacy Policy</h1>
        <p className="update-time">Last updated: February 26, 2024</p>
        <p className="info-text">
          This policy sets out how you may use our website and how 4rom PEOPLE
          uses and protects any information that you give us when you use this
          website. 4rom PEOPLE is registered in England, no 11254066.
        </p>
        <hr />
        <div className="info-section">
          <h2>Visiting our website</h2>
          <p className="info-text">
            By visiting www.4rompeople.com you agree that you will not
            reproduce, copy, emulate or create derivative works from the content
            of the website. When using our website you must not introduce any
            files containing malicious code including, but not limited to,
            viruses, Trojan Horses, spyware or malware. You must not attempt to
            gain unauthorized access to our website or attack our website,
            servers, computers or databases in any way. You further agree that
            you will not act in a manner which may be perceived as damaging to
            the reputation of 4rom PEOPLE. The information displayed on our
            website is provided without any guarantees, conditions or warranties
            as to its accuracy.
          </p>
          <hr />
        </div>
        <div className="info-section">
          <h2>Your privacy</h2>
          <p className="info-text">
            4rom PEOPLE is committed to ensuring that your privacy is protected.
            Should we ask you to provide certain information by which you can be
            identified when using this website then you can be assured that it
            will only be used in accordance with this privacy statement. We will
            never pass your details on to any third party without asking for
            your permission, unless we are required to do so by law. Online
            ordering If you order a product delivery via our website, we collect
            the following personal information: • Name • Address • Telephone
            number • Email address • Any other information you choose to provide
            Your information will be used for the sole purpose of fulfilling
            your order. For further information or to withdraw your consent for
            us to store your personal information please contact us.
            (www.4rompeople.com/contact/)
          </p>
          <hr />
        </div>
        <div className="info-section">
          <h2>Secure payments via Paymentsense</h2>
          <p className="info-text">
            Card payments are securely processed on our behalf by Paymentsense.
            As such, The Anchor does not see nor store your card details.
          </p>
          <hr />
        </div>
        <div className="info-section">
          <h2>Server security</h2>
          <p className="info-text">
            4rom PEOPLE website is hosted on servers managed by Clook.
            (https://www.clook.net/) All data transferred between users and the
            Clook servers is encrypted. Only technical staff at Clook and our
            website management company have access to the data stored on the
            server.
          </p>
          <hr />
        </div>
      </Container>
    </div>
  );
}

export default PrivacyPolicy;
