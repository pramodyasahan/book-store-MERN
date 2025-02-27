import React, {useState, useEffect} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import BackButton from "../components/BackButton.jsx";
import Spinner from "../components/Spinner.jsx";

const ShowBook = () => {

    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(false);
    const {id} = useParams();

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:3000/api/books/${id}`).then((res) => {
            setBook(res.data);
            setLoading(false);
        }).catch((error) => {
            console.log(error);
            setLoading(false);
        })
    }, [])

    return (<div className='p-4'>
        <BackButton/>
        <div className='flex justify-center flex-col items-center'>
            <h1 className='text-3xl my-4 '>Show Book</h1>
            {loading ? (<Spinner/>) : (
                <div className='flex flex-col border-2 border-sky-700 rounded-xl w-fit p-4'>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500 font-bold'>Id:</span>
                        <span>{book._id}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500 font-bold'>Title:</span>
                        <span>{book.title}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500 font-bold'>Author:</span>
                        <span>{book.author}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500 font-bold'>Publish Year:</span>
                        <span>{book.publishYear}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500 font-bold'>Create Time:</span>
                        <span>{new Date(book.createdAt).toString()}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500 font-bold'>Last Update Time:</span>
                        <span>{new Date(book.updatedAt).toString()}</span>
                    </div>

                </div>)}
        </div>
    </div>);
}

export default ShowBook;