import React from 'react'
import { ChannelList, useChatContext } from 'stream-chat-react'
import Cookies from 'universal-cookie'

import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './'
import HospitalIcon from '../assets/hospital.png'
import LogoutIcon from '../assets/logout.png'
const SideBar = ({ logout }) => (
    <div className="channel-list__sidebar">
        <div className="channel-list__sidebar__icon1">
            <div className="icon1__inner">
            <img src={HospitalIcon} alt="Hospital" width="30" />
            </div>
        </div>
        <div className="channel-list__sidebar__icon2">
            <div className="icon1__inner" onClick={logout}>
            <img src={LogoutIcon} alt="Logout" width="30" />
            </div>
        </div>
    </div>
)

const CompanyHeader = () => (
    <div className="channel-list__header">
        <p className="channel-list__header__text">
            Medical Pager           
        </p>
    </div>
)
const cookies = new Cookies()

const ChannelListContainer = ({ isCreating, setIsCreating, setCreateType, setIsEditing }) => {
    const logout = () => { 
        cookies.remove('token');
        cookies.remove('userId');
        cookies.remove('username');
        cookies.remove('fullName');
        cookies.remove('avatarURL');
        cookies.remove('hashedPassword');
        cookies.remove('phoneNumber');

        window.location.reload();
    }
  return (
  <>
    <SideBar logout={logout}/>  
    <div className="channel-list__list__wrapper">'
       <CompanyHeader />
       <ChannelSearch />
       <ChannelList 
            filters={{}} // allows us to filter messages
            channelRenderFilterFn={() =>{}} 
            List={(listProps) => ( // allows us to render a custom list
                <TeamChannelList 
                    {...listProps}
                    type="team"
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType} 
                    setIsEditing={setIsEditing}
                />
            )}
            Preview={(previewProps) => (
                <TeamChannelPreview
                    {...previewProps}
                    type="team"
                
                />
            )}
       />
       <ChannelList 
            filters={{}} // allows us to filter messages
            channelRenderFilterFn={() =>{}} 
            List={(listProps) => ( // allows us to render a custom list
                <TeamChannelList 
                    {...listProps}
                    type="messaging"
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType} 
                    setIsEditing={setIsEditing}
                />
            )}
            Preview={(previewProps) => (
                <TeamChannelPreview
                    {...previewProps}
                    type="messaging"
                />
            )}
       />
    </div>
  </>
  )
}

export default ChannelListContainer;
