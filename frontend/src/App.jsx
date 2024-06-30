import React from "react";
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home.jsx';
import EditBook from './pages/EditBook.jsx';
import DeleteBook from './pages/DeleteBook.jsx';
import ShowBook from './pages/ShowBook.jsx';
import NewBook from './pages/NewBook.jsx';

const App = () => {
    return (<Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/api/books/new' element={<NewBook/>}/>
        <Route path='/api/books/details/:id' element={<ShowBook/>}/>
        <Route path='/api/books/edit/:id' element={<EditBook/>}/>
        <Route path='/api/books/delete/:id' element={<DeleteBook/>}/>
    </Routes>)
}

export default App