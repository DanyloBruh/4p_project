import { Container } from "react-bootstrap";
import "./PrivacyPolicy.scss";

function PrivacyPolicy() {
  return (
    <div className="privacy-policy">
      <Container>
        <h1>Privacy Policy</h1>
        <p className="update-time">Last updated: January 2, 2024</p>
        <p className="info-text">
          We are committed to maintaining the accuracy, confidentiality, and
          security of your personally identifiable information ("Personal
          Information"). As part of this commitment, our privacy policy governs
          our actions as they relate to the collection, use and disclosure of
          Personal Information. Our privacy policy is based upon the values set
          by the Canadian Standards Association's Model Code for the Protection
          of Personal Information and Canada's Personal Information Protection
          and Electronic Documents Act.
        </p>
        <hr />
        <div className="info-section">
          <h2>Introduction</h2>
          <p className="info-text">
            We are responsible for maintaining and protecting the Personal
            Information under our control. We have designated an individual or
            individuals who is/are responsible for compliance with our privacy
            policy.
          </p>
          <hr />
        </div>
        <div className="info-section">
          <h2>Identifying Purposes</h2>
          <p className="info-text">
            We collect, use and disclose Personal Information to provide you
            with the product or service you have requested and to offer you
            additional products and services we believe you might be interested
            in. The purposes for which we collect Personal Information will be
            identified before or at the time we collect the information. In
            certain circumstances, the purposes for which information is
            collected may be clear, and consent may be implied, such as where
            your name, address and payment information is provided as part of
            the order process.
          </p>
          <hr />
        </div>
        <div className="info-section">
          <h2>Consent</h2>
          <p className="info-text">
            Knowledge and consent are required for the collection, use or
            disclosure of Personal Information except where required or
            permitted by law. Providing us with your Personal Information is
            always your choice. However, your decision not to provide certain
            information may limit our ability to provide you with our products
            or services. We will not require you to consent to the collection,
            use, or disclosure of information as a condition to the supply of a
            product or service, except as required to be able to supply the
            product or service.
          </p>
          <hr />
        </div>
      </Container>
    </div>
  );
}

export default PrivacyPolicy;
