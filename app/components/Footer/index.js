// @flow

import cx from 'classnames';
import Flex from 'app/components/Layout/Flex';
import utilityStyles from 'app/styles/utilities.css';
import { Image } from 'app/components/Image';
import netcompany from 'app/assets/netcompany_white.svg';
import Octocat from 'app/assets/Octocat.png';
import Icon from 'app/components/Icon';
import styles from './Footer.css';
import moment from 'moment-timezone';
import { Link } from 'react-router-dom';

type Props = {
  loggedIn: boolean,
};

const Footer = ({ loggedIn }: Props) => (
  <footer className={styles.footer}>
    <div className={styles.footerContent}>
      <Flex column>
        <Flex>
          <div className={cx(styles.section, utilityStyles.hiddenOnMobile)}>
            <a
              href="https://github.com/webkom"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Image className={styles.octocat} src={Octocat} />
            </a>
            <h2>LEGO</h2>
            <p>
              Er du interessert i hvordan LEGO fungerer, eller vil du rapportere
              en bug, kan du gå inn på vår GitHub. Her tar vi gjerne imot issues
              og pull-requests.
              <br />
              <a
                href="https://github.com/webkom/lego-webapp"
                rel="noopener noreferrer"
                target="_blank"
              >
                LEGO FRONTEND
              </a>
              <br />
              <a
                href="https://github.com/webkom/lego"
                rel="noopener noreferrer"
                target="_blank"
              >
                LEGO BACKEND
              </a>
            </p>
          </div>
          <div className={cx(styles.section, utilityStyles.hiddenOnMobile)}>
            <Image
              className={cx(styles.cooperator, styles.desktopLogo)}
              src={netcompany}
            />
          </div>
          <div className={styles.section}>
            <Icon
              className={styles.contact}
              size={50}
              name="chatbubbles-outline"
            />
            <h2>Kontakt</h2>
            <a href="mailto:abakus@abakus.no">abakus@abakus.no</a>
            {loggedIn && (
              <p>
                <Link to="/contact">Anonymt kontaktskjema</Link>
              </p>
            )}
            <p>Abakus</p>
            <p>Sem Sælands vei 7-9</p>
            <p>7491 Trondheim</p>
          </div>
        </Flex>
        <Image
          className={cx(styles.cooperator, utilityStyles.hiddenOnDesktop)}
          src={netcompany}
        />
        <div className={styles.cookiesDiv}>
          <p className={styles.cookiesBox}>
            © {moment().year()} Abakus | {}
            <a href="https://abakus.no/pages/personvern/114-informasjonskapsler">
              Informasjonskapsler (cookies)
            </a>
          </p>
        </div>
      </Flex>
    </div>
  </footer>
);

export default Footer;
