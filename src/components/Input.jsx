import React from 'react';
import { Form } from 'react-bootstrap';

const Input = ({ type, name, label, value, edit, onChange }) => {
    return (
        <Form.Group controlId={`form${name}${value}`} className='mb-3'>
            <Form.Label className='mx-0'>{label}</Form.Label>
            <Form.Control type={type} name={name} className='text-center' onChange={onChange} value={edit || ''} />
        </Form.Group>
    );
};

export default Input;
