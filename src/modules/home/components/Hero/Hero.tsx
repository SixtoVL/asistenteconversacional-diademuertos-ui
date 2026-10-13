import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../components/ui/Button';
import heroImage from '../../../../assets/diademuertos_image1.jpg';
import styles from './Hero.module.css';

export function Hero() {
  const navigate = useNavigate();

  const handleStart = (): void => {
    void navigate('/chat');
  };

  return (
    <section id="inicio" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.heroInner}>
        <div className={styles.copy}>
          <span className={styles.eyebrow}>Sistema experto + LLM opcional</span>
          <h1 id="hero-title" className={styles.title}>
            Tu asistente del <span className={styles.titleAccent}>Día de Muertos</span>
          </h1>
          <p className={styles.subtitle}>
            Consulta la historia, las tradiciones y el significado de las ofrendas, y recibe
            recomendaciones para preparar la tuya, con conocimiento respaldado por fuentes
            culturales.
          </p>
          <div className={styles.ctaRow}>
            <Button type="button" onClick={handleStart}>
              Comenzar a conversar
            </Button>
            <a href="#como-funciona" className={styles.secondaryLink}>
              Cómo funciona
            </a>
          </div>
        </div>
        <figure className={styles.figure}>
          <img
            src={heroImage}
            alt="Calavera de azúcar decorada con flores de cempasúchil"
            className={styles.image}
          />
        </figure>
      </div>
    </section>
  );
}
