import React, { useState, ChangeEvent, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import api from '../../../services/api';
import { useHistory, useParams } from 'react-router-dom';
import './index.css';

interface IStudent{
  nome: string;
  ra: string;
  endereco: string;
  idade: number;
  dataNasc: Date;
}

const Students: React.FC = () => {

  const history = useHistory()
  const { id } = useParams<{ id: string }>()

  const [model, setModel] = useState<IStudent>({
    nome: '',
    ra: '',
    endereco: '',
    idade: 0,
    dataNasc: new Date()
  }) 

  useEffect(() => {
    console.log(id)
    if (id !== undefined) {
      findStudent(id)
    }
  }, [id])

  function updatedModel(e: ChangeEvent<HTMLInputElement>) {
    setModel({
      ...model,
      [e.target.name]: Number(e.target.value) ? Number(e.target.value) : e.target.value
    })
  }

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()

    if (id !== undefined) {
      const response = await api.put(`/student/${id}`, model)
    }
    else {
      const response = await api.post('/student', model)
    }
    back()
  }

  function back(){
    history.goBack()
  }

  async function findStudent(id: string) {
    const response = await api.get(`/student/${id}`)
    console.log(response)
    setModel({
      nome: response.data.nome,
      ra: response.data.ra,
      endereco: response.data.endereco,
      idade: response.data.idade,
      dataNasc: response.data.dataNasc
    })
  }

  return (
    <div className="container">
      <br />
      <div className="student-header">
        <h1>Novo Aluno</h1>
        <Button variant="dark" size="sm" onClick={back}>Voltar</Button>
      </div>
      <br />

      <div className="container">
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>Nome</Form.Label>
            <Form.Control 
              type="text"
              name="nome"
              value={model.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}/> 
          </Form.Group>

          <Form.Group>
            <Form.Label>Ra</Form.Label>
            <Form.Control 
              type="text"
              name="ra"
              value={model.ra}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}/> 
          </Form.Group>

          <Form.Group>
            <Form.Label>Data de Nascimento</Form.Label>
            <Form.Control 
              type="Date"
              name="dataNasc"
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}/> 
          </Form.Group>

          <Form.Group>
            <Form.Label>Idade</Form.Label>
            <Form.Control 
              type="number"
              name="idade"
              value={model.idade}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}/> 
          </Form.Group>

          <Form.Group>
            <Form.Label>Endereço</Form.Label>
            <Form.Control 
              type="text"
              name="endereco"
              value={model.endereco}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}/> 
          </Form.Group>

          <Button variant="dark" type="submit" className="salvar">Salvar</Button>
        </Form>  
      </div>
    </div>
  )
}

export default Students;