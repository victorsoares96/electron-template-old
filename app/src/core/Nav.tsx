import { NavigateFunction, useNavigate } from 'react-router-dom';
import {
  validateLicenseRequest,
  validateLicenseResponse,
  // @ts-ignore
} from 'secure-electron-license-keys';
import ROUTES from '@src/constants/routes.json';
import { useEffect, useState } from 'react';

interface LicenseModalProps {
  licenseModalActive: boolean;
  licenseValid: boolean;
  allowedMajorVersions: string;
  allowedMinorVersions: string;
  allowedPatchVersions: string;
  licenseExpiry: string;
  appVersion: {
    major: number;
    minor: number;
    patch: number;
  } | null;
  toggleLicenseModal: () => void;
}

function LicenseModal({
  licenseModalActive,
  licenseValid,
  allowedMajorVersions,
  allowedMinorVersions,
  allowedPatchVersions,
  licenseExpiry,
  appVersion,
  toggleLicenseModal,
}: LicenseModalProps) {
  return (
    <div className={`modal ${licenseModalActive ? 'is-active' : ''}`}>
      <div className="modal-background"></div>
      <div className="modal-content">
        {licenseValid ? (
          <div className="box">
            The license key for this product has been validated and the
            following versions of this app are allowed for your use:
            <div>
              <strong>Major versions:</strong> {allowedMajorVersions} <br />
              <strong>Minor versions:</strong> {allowedMinorVersions} <br />
              <strong>Patch versions:</strong> {allowedPatchVersions} <br />
              <strong>Expires on:</strong>{' '}
              {!licenseExpiry ? 'never!' : licenseExpiry} <br />(
              <em>
                App version:
                {` v${appVersion?.major}.${appVersion?.minor}.${appVersion?.patch}`}
              </em>
              )
              <br />
            </div>
          </div>
        ) : (
          <div className="box">
            <div>The license key is not valid.</div>
            <div>
              If you'd like to create a license key, follow these steps:
              <ol style={{ marginLeft: '30px' }}>
                <li>
                  Install this package globally (
                  <strong>npm i secure-electron-license-keys-cli -g</strong>).
                </li>
                <li>
                  Run <strong>secure-electron-license-keys-cli</strong>.
                </li>
                <li>
                  Copy <strong>public.key</strong> and{' '}
                  <strong>license.data</strong> into the <em>root</em> folder of
                  this app.
                </li>
                <li>
                  Re-run this app (ie. <strong>npm run dev</strong>).
                </li>
                <li>
                  If you'd like to further customize your license keys, copy
                  this link into your browser:{' '}
                  <a href="https://github.com/reZach/secure-electron-license-keys-cli">
                    https://github.com/reZach/secure-electron-license-keys-cli
                  </a>
                  .
                </li>
              </ol>
            </div>
          </div>
        )}
      </div>

      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={toggleLicenseModal}
      ></button>
    </div>
  );
}

function Nav(props: { navigate: NavigateFunction }) {
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const [licenseModalActive, setLicenseModalActive] = useState(false);
  const [licenseValid, setLicenseValid] = useState(false);
  const [allowedMajorVersions, setAllowedMajorVersions] = useState('');
  const [allowedMinorVersions, setAllowedMinorVersions] = useState('');
  const [allowedPatchVersions, setAllowedPatchVersions] = useState('');
  const [appVersion, setAppVersion] = useState<{
    major: number;
    minor: number;
    patch: number;
  } | null>(null);
  const [licenseExpiry, setLicenseExpiry] = useState('');

  function toggleMenu() {
    setMobileMenuActive(oldState => !oldState);
  }

  function toggleLicenseModal() {
    const previous = licenseModalActive;

    // Only send license request if the modal
    // is not already open
    if (!previous) {
      window.api.licenseKeys.send(validateLicenseRequest);
    }

    setLicenseModalActive(oldState => !oldState);
  }

  // Using a custom method to navigate because we
  // need to close the mobile menu if we navigate to
  // another page
  function navigate(url: string) {
    setMobileMenuActive(false);
    props.navigate(url);
  }

  useEffect(() => {
    window.api.licenseKeys.onReceive(
      validateLicenseResponse,
      function (data: any) {
        // If the license key/data is valid
        if (data.success) {
          // Here you would compare data.appVersion to
          // data.major, data.minor and data.patch to
          // ensure that the user's version of the app
          // matches their license
          setLicenseValid(true);
          setAllowedMajorVersions(data.major);
          setAllowedMinorVersions(data.minor);
          setAllowedPatchVersions(data.patch);
          setAppVersion(data.appVersion);
          setLicenseExpiry(data.expire);
        } else {
          setLicenseValid(false);
        }
      },
    );

    return () => {
      window.api.licenseKeys.clearRendererBindings();
    };
  }, []);
  return (
    <nav
      className="navbar is-dark"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a
          role="button"
          className={`navbar-burger ${mobileMenuActive ? 'is-active' : ''}`}
          data-target="navbarBasicExample"
          aria-label="menu"
          aria-expanded="false"
          onClick={() => toggleMenu()}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div
        id="navbarBasicExample"
        className={`navbar-menu ${mobileMenuActive ? 'is-active' : ''}`}
      >
        <div className="navbar-start">
          <a className="navbar-item" onClick={() => navigate(ROUTES.WELCOME)}>
            Home
          </a>

          <a className="navbar-item" onClick={() => navigate(ROUTES.ABOUT)}>
            About
          </a>

          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">Sample pages</a>

            <div className="navbar-dropdown">
              <a className="navbar-item" onClick={() => navigate(ROUTES.MOTD)}>
                Using the Electron store
              </a>
              <a
                className="navbar-item"
                onClick={() => navigate(ROUTES.LOCALIZATION)}
              >
                Changing locales
              </a>
              <a
                className="navbar-item"
                onClick={() => navigate(ROUTES.UNDOREDO)}
              >
                Undo/redoing actions
              </a>
              <a
                className="navbar-item"
                onClick={() => navigate(ROUTES.CONTEXTMENU)}
              >
                Custom context menu
              </a>
              <a className="navbar-item" onClick={() => navigate(ROUTES.IMAGE)}>
                Sample image loaded
              </a>
            </div>
          </div>
        </div>

        <LicenseModal
          allowedMajorVersions={allowedMajorVersions}
          allowedMinorVersions={allowedMinorVersions}
          allowedPatchVersions={allowedPatchVersions}
          appVersion={appVersion}
          licenseExpiry={licenseExpiry}
          licenseModalActive={licenseModalActive}
          licenseValid={licenseValid}
          toggleLicenseModal={toggleLicenseModal}
        />

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <a className="button is-light" onClick={toggleLicenseModal}>
                Check license
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function WithNavigate(props: any) {
  const navigate = useNavigate();
  return <Nav {...props} navigate={navigate} />;
}

export default WithNavigate;
