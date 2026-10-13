import ofrendaImage from '../../../../assets/diademuertos_image2.jpg';
import styles from './HowItWorks.module.css';

const STEPS = [
  {
    number: '1',
    title: 'Haz tu pregunta',
    text: 'Pregunta sobre historia, tradiciones, símbolos o cómo preparar una ofrenda.',
  },
  {
    number: '2',
    title: 'El sistema experto responde',
    text: 'Consulta hechos verificados y reglas explícitas. Si falta información, te hará preguntas guiadas.',
  },
  {
    number: '3',
    title: 'Recibe recomendaciones',
    text: 'Obtén una guía para tu ofrenda con la explicación de cada elemento y sus fuentes.',
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className={styles.section} aria-labelledby="how-title">
      <div className={styles.sectionInner}>
        <div className={styles.copy}>
          <h2 id="how-title" className={styles.sectionTitle}>
            Cómo funciona
          </h2>
          <ol className={styles.steps}>
            {STEPS.map((step) => (
              <li key={step.number} className={styles.step}>
                <span className={styles.stepBadge} aria-hidden="true">
                  {step.number}
                </span>
                <div className={styles.stepBody}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepText}>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className={styles.note}>
            Funciona sin IA generativa: las decisiones siempre las toma el sistema experto. En
            una segunda fase podrás activar un LLM (Gemini, OpenAI o Groq) para conversar en
            lenguaje natural, sin que el modelo pueda modificar las reglas.
          </p>
        </div>
        <figure className={styles.figure}>
          <img
            src={ofrendaImage}
            alt="Calavera decorada junto a veladoras encendidas en una ofrenda"
            className={styles.image}
            loading="lazy"
          />
        </figure>
      </div>
    </section>
  );
}
