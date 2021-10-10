import React from 'react';

import Style from "./Paging.module.css";

export default function Paged ({recipesPerPage, recipes, paged}) {
    const pageNumber = [];

    for (let i = 1; i <= Math.ceil(recipes/recipesPerPage); i++) {
        pageNumber.push(i)
    }
    console.log(pageNumber);
    return (
        <nav>
            <ul className="paged">
                { pageNumber && pageNumber.map(number => {
                    return (
                        <li className="number" key = {number}>
                            <button onClick = {() => paged(number)}>{number}</button>
                        </li>
                            ) 
                })}
            </ul>
        </nav>
    )
}