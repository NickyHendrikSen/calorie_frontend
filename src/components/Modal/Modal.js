import React, { useEffect, useRef } from "react";
import styled from "styled-components"

const ModalStyles = styled.div`
height: 100vh;
width: 100%;
opacity: 1;
background-color: rgba(0,0,0,0.4);
position: fixed;
top: 0;
left: 0;
overflow: hidden;
z-index: 10;
display: flex;
justify-content: center;
align-items: center;
`

const Modal = ({ show, setShowModal, children }) => {
  const modalRef = useRef();

  useEffect(() => {
    const clickOutside = (e) => {
      if(e.target === modalRef.current){
        setShowModal(false);
      }
    }
    window.addEventListener('click', clickOutside);
    return () => {
      window.removeEventListener('click', clickOutside);
    }
  }, [show, setShowModal, children])

  if(!show) {
    return "";
  }

  return (
    <ModalStyles ref={modalRef}>
      {children}
    </ModalStyles>
  )
}

export default Modal;