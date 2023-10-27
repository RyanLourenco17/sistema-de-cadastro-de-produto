import "./App.css"

import {useState} from 'react';
import { useFetch } from "./hooks/useFetch";

const url = "http://localhost:3000/products";

function App() {
  

  const {data: items, httpConfig, loading, error} = useFetch(url);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  // Adicionando novos produtos
  const handleSubmit = async(e) => {
    e.preventDefault()

    const product = {
      name,
      price,
      category
    };

    httpConfig(product, "POST");

    setName("");
    setPrice("");
    setCategory("");
  }

  // Função para remover
  const handleRemove = (id) => {
    httpConfig(id, "DELETE");
  };

  return (
    <div className="center">
      <div className="App">
        <div className="addProduct">
          <h1>Cadastrar produto</h1>
          <form onSubmit={handleSubmit}>
            <label> 
              <input placeholder="Nome do produto:" type="text" value={name}  required name="name" onChange={(e) => setName(e.target.value)}/>
            </label>
            <label>
              <input placeholder="Preço do produto: " type="number" value={price}  required name="price" onChange={(e) => setPrice(e.target.value)}/>
            </label>
            <label>
              
              <input placeholder="Adicione a categoria do produto"  type="text" value={category}  required name="category" onChange={(e) => setCategory(e.target.value)}/>
            </label>
            {loading && 
              <div className="btnSubmit">
                <input type="submit" disabled value="Aguarde..."/>
              </div>
            }
            {!loading && 
              <div className="btnSubmit">
                <input type="submit" value="Cadastrar"/>
              </div>
            }
          </form>
        </div>
        
        <div className="listProduct">
          <h1>Veja os produtos já cadastrados</h1>
          {loading && <div className="containerLoading"><div className="loading"></div></div>}
          {!loading && (
            <table className="productTable">
              <div className="table-container">
                <thead>
                  <tr>
                    <th>Produto</th>
                    <th>Preço</th>
                    <th>Categoria</th>
                    <th>Código</th>
                    <th>Apagar</th>
                  </tr>
                </thead>
                <tbody>
                  {items && items.map((product) => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>R$:{product.price}</td>
                      <td>{product.category}</td>
                      <td>{product.id}</td>
                      <td>
                        <button onClick={() => handleRemove(product.id)}>
                          <i class="bi bi-trash">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                            </svg>
                          </i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </div>
            </table>
          )}
          {error && <p>{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
