import React from 'react';
import { Pagination } from 'react-bootstrap';

const PaginationM = ({ currentPage,itemsPerPage, totalItems, paginate }) => {
    let active = currentPage;
    let items = [];

    for (let number = 1; number <= totalItems / itemsPerPage; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active} onClick={() => paginate(number)} >
                {number}
            </Pagination.Item>,
        );
    }

    return (
        <Pagination size="sm">{items}</Pagination>
    );
};

export default PaginationM;
