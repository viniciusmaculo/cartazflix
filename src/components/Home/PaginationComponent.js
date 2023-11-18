import React from "react";

const PaginationComponent = ({pages, setCurrentPage}) => {
    return (
        <div>
        {Array.from(Array(pages), (item, index) => {
            return <button value={index} onClick={(e) => setCurrentPage(Number(e.target.value))} className="paginationComponent">{index + 1}</button>
        })}
    </div>
    )
}

export default PaginationComponent