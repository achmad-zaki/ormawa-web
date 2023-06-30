import React from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import queryString from 'query-string';

export default function Pagination({prokerCount, currentPage, pageSize, onPageChange}) {

    const prevPage = currentPage - 1;
    const nextPage = currentPage + 1;



    const totalPages = Math.ceil(prokerCount/pageSize);


    if (totalPages == 1) return null;

    const pages = Array.from({length : totalPages}, (_, i) => i + 1);
    const prevLink = prevPage > 0 ? prevPage : null;
    const nextLink = nextPage <= totalPages ? nextPage : null;
return (
    <div className="flex justify-center mt-4 align-middle">
            {/* <a onClick={onPageChange(prevLink)} aria-current="page" className={`px-3 py-1 bg-gray-200 text-gray-700 rounded mr-2 hover:bg-gray-300`}>
            Previous
            </a> */}

        {
            pages.map(page => {
                return <div key={page}>
                            <a href="#" key={page} aria-current="page" className={`relative inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50  ${page == currentPage ? 'active focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus:text-white' : ''}`} onClick={() => onPageChange(page)}>
                                {page}  
                            </a>
                    </div>
            })
        }

                {/* <a onClick={onPageChange(nextLink)} className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                    Next
                </a> */}

    {/* <div className="flex flex-1 justify-between sm:hidden">
        <a href="#" className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Previous
        </a>
        <a href="#" className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Next
        </a>
    </div>
    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
            <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
            <span className="font-medium">97</span> results
            </p>
        </div>
    <div>
        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <a href="#" className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
                <a href="#" className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </a>
                </nav>
            </div> */}
        {/* </div> */}
    </div>
    )
}
