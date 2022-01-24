import { React, useState, useEffect } from 'react'
import { useChatContext } from 'stream-chat-react'
import { ResultsDropdown } from './'
import { SearchIcon } from '../assets'



const ChannelSearch = ({setToggleContainer}) => {
    const { client, setActiveChannel } = useChatContext()
    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState(false)
    const [teamChannels, setTeamChannels] = useState([]);
    const [directChannels, setDirectChannels] = useState([]);

    useEffect(()=>{
        if(!query){
            setDirectChannels([])
            setTeamChannels([])
        }
    }, [query])


    const getChannels = async (text) => {
        try {
            const channelResponse = client.queryChannels({ 
                type: 'team',
                name: {$autocomplete: text},
                members: { $in: [client.userID]}
            })
            const userResponse = client.queryUsers({
                id: {$ne: client.userID},
                name: {$autocomplete: text}
            })

            const [channels, { users }] = await Promise.all([channelResponse, userResponse])
            if(channels.length) setTeamChannels(channels)
            if(users.length) setDirectChannels(users)


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

    const setChannel = (channel) => {
        setQuery('') 
        setActiveChannel(channel)
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
       { query && (
           <ResultsDropdown 
                teamChannels={teamChannels}
                directChannels={directChannels}
                loading={loading}
                setChannel={setChannel}
                setQuery={setQuery}
                setToggleContainer={setToggleContainer}
           />
       ) }
  </div>
  )
}

;

export default ChannelSearch;
