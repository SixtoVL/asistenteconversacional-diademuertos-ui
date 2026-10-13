import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../components/ui/Button';
import closingImage from '../../../../assets/diademuertos_image3.jpg';
import styles from './ClosingCta.module.css';

export function ClosingCta() {
  const navigate = useNavigate();

  const handleStart = (): void => {
    void navigate('/chat');
  };

  return (
    <section id="comenzar" className={styles.section} aria-labelledby="cta-title">
      <div className={styles.sectionInner}>
        <div className={styles.banner}>
          <figure className={styles.figure}>
            <img
              src={closingImage}
              alt="Calaveras decoradas rodeadas de flores de cempasúchil"
              className={styles.image}
              loading="lazy"
            />
          </figure>
          <div className={styles.copy}>
            <h2 id="cta-title" className={styles.title}>
              ¿Listo para honrar a quienes amas?
            </h2>
            <p className={styles.text}>
              Empieza una conversación y deja que el asistente te guíe en la tradición del Día
              de Muertos.
            </p>
            <div className={styles.ctaRow}>
              <Button type="button" onClick={handleStart}>
                Comenzar a conversar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
