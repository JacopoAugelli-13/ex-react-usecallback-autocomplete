import { useState, useEffect, useMemo } from 'react'
import './App.css'

export const App = () => {
  const [query, setQuery] = useState([]);
  const [text, setText] = useState("");
  useEffect(() => {
    const handler = setTimeout(() => {
      fetch(`http://localhost:3333/products?search=${text}`)
      .then(res => res.json())
      .then(data => setQuery(data))
      .catch(err => console.error("dati non trovati", err));
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [text]);

  const arrFiltrato = useMemo(() => {
    return query.filter((qry) => {
      const prodottoRitornato = (qry.name.toLowerCase().includes(text.toLowerCase()));
      return prodottoRitornato;
    });
  }, [text, query]);


  return (
    <>
      <header>Nuovo E-COMMERCE</header>
      <main>
        <div className="campo-a-tendina">
          <input type="text" placeholder='Cerca oggetti' onChange={e => setText(e.target.value.toLowerCase())} value={text} />
          <div className="tendina"></div>
        </div>
        <ul>{arrFiltrato.map((item, i) => (
          text.length > 0 && <div className="container" key={item.id || i}>
            <li>{item.name} {item.brand}</li>
            <img src={item.image} alt="immagine" />
            <li>{item.description} {item.color}</li>
            <h2>{item.price}</h2>
          </div>
        ))}</ul>

      </main>
    </>
  )
}


