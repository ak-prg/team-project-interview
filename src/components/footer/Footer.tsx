import { TEAM } from '../../constants';
import './Footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__container">
        <div className="footer__team">
          <img className="footer__github" src="/github.svg" alt="GitHub" />
          <ul className="footer__links caption-text">
            {TEAM.map(({ login, url }) => (
              <li key={login}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {login}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <span className="footer__year title-text">2026</span>

        <a
          className="footer__school"
          href="https://rs.school/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/school.svg" alt="RS School" />
        </a>
      </div>
    </footer>
  );
}
