import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ProductList from './pages/products/list';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Container className='App py-3'>
      <main>
        <ProductList />
      </main>
    </Container>
  );
}

export default App;
