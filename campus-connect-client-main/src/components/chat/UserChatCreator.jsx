import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { searchUser } from '../../utils/fetchingData/fetchEntitiesData';

const UserChatCreator = ({ closeCreateChatBox, onProfileClick }) => {

    const [searchText, setSearchText] = useState('');
    const [fetchedProfiles, setfetchedProfiles] = useState('');
    const token = useSelector((state) => state.auth.user.token);
    const [loading, setLoading] = useState(null);

    console.log("this is to be set", fetchedProfiles)
    // fetching the searched profiles by string
    useEffect(() => {

        if (searchText.trim() !== '') {
            const searchingProfiles = async () => {
                searchUser(token, searchText, setfetchedProfiles, setLoading);
            };

            const getData = setTimeout(searchingProfiles, 500);
            return () => clearTimeout(getData);
        }
        else {
            setfetchedProfiles("");
        }
    }, [searchText]);

    return (
        <>
            <div className='create-chat-modal user-create-chat visible'>
                <div className='create-chat-modal-wrapper'></div>
                <div className='user'>
                    <div className="user-container">
                        <div className='create-chat-model-close' onClick={closeCreateChatBox}>x</div>
                        <div className="heading">Search for User</div>
                        <div className="profile-search-container">
                            <span className="material-symbols-outlined">search</span>
                            <input
                                type="text"
                                className="search"
                                placeholder='Find a chat...'
                                onChange={(event) => setSearchText(event.target.value)}
                            />

                            <div className="searched-profile">
                                {loading ? (
                                    <div>Loading...</div>
                                ) : fetchedProfiles === '' ? (
                                    <div className="search-title">Search for the user</div>
                                ) : fetchedProfiles.length === 0 ? (
                                    <div className="search-title">No user found</div>
                                ) : (
                                    fetchedProfiles.map((profile, ind, arr) => (
                                        <div key={ind} className='profiles' onClick={() => { onProfileClick(profile); closeCreateChatBox() }}>
                                            <div className="profile-img">
                                                {/* <img src={profile.avatar} alt="" /> */}
                                            </div>
                                            <div className="profile-msg-detail">
                                                <div className="profile-heading">
                                                    <div className="profile-name">{profile.name}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>



                        </div>
                    </div>
                    {/* <button onClick={createChat}>close</button> */}
                </div>
            </div>
        </>
    )
}

export default UserChatCreator