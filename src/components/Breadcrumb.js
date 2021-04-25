import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Breadcrumb({items}) {

    const listItems = items.map((item, i, items) => {
        return(
            (items.length - 1 === i 
                ?   <li key={i} className={'breadcrumb-item active'}>{item}</li>
                :   <li key={i} className={'breadcrumb-item'}>
                        <NavLink to={`/${items.slice(0, i + 1).join('/')}`}>
                            {item}
                        </NavLink>
                    </li>
        ))
    })

    return (
        <div className="container-fluid">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    {listItems}
                </ol>
            </nav>
        </div>
    )
}
