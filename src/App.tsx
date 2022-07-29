import { useState } from 'react';
import styles from './App.module.css';
import poweredImage from './assets/images/powered.png';
import leftArrow from './assets/images/leftarrow.png';
import { levels, calculateImc, level } from './helpers/imc';
import { GridItem } from './components/GridItem';

const App = () => {
  // Funções do App
  const [heightField, setHeightField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0);
  const [toShow, setToShow] = useState<level | null>(null);

  const handleCalculate = () => {
    if (heightField && weightField) {
      setToShow(calculateImc(heightField, weightField));
    } else {
      alert('Oops.. Preencha todos os campos );');
    }
  }

  const handleArrowBack = () => {
    setToShow(null);
    setHeightField(0);
    setWeightField(0);
  }

  // Estrutura visual do App
  return (
    <main className={styles.main}>
      <header>
        <div className={styles.contentHeader}>
          <img src={poweredImage} width={200} alt="Imagem Logo IMC" />
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC.</h1>
          <p>O IMC é um índice que mede se você está abaixo, dentro ou acima do peso, de acordo com a relação entre seu peso e altura.</p>

          <input
            type="number"
            placeholder="Digite a sua altura. Ex: 1.5 ( Em metros )"
            value={heightField > 0 ? heightField : ''}
            onChange={e => setHeightField(parseFloat(e.target.value))}
            disabled={ toShow ? true : false}
          />

          <input
            type="number"
            placeholder="Digite o seu pes. Ex: 74.5 ( Em Kg )"
            value={weightField > 0 ? weightField : ''}
            onChange={e => setWeightField(parseFloat(e.target.value))}
            disabled={ toShow ? true : false}
          />

          <button onClick={handleCalculate} disabled={ toShow ? true : false}>Calcular</button>

        </div>

        <div className={styles.rightSide}>
          {!toShow &&
            <div className={styles.grid}>
              {levels.map((item, key) => (
                <GridItem key={key} item={item} />
              ))}
            </div>
          }

          {toShow &&
            <div className={styles.bigCard}>
              <div className={styles.rightArrow} onClick={handleArrowBack}>
                <img src={leftArrow} alt="Imagem Seta" width={25} />
              </div>
              <GridItem item={toShow} />
            </div>
          }
        </div>
      </div>
    </main>
  )
}

export default App;