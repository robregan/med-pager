import { React, useState, useEffect } from 'react'
import { useChatContext } from 'stream-chat-react'

import { SearchIcon } from '../assets'



const ChannelSearch = () => {

    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState(false)

    const getChannels = async (text) => {
        try {
            // todo: fetch channels
        } catch (error) {
            setQuery('') // resets search
        }
    }

    const onSearch = (event) =>{
        event.preventDefault() // bc this is react, we dont want to reload the page when we submit the search.

        setLoading(true)
        setQuery(event.target.value) // here we are grabbing the text from the search input
        getChannels(event.target.value)
    }

  return (
   <div className="channel-search__container">
       <div className="channel-search__input__wrapper">
            <div className="channel-search__input__icon">
                <SearchIcon />
            </div>
            <input 
                className="channel-search__input__text" 
                placeholder="search"
                type="text" 
                value={query} // the search query 
                onChange={onSearch} 
            />
       </div>
  </div>
  )
}

;

export default ChannelSearch;
