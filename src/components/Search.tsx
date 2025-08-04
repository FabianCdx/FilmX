import type { SearchProps } from '../types'


const Search = ({searchTerm, setSearchTerm} : SearchProps) => {
  return (
    <div className="search">
        <div>
            <img src="./search.svg" alt="search"/>
            <input 
            type='text' 
            placeholder='Welcher Film wird es heute sein?' 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
    </div>
  )
}

export default Search