/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './Contacts.scss';
import ContactBg from '../../Assets/contacts-bg.webp';
import ImageComponent from '../../Components/Image/ImageComponent';

function Contacts() {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);
  return (
    <div className="contacts-content">
      <ImageComponent
        src={ContactBg}
        alt="contact-bg"
        hash="LIIN%9_4NHrp16j^ofkCtSInn%kr"
        height="100%"
        width="100%"
      />
      <Container className="contact-card">
        <h2>Contacts</h2>
        <Row>
          <Col md={6} sm={12} className="col-contacts-info">
            <Row>
              <Col md={12} sm={5} className="contacts-info">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                >
                  <path
                    d="M19.875 3.72917C19.875 12.6462 12.6462 19.875 3.72917 19.875C3.32685 19.875 2.92798 19.8603 2.53304 19.8314C2.07981 19.7981 1.85319 19.7816 1.64691 19.6628C1.47605 19.5645 1.31402 19.3901 1.22839 19.2125C1.125 18.9981 1.125 18.748 1.125 18.2479V15.3132C1.125 14.8926 1.125 14.6823 1.19422 14.5021C1.25536 14.3428 1.35468 14.201 1.48344 14.0892C1.6292 13.9625 1.82683 13.8906 2.22209 13.7469L5.56255 12.5322C6.02243 12.365 6.25236 12.2814 6.47052 12.2955C6.66288 12.308 6.848 12.3737 7.00527 12.4852C7.18362 12.6116 7.30951 12.8214 7.56127 13.241L8.41667 14.6667C11.177 13.4166 13.4147 11.1759 14.6667 8.41667L13.241 7.56127C12.8214 7.30951 12.6116 7.18362 12.4852 7.00527C12.3737 6.848 12.308 6.66288 12.2955 6.47052C12.2814 6.25236 12.365 6.02243 12.5322 5.56255L13.7469 2.22209C13.8906 1.82683 13.9625 1.6292 14.0892 1.48344C14.201 1.35468 14.3428 1.25536 14.5021 1.19422C14.6823 1.125 14.8926 1.125 15.3132 1.125H18.2479C18.748 1.125 18.9981 1.125 19.2125 1.22839C19.3901 1.31402 19.5645 1.47605 19.6628 1.64691C19.7816 1.8532 19.7981 2.07981 19.8314 2.53305C19.8603 2.92798 19.875 3.32685 19.875 3.72917Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="contacts-info-text">
                  <h2>Phone</h2>
                  <a href="tel:+447867256198">+447867256198</a>
                </div>
              </Col>
              <Col md={12} sm={7} className="contacts-info">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                >
                  <path
                    d="M24.9388 5.38872C24.8349 4.86362 24.6006 4.36733 24.2588 3.9501C24.1894 3.8625 24.1167 3.78457 24.0374 3.70552C23.4292 3.09419 22.5833 2.74356 21.7165 2.74356H3.2834C2.40688 2.74356 1.58252 3.08535 0.962158 3.70586C0.883643 3.78418 0.81084 3.86289 0.73877 3.95327C0.398438 4.36875 0.165186 4.86436 0.0637695 5.39019C0.0213867 5.59668 0 5.81064 0 6.0271V18.9732C0 19.4236 0.0915039 19.8622 0.2729 20.2792C0.429883 20.6494 0.668066 21.0004 0.961963 21.2942C1.03599 21.3679 1.10952 21.4358 1.18804 21.5021C1.77563 21.9887 2.51968 22.2565 3.2834 22.2565H21.7165C22.4852 22.2565 23.2285 21.9877 23.8145 21.4967C23.8928 21.4333 23.9654 21.3668 24.038 21.2942C24.3221 21.0104 24.5479 20.6843 24.7102 20.3248L24.7316 20.2735C24.9096 19.8645 25 19.4273 25 18.9733V6.0271C25 5.81348 24.9794 5.5981 24.9388 5.38872ZM1.70034 4.83906C1.74678 4.77109 1.80605 4.70132 1.88169 4.6251C2.25713 4.24985 2.75503 4.04336 3.28335 4.04336H21.7165C22.2494 4.04336 22.7475 4.2502 23.1187 4.62583C23.1829 4.69063 23.2441 4.76255 23.2975 4.83442L23.4385 5.02388L13.5996 13.5989C13.2963 13.8648 12.9058 14.0111 12.4999 14.0111C12.0979 14.0111 11.7078 13.8651 11.4008 13.5992L1.57178 5.02632L1.70034 4.83906ZM1.3064 19.0875C1.30107 19.0523 1.29985 19.0131 1.29985 18.9732V6.29517L8.93511 12.9559L1.3769 19.5458L1.3064 19.0875ZM22.7001 20.6953C22.4046 20.8658 22.0643 20.9563 21.7165 20.9563H3.2834C2.9354 20.9563 2.59521 20.8658 2.2999 20.6953L1.99092 20.5162L9.80029 13.7106L10.6562 14.455C11.1695 14.9007 11.8242 15.1464 12.5 15.1464C13.1782 15.1464 13.8339 14.9007 14.347 14.455L15.2025 13.7103L23.0092 20.5166L22.7001 20.6953ZM23.6998 18.9732C23.6998 19.0125 23.6991 19.0512 23.6941 19.0857L23.6265 19.5482L16.065 12.9594L23.6998 6.29839V18.9732Z"
                    fill="white"
                  />
                </svg>
                <div className="contacts-info-text">
                  <h2>Email</h2>
                  <a href="mailto:frompeople4@gmail.com">
                    frompeople4@gmail.com
                  </a>
                </div>
              </Col>
              <Col md={12} sm={5} className="contacts-info">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                >
                  <path
                    d="M8.33317 12.5H8.34358M12.4998 12.5H12.5102M16.6665 12.5H16.6769M21.8789 12.5C21.8789 17.6777 17.6816 21.875 12.5039 21.875C10.3826 21.875 3.12966 21.875 3.12966 21.875C3.12966 21.875 4.75381 17.9751 4.10381 16.6675C3.47979 15.4121 3.12891 13.9971 3.12891 12.5C3.12891 7.32233 7.32623 3.125 12.5039 3.125C17.6816 3.125 21.8789 7.32233 21.8789 12.5Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="contacts-info-text social-media">
                  <h2>social media</h2>
                  <a href="https://www.instagram.com/4rom_people/">instagram</a>
                  <a href="https://www.facebook.com/from.people.4">facebook</a>
                </div>
              </Col>
              <Col md={12} sm={7} className="contacts-info">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                >
                  <path
                    d="M12.5 8.33334V12.5L15.1042 15.1042"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2.0835 12.5C2.0835 7.58954 2.0835 5.13431 3.60899 3.60883C5.13446 2.08334 7.58969 2.08334 12.5002 2.08334C17.4106 2.08334 19.8659 2.08334 21.3913 3.60883C22.9168 5.13431 22.9168 7.58954 22.9168 12.5C22.9168 17.4104 22.9168 19.8657 21.3913 21.3912C19.8659 22.9167 17.4106 22.9167 12.5002 22.9167C7.58969 22.9167 5.13446 22.9167 3.60899 21.3912C2.0835 19.8657 2.0835 17.4104 2.0835 12.5Z"
                    stroke="white"
                    strokeWidth="2"
                  />
                </svg>
                <div className="contacts-info-text">
                  <h2>working hours</h2>
                  <div>
                    <p>Mon-Fri:</p>
                    <p>10:00 am - 5:00 pm</p>
                  </div>
                  <div>
                    <p>Sat-Sun:</p>
                    <p>10:00 am - 5:00 pm</p>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col md={6} sm={12} className="col-contacts-address">
            <div className="google-map">
              <iframe
                name="map"
                width={
                  windowSize <= 575
                    ? windowSize <= 370
                      ? '100%'
                      : '320'
                    : '350'
                }
                height={windowSize <= 575 ? '300' : '350'}
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                src="https://maps.google.com/maps?width=350&amp;height=350&amp;hl=en&amp;q=2%20Pavilion%20Cottages,%20Highgate,%20Forest%20Row%20RH18%205BA+(4P)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              >
                <a href="https://www.gps.ie/">gps trackers</a>
              </iframe>
            </div>
            <p className="address-map">
              you can find us at | Cambridge House, Highgate, Forest Row, RH18
              5BA
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Contacts;
