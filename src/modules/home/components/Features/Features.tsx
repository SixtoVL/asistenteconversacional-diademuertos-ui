import styles from './Features.module.css';

const FEATURES = [
  {
    number: '01',
    title: 'Historia y tradiciones',
    text: 'Explora el origen y la evolución del Día de Muertos en México, sus símbolos y sus costumbres.',
  },
  {
    number: '02',
    title: 'Significado de las ofrendas',
    text: 'Descubre qué representa cada elemento: flores, veladoras, pan, fotografías y más.',
  },
  {
    number: '03',
    title: 'Recomendaciones personalizadas',
    text: 'Responde unas preguntas y recibe una guía para preparar tu ofrenda según tus necesidades.',
  },
  {
    number: '04',
    title: 'Conocimiento confiable',
    text: 'Respuestas respaldadas por fuentes culturales, sin presentar decisiones del sistema como hechos.',
  },
];

export function Features() {
  return (
    <section id="caracteristicas" className={styles.section} aria-labelledby="features-title">
      <div className={styles.sectionInner}>
        <h2 id="features-title" className={styles.sectionTitle}>
          ¿Qué puede hacer por ti?
        </h2>
        <p className={styles.sectionSubtitle}>
          Un asistente especializado en una de las tradiciones más queridas de México.
        </p>
        <div className={styles.grid}>
          {FEATURES.map((feature) => (
            <article key={feature.number} className={styles.card}>
              <span className={styles.cardNumber} aria-hidden="true">
                {feature.number}
              </span>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardText}>{feature.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
