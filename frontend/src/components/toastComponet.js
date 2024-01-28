import React,{useState} from 'react';
import {ToastContainer, Toast} from 'react-bootstrap';

const ToastComponent = (props) => {

    return (
         <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1 }}>
        <Toast show={props.isOpen} delay={3000} onClose={props.closeToast} autohide>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Message</strong>
          </Toast.Header>
          <Toast.Body>{props.message}</Toast.Body>
        </Toast>
        </ToastContainer>
    );
}

export default ToastComponent;