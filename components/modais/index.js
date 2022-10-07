import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalVeiculos({
    botaoAbrirModal,
    titulo,
    conteudo
}) {
  const [show, setShow] = useState(false);

  function fecharModal() {
    setTimeout(() => {
      setShow(false)
  }, 800);
  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="botaoModal" variant="primary" onClick={handleShow}>
        {botaoAbrirModal}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body onSubmit={fecharModal}>
            {conteudo}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalVeiculos