import React from 'react';

export type Props = {
    posts: []
  }
  
  export const HomePage: React.FC<Props> = (props) => {
    const { posts } = props
  return (
    <div style={{ padding: '20px', background: '#f8f9fa', textAlign: 'center', borderBottom: '2px solid #ddd' }}>
      <img src="/logo.png" alt="Comfort Hotel" style={{ height: '60px' }} />
      <h1 style={{ color: '#002f6c', fontSize: '24px', margin: '10px 0' }}>
        Olá, <strong>Seja bem-vindo</strong>
      </h1>
      <p style={{ color: '#555', fontSize: '16px' }}>
        Utilize o nosso totem interativo para conhecer os serviços do Comfort Mogi Guaçu e da nossa cidade.
      </p>
    </div>
  );
};

export default HomePage;
