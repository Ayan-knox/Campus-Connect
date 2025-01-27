import React, { useEffect, useState } from 'react'
import '../style/chat.scss'
import SideNavbar from '../components/navbar/SideNavbar'
import EntitiesContainer from '../components/chat/EntitiesContainer'
import MsgContainer from '../components/chat/MsgContainer'
import EntitiesLoader from '../components/loaders/EntitiesLoader'
import { useSelector } from 'react-redux'
import UserChatCreator from '../components/chat/UserChatCreator'
import GroupChatCreator from '../components/chat/GroupChatCreator'
import { fetchProfiles, searchGroup } from '../utils/fetchingData/fetchEntitiesData'
import SearchGroup from '../components/chat/SearchGroup'

const Chat = () => {

    const [loading, setLoading] = useState(false);
    const [fetchedProfiles, setfetchedProfiles] = useState(null);
    const [selectedEntites, setselectedEntites] = useState(null);
    const token = useSelector((state) => state.auth.user.token)
    const [activeEntities, setactiveEntities] = useState("Users");
    const [searchText, setSearchText] = useState('');
    const [searchedGroups, setSearchedGroups] = useState('');


    // Creating chat container 
    const [isCreateChatVisible, setIsCreateChatVisible] = useState(false);

    const closeCreateChatBox = () => {
        setIsCreateChatVisible(!isCreateChatVisible);
    };

    // set the Entities type
    const handleTypeClick = (type) => {
        setactiveEntities(type);
    };

    const handleProfileClick = (profileIdentifier) => {
        console.log(profileIdentifier);
        setselectedEntites(profileIdentifier);
    }

    useEffect(() => {

        let time = new Date().toString();

        switch (activeEntities) {
            case 'Groups':
                fetchProfiles('chatrooms', token, time, setfetchedProfiles, setLoading);
                break;

            case 'Users':
                fetchProfiles('users', token, time, setfetchedProfiles, setLoading);
                break;

            default:
                break;
        }
    }, [activeEntities]);

    // this fetching is for group search
    useEffect(() => {
        if (searchText.trim() !== '') {

            const searchingGroups = async () => {
                searchGroup(token, searchText, setSearchedGroups, setLoading)
            };

            const getData = setTimeout(searchingGroups, 500);

            return () => clearTimeout(getData);
        }
        else {
            setSearchedGroups("");
        }
    }, [searchText]);

    return (
        <div className="chat-container">
            <SideNavbar />
            <div className="chat-box-container">

                {/* Profiles container */}
                <div className="profiles-container">

                    <div className="profiles-container-header">
                        <h2 className="heading">Messages</h2>
                        <div className="create-msgs-icon" onClick={() => setIsCreateChatVisible(!isCreateChatVisible)}>
                            <span className="material-symbols-outlined">
                                add
                            </span>
                        </div>
                    </div>




                    {/* Creating chat container using the adding functionality*/}
                    {isCreateChatVisible && (
                        <>
                            {activeEntities === "Users" && (
                                <UserChatCreator closeCreateChatBox={closeCreateChatBox} onProfileClick={handleProfileClick} />
                            )}
                            {activeEntities === "Groups" && (
                                <GroupChatCreator closeCreateChatBox={closeCreateChatBox} onProfileClick={handleProfileClick} />
                            )}
                            {activeEntities === "Clubs" && (
                                (<div>Clubs Create Chat</div>)
                            )}
                        </>
                    )}


                    <div className="message-type-toggle">
                        <div
                            className={`message-type ${activeEntities === 'Users' ? 'active' : ''}`}
                            onClick={() => handleTypeClick('Users')}
                        >
                            <span className="material-symbols-outlined">person</span>
                            <span>Users</span>
                        </div>

                        <div
                            className={`message-type ${activeEntities === 'Groups' ? 'active' : ''}`}
                            onClick={() => handleTypeClick('Groups')}
                        >
                            <span className="material-symbols-outlined">group</span>
                            <span>Groups</span>
                        </div>

                        <div
                            className={`message-type ${activeEntities === 'Clubs' ? 'active' : ''}`}
                            onClick={() => handleTypeClick('Clubs')}
                        >
                            <span className="material-symbols-outlined">join_inner</span>
                            <span>Clubs</span>
                        </div>
                    </div>


                    {activeEntities === "Groups" ?
                        <div className="group-search-container">
                            <span className="material-symbols-outlined">search</span>
                            <input
                                type="text"
                                className="search"
                                placeholder='Find a chat...'
                                onChange={(event) => setSearchText(event.target.value.toString())}
                            />
                        </div> :
                        <></>
                    }

                    {!loading && searchedGroups !== "" && searchedGroups.length !== 0 && (
                        <div className="searched-group">
                            {searchedGroups.map((profile, ind, arr) => (
                                <SearchGroup profile={profile} ind={ind} />
                            ))}
                        </div>
                    )}

                    {!loading && searchedGroups !== "" && searchedGroups.length === 0 && (
                        <div className="searched-group">
                            <div className="empty-group">No Group Found</div>
                        </div>
                    )}

                    {loading ? (
                        <EntitiesLoader />
                    ) : (
                        (fetchedProfiles && (
                            <EntitiesContainer profiles={fetchedProfiles} onProfileClick={handleProfileClick} />
                        )) || <div>Connect to other.</div>
                    )}
                </div>
                {
                    (selectedEntites !== null) ?
                        <MsgContainer profile={selectedEntites} /> :
                        <div />
                }
            </div >
        </div >
    )
}

export default Chat