/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import './App.css'

function Pais({paises}) {

  return (
    <>
      <h2>{paises[0].name.common}</h2> 
      <p>capital {paises[0].capital}</p> 
      <p>poblacion {paises[0].population}</p>
      <h3>Lenguas</h3>
      { Object.entries(paises[0].languages).map(function ([clave, valor]) {
            return  <li key={clave}>{valor}</li>
        })
      }
      <img src={paises[0].flags.png} alt={paises[0].flags.alt} />
    </>
  )
}

function App() {
  const paises = [];
  const [count, setCount] = useState([]);
  const [filter, setfilter] = useState("");

	const searchChange = (event) => {
		const filtrar = event.target.value.toLowerCase();
		setfilter(filtrar);
	};

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all").then((response) => response.json()).then((json) => {setCount(json) })

  }, [])
  
  count.map((value) => {
    if (value.name.common.toLowerCase().includes(filter)) {
      paises.push(value);
    }
  })

  if (count.length === 0) {
    return <div className="chaotic-orbit"></div>
  }

  return (
      <section>
        <label htmlFor="filter-input">Encontrar paises </label>
				<input id="filter-input" type="text" onChange={searchChange} name="filter"/> 
        {paises.length > 10 
          ? <p>Hay demaciadas coincidencias, sea más espesifico</p> 
          : paises.length > 1 
            ? count.map((value) => {
              if (value.name.common.toLowerCase().includes(filter)) {
                return <h3 key={value.name.common}>{value.name.common}</h3>;
              }
            })
            : paises.length === 1
              ? <Pais paises={paises}/>
              : <p>Ningún país encontrado</p>
        }  
      </section>
  )
}

export default App
