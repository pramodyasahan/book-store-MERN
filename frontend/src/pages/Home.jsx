import React, {useState, useEffect} from "react";
import axios from "axios";
import Spinner from "../components/Spinner.jsx";
import {Link} from "react-router-dom";
import {AiOutlineEdit} from "react-icons/ai";
import {BsInfoCircle} from "react-icons/bs";
import {MdOutlineAddBox, MdOutlineDelete} from "react-icons/md";
import BooksTable from "../components/home/BooksTable.jsx";
import BooksCard from "../components/home/BooksCard.jsx";

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showType, setShowType] = useState('table')

    useEffect(() => {
        console.log("Fetching books...");
        setLoading(true);
        axios.get('http://localhost:3000/api/books')
            .then((res) => {
                console.log("Books fetched:", res.data.data);
                setBooks(res.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching books:", error);
                setLoading(false);
            });
    }, []);

    return (<div className='p-4'>
        <div className='flex justify-center items-center gap-x-4'>
            <button className='bg-sky-300 hover:bg-sky-600 px-6 py-2 rounded-lg font-bold'
                    onClick={() => setShowType('table')}>Table
            </button>
            <button className='bg-sky-300 hover:bg-sky-600 px-6 py-2 rounded-lg font-bold'
                    onClick={() => setShowType('card')}>Card
            </button>
        </div>
        <div className='flex justify-between items-center'>
            <h1 className="text-3xl my-8 font-bold text-center">📘Books List</h1>
            <Link to='/books/new'>
                <MdOutlineAddBox className='text-sky-800 text-4xl mr-3'/>
            </Link>
        </div>
        {loading ? <Spinner/> : showType === 'table' ? (<BooksTable books={books}/>) : (<BooksCard books={books}/>)}
    </div>);
};

export default Home;
