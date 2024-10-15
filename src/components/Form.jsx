import React, { useEffect, useState } from 'react';
import Input from './Input';
import { Button, Form } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const FormComp = () => {
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            handleEdit(id);
        }
    }, [id]);

    const [input, setInput] = useState({});
    const [data, setData] = useState([]);

    const type = [
        { name: 'first_name', type: 'text', label: 'First Name' },
        { name: 'email', type: 'email', label: 'Email' },
        { name: 'mobile', type: 'number', label: 'Mobile Number' },
    ];

    const handleInput = (e) => {
        let { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setData((data) => [
            ...data, input
        ]);

        addData(input);
    };

    const addData = async (data) => {
        try {
            if (id) {
                const response = await axios.put(`http://localhost:3000/data/${id}`, data);
            } else {
                const response = await axios.post('http://localhost:3000/data', data);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleEdit = async (id) => {
        const editData = await axios.get(`http://localhost:3000/data/${id}`);
        setInput(editData.data);
        console.log(editData.data);
    };

    console.log(input);

    return (
        <div className="p-5 border-2 border shadow-lg rounded-5 bg-light">
            <Form onSubmit={handleSubmit}>
                <div className="d-flex justify-content-between">
                    {type.map((val) => (
                        <Input key={val.name} name={val.name} type={val.type} label={val.label} onChange={handleInput} edit={input[val.name]} />
                    ))}
                </div>
                <div className="d-flex justify-content-evenly mt-3">
                    <Button type='submit' className='px-5'>{id ? 'Update' : 'Submit'}</Button>
                    <Link to='/table'><Button className='px-5'>Show Data</Button></Link>
                </div>
            </Form>
        </div>
    );
};

export default FormComp;
