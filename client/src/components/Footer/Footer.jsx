import githubIcon from "../../assets/icons/github.svg";
import linkedInIcon from "../../assets/icons/linkedin.svg";
// import xIcon from "../../assets/icons/x.svg";
import styles from "./footer.module.css";

function Footer() {
    return (
        <footer>
            <span>made by Kamohelo Matobako</span>
            <div className={styles.socialContainer}>
                <a href="https://www.linkedin.com/in/kamohelo-matobako/">
                    <img src={linkedInIcon} alt="LinkedIn icon" />
                </a>
                <a href="https://github.com/Kamocca1">
                    <img src={githubIcon} alt="Github icon" />
                </a>
                {/* <a href="https://x.com/myprofile">
                    <img src={xIcon} alt="X platform icon" />
                </a> */}
            </div>
        </footer>
    );
}

export default Footer;
