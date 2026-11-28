import { TEAM } from '../../constants';
import './About.css';

export const About = () => {
  return (
    <section className="about">
      <h1 className="about__title heading-text">О нас</h1>
      <p className="about__description body-text">
        Учебный интернет-магазин автозапчастей: каталог, корзина, промокод.
      </p>

      <h2 className="about__subtitle title-text">Команда</h2>
      <ul className="about__team">
        {TEAM.map((member) => (
          <li key={member.login} className="about__member">
            <img
              className="about__photo"
              src={member.photo}
              alt={`Фото ${member.login}`}
            />
            <div className="about__member-info">
              <a
                className="about__member-link title-text"
                href={member.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {member.login}
              </a>
              <p className="about__member-contribution body-text">
                {member.contribution}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
