import React from "react";
import "./././index.css";

const Home: React.FC = () => {
  return (
    <div>
      <br />
      <h1 className="titulo">Página Inicial</h1>
      <br />
      <p className="descricao">
        Projeto de <strong>ReactJS</strong> com base nos dados feitos no <strong>NodeJS</strong>
      </p>
      <br />
      
      <div className="botoes">
        <img src="react.gif" alt="react" className="react"/>
        <img src="node.gif" alt="node" className="node"/>
      </div>
      
    </div>
  );
};

export default Home;
