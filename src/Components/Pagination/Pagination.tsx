import React, { useCallback, useMemo } from 'react';
import ReactPaginate from 'react-paginate';
import { RaMInfo } from '../../Types/RaMCharacters';
import { pageSize } from '../../Hooks/useCharacters';

interface PaginationProps {
    setPageNumber: React.Dispatch<React.SetStateAction<number>>;
    pageNumber: number;
    info: RaMInfo;
}

export const Pagination = ({
    setPageNumber,
    pageNumber,
    info,
}: PaginationProps) => {
    const maxPageNumber = useMemo(
        () => Math.ceil(info?.count / pageSize),
        [info]
    );

    console.log(maxPageNumber);

    const handleClick = useCallback(
        (selected: number) => {
            console.log(selected);

            setPageNumber(selected);
        },
        [setPageNumber]
    );

    if (pageNumber == null || info === undefined) {
        return <span>Error</span>;
    }

    return (
        <>
            <ReactPaginate
                renderOnZeroPageCount={undefined}
                breakLabel="..."
                nextLabel=">"
                onPageChange={(e) => handleClick(e.selected)}
                pageCount={maxPageNumber}
                previousLabel="<"
                initialPage={pageNumber}
                pageClassName="pagination"
                containerClassName="paginationContainer"
                activeClassName="paginationActive"
                previousClassName="pagination"
                nextClassName="pagination"
                breakClassName="breakPagination"
                pageLinkClassName="pageLink"
                previousLinkClassName="pageLink"
                nextLinkClassName="pageLink"
            />
        </>
    );
};
