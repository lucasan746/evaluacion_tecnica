import React, { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const Turnos = () => {
  const [turnos, setTurnos] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient(
      "http://localhost:4000"
    );

    socketRef.current.on(
      "response",
      ( result ) => {
        setTurnos(results => [result]);
      }
    );

    sendRequest({message: "request"});

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendRequest = ({ message }) => {
    socketRef.current.emit("newRequest", { message });
  };

  let listaTurnos = [];
  let todos = 0;
  let sinAtender = 0;
  let atendidas = 0;



  listaTurnos.push(turnos);

  if (listaTurnos[0][0]) {
      listaTurnos[0][0].forEach(function(turno) {
      todos++;
    if (turno.atendido === true) {
    	atendidas++;
    } else {
    	sinAtender++;
    }

    });
  }

  return (
    <div>
    <div class="card text-center my-3">
  <div class="card-header">
  </div>
  <div class="card-body">
    <h5 class="card-title">{todos}</h5>
    <p class="card-text">Total de turnos</p>
  </div>
  <div class="card-footer text-muted">
  </div>
</div>
<div class="card text-center my-3">
  <div class="card-header">
  </div>
  <div class="card-body">
    <h5 class="card-title">{atendidas}</h5>
    <p class="card-text">Turnos atendidos</p>
  </div>
  <div class="card-footer text-muted">
  </div>
</div>
<div class="card text-center my-3">
  <div class="card-header">
  </div>
  <div class="card-body">
    <h5 class="card-title">{sinAtender}</h5>
    <p class="card-text">Turnos sin atender</p>
  </div>
  <div class="card-footer text-muted">
  </div>
</div>
</div>)
};

export default Turnos;