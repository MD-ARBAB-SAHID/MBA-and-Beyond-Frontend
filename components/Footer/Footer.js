import Styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={`w-100 py-4 flex-shrink-0 ${Styles["footer"]}`}>
      <div className="container py-4">
        <div className="row gy-4 ">
          <div className={`col-lg-12 col-md-12 ${Styles["text-center"]}`}>
            <h5 className="h1 text-white">Beyond Pvt. Ltd.</h5>

            <p className="large text-muted mb-0">
              &copy; Copyrights. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
