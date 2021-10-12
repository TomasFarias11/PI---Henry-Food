import React from 'react';

import Style from "./Paging.module.css";

export default function Paged ({recipesPerPage, recipes, paged}) {
    const pageNumber = [];

    for (let i = 1; i <= Math.ceil(recipes/recipesPerPage); i++) {
        pageNumber.push(i)
    }

    return (
        <nav>
            <ul className={Style.pages}>
                { pageNumber && pageNumber.map(number => {
                    return (
                        <li className="number" key = {number}>
                            <button className = {Style.paging} onClick = {() => paged(number)}>{number}</button>
                        </li>
                            ) 
                })}
            </ul>
        </nav>
    )
}