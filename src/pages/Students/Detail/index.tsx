import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import './index.css';
import api from '../../../services/api';
import moment from 'moment';

interface IStudent{
  id: number;
  nome: string;
  ra: string;
  dataNasc: Date;
  idade: number;
  endereco: string;
  matricula: boolean;
}

const Detail: React.FC = () => {

  const history = useHistory()
  const { id } = useParams<{ id: string }>()
  const [student, setStudent] = useState<IStudent>()

  function back() {
    history.goBack()
  }

  async function findStudent() {
    const response = await api.get(`/student/${id}`)
    console.log(response)
    setStudent(response.data)
  }

  useEffect(() => {
    findStudent()
  }, [id])

  return (
    <div className="container">
      <br />
      <div className="student-header">
        <h1>Detalhes do Aluno</h1>
        <Button variant="dark" size="sm" onClick={back}>Voltar</Button>
      </div>
      <br />

      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{student?.nome}</Card.Title>

          <Card.Text>
            {student?.endereco}
            <br />
            {student?.matricula ? "Finalizada" : "Pendente"}
            <br />
            <strong>Data de Nascimento: </strong>
            {moment(student?.dataNasc).format('DD/MM/YYY')}
            <br />
            <strong>Idade: </strong>
            {student?.idade}
            <br />
            <strong>Ra: </strong>
            {student?.ra}
          </Card.Text>
        </Card.Body>
      </Card>

    </div>
  )
}

export default Detail;