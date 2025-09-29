import React, { useEffect, useState } from 'react';
import { useLoaderData, NavLink, useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { FaEdit, FaHeart } from "react-icons/fa";
import axios from 'axios';
import '../styles/recipeitems.css';

const Recipeitems = () => {
    const recipe = useLoaderData();
    const navigate = useNavigate();

    const [allrecipe, setallrecipe] = useState([]);
    const [favitems, setFavitems] = useState(
        JSON.parse(localStorage.getItem("fav")) || []
    );

    let path = window.location.pathname === "/myrecipe";

    useEffect(() => {
        setallrecipe(recipe);
    }, [recipe]);

    // delete recipe
    const deleterecipe = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/${id}`);
            setallrecipe(allrecipe.filter((r) => r._id !== id));
            navigate("/myrecipe");
        } catch (err) {
            console.error(err);
        }
    };

    // toggle favorite
    const toggleFav = (item) => {
        let updatedFav;
        if (favitems.some((r) => r._id === item._id)) {
            // remove from favorites
            updatedFav = favitems.filter((r) => r._id !== item._id);
        } else {
            // add to favorites
            updatedFav = [...favitems, item];
        }
        setFavitems(updatedFav);
        localStorage.setItem("fav", JSON.stringify(updatedFav));
    };

    return (
        <div className='card'>
            {allrecipe?.map((items) => (
                <section className='recipeitems' key={items._id}>
                    <div className='image'>
                        <NavLink to={`/recipedetails/${items._id}`} className="link">
                            <img
                                src={`http://localhost:5000/image/${items.file}`}
                                width='200px'
                                height='150px'
                                alt={items.title}
                            />
                        </NavLink>
                    </div>
                    <div className='content'>
                        <p className='title'>{items.title}</p>
                        <div className='innercontent'>
                            <p className='timer'>⏱️ {items.time} mins</p>
                            {!path ? (
                                <p
                                    className='symbol'
                                    style={{
                                        color: favitems.find((r) => r._id === items._id)
                                            ? "red"
                                            : "",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => toggleFav(items)}
                                >
                                    <FaHeart />
                                </p>
                            ) : (
                                <div className='action'>
                                    <NavLink className='edit' to={`/edit/${items._id}`}>
                                        <FaEdit />
                                    </NavLink>
                                    <p className='delete' onClick={() => deleterecipe(items._id)}>
                                        <MdDelete />
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            ))}
        </div>
    );
};

export default Recipeitems;
