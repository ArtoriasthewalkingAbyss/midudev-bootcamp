/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import './App.css'

function Pais({paises}) {
  const [capital, setCapital] = useState([])

  useEffect(() => {
    fetch(`http://api.weatherstack.com/current?access_key=${import.meta.env.VITE_API_KEY}&query=${paises.capital}`).then((response) => response.json()).then((json) => {setCapital(json) })
  }, [paises])

  return (
    <>
      <h2>{paises.name.common}</h2> 
      <p>capital {paises.capital}</p> 
      <p>poblacion {paises.population}</p>
      <h3>Lenguas</h3>
      { Object.entries(paises.languages).map(function ([clave, valor]) {
            return  <li key={clave}>{valor}</li>
        })
      }
      <img src={paises.flags.png} alt={paises.flags.alt} />
      <h3>Weather in {paises.capital}</h3>
      <h5>temperature: {capital.current.temperature} Celcius</h5>
      <img src={capital.current.weather_icons[0]} alt={capital.current.weather_icons[0]} />
      <h5>wind: {capital.current.wind_speed} mph direcction {capital.current.wind_dir}</h5>
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

  const searchCLick = (pais) => {
		const eleccion = pais.toLowerCase();
		setfilter(eleccion);
	};

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
                return (
                  <>
                    <h3 key={value.name.common}>{value.name.common}</h3>
                    <button key={value.translations.kor.common} onClick={() => searchCLick(value.name.common)}> show</button>
                  </>
                );
              }
            })
            : paises.length === 1
              ? <Pais paises={paises[0]}/>
              : <p>Ningún país encontrado</p>
        }  
      </section>
  )
}

export default App
