import styles from '../styles/404.module.css'

const texto = (
  <div>
    Hmm !?
    <br />
    Parece que você está perdido
  </div>
)

export default function Custom404() {
  return (
    <div className={styles.error404_1}>
      <div className={styles.content}>
        <div>
          <h1 className={styles.h1}>404</h1>
          <h3 className={styles.h3}>{texto}</h3>
        </div>
      </div>
    </div>
  )
}
