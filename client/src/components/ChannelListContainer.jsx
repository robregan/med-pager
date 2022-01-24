import {React, useState} from 'react'
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

const customChannelTeamFilter = channels => channels.filter(channel => channel.type === 'team');
const customChannelMessagingFilter = channels => channels.filter(channel => channel.type === 'messaging');

const cookies = new Cookies()

const ChannelListContent = ({ isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer }) => {

    const { client } = useChatContext()

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

    const filters = { members: { $in: [client.userID] } }

  return (
  <>
    <SideBar logout={logout}/>  
    <div className="channel-list__list__wrapper">'
       <CompanyHeader />
       <ChannelSearch />
       <ChannelList 
            filters={filters} 
            channelRenderFilterFn={customChannelTeamFilter} 
            List={(listProps) => ( // allows us to render a custom list
                <TeamChannelList 
                    {...listProps}
                    type="team"
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType} 
                    setIsEditing={setIsEditing}
                    setToggleContainer={setToggleContainer}
                />
            )}
            Preview={(previewProps) => (
                <TeamChannelPreview
                    {...previewProps}
                    setToggleContainer={setToggleContainer}
                    type="team"
                    setIsCreating={setIsCreating}
                    setIsEditing={setIsEditing}
                
                />
            )}
       />
       <ChannelList 
            filters={filters} 
            channelRenderFilterFn={customChannelMessagingFilter} 
            // allows us to render a custom list
            List={(listProps) => ( 
                <TeamChannelList 
                    {...listProps}
                    type="messaging"
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType} 
                    setIsEditing={setIsEditing}
                    setToggleContainer={setToggleContainer}
                />
            )}
            Preview={(previewProps) => (
                <TeamChannelPreview
                    {...previewProps}
                    setIsCreating={setIsCreating}
                    setIsEditing={setIsEditing}
                    setToggleContainer={setToggleContainer}
                    type="messaging"
                />
            )}
       />
    </div>
  </>
  )
}

const ChannelListContainer = ({ setCreateType, setIsCreating, setIsEditing }) =>{
    const [toggleContainer, setToggleContainer] = useState(false);

    return (
        <>
            {/* this one is for desktop */}
            <div className="channel-list__container"> 
                <ChannelListContent 
                 setIsCreating={setIsCreating}
                 setCreateType={setCreateType}
                 setIsEditing={setIsEditing}
                />

            </div>
            {/* this one is for mobile */}
            <div className="channel-list__container-responsive"
                 style={{ left: toggleContainer ? "0%" : "-89%", backgroundColor: "#005fff" }}
            >
                <div className="channel-list__container-toggle" onClick={() => setToggleContainer(prevToggleContainer => !prevToggleContainer)}>
                <ChannelListContent 
                 setIsCreating={setIsCreating}
                 setCreateType={setCreateType}
                 setIsEditing={setIsEditing}
                 setToggleContainer={setToggleContainer}
                />
                </div>
            </div>
        </>

    )


}

export default ChannelListContainer;
