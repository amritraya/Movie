import React from 'react'

export const Search = ({search, setSearch}) => {
  return (
    <>
    <div className='search'>
        <div>
            <input type="text" placeholder='search' value={search}
            onChange={(event) => setSearch(event.target.value)}/>

            <img src="./search.svg" alt="search" />
           
        </div>
    </div>
    </>
  )
}
