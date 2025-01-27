import React, { useEffect, useState } from 'react'
import axios from 'axios';
import avatar from "../../assets/avatar.svg"
import { useSelector } from 'react-redux';
import { searchUser } from '../../utils/fetchingData/fetchEntitiesData';

const GroupChatCreator = ({ closeCreateChatBox }) => {

    const [searchText, setSearchText] = useState('');
    const [fetchedProfiles, setfetchedProfiles] = useState('');
    const token = useSelector((state) => state.auth.user.token);
    const [groupList, setGroupList] = useState([]);
    const [groupDetails, setGroupDetails] = useState({
        name: "",
        desc: "",
        otherMembers: []
    });
    const [loading, setLoading] = useState(null);

    // fetch the searched profiles by string
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

    // add the members in group
    const createGroupList = (profile) => {

        if (!groupList.some((existingProfile) => existingProfile.id === profile.id)) {
            setGroupList([...groupList, profile]);
        }

        // console.log(groupList);
    }

    // remove the members from group
    const removeFromGroup = (profile) => {
        const updatedGroupList = groupList.filter((existingProfile) => existingProfile.id !== profile.id);
        setGroupList(updatedGroupList);
    };

    // to take input value 
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setGroupDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));
    }

    // create the group
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        console.log("creating group...")

        const otherMembersList = groupList.map(({ id}) => ({ id}));

        const groupData = {
            name: groupDetails.name.trim(),
            desc: groupDetails.desc.trim(),
            otherMembers: otherMembersList
        };

        console.log(groupData);

        if (groupData.name === "" || groupData.desc === "" || groupData.otherMembers.length < 2) {
            return console.log("something is missing")
        }

        try {
            const response = await axios.post('http://localhost:3000/groups/create/chatroom', groupData, {
                headers: {
                    Authorization: token,
                },
            })
            console.log(response)
            if (response.data.status === "success") {
                closeCreateChatBox();
            }
        } catch (error) {
            throw (error)
        }

    }


    return (
        <>
            <div className='create-chat-modal user-create-chat visible'>
                <div className='create-chat-modal-wrapper'></div>
                <div className='group'>

                    <div className="group-container">

                        <div className="heading">Create a Group</div>
                        <div className="group-fillup">
                            <div className="group-avatar">
                                {/* <img src={avatar} alt="" /> */}
                            </div>

                            <form onSubmit={handleFormSubmit}>
                                <div className="group-detail">
                                    <div className="group-name">
                                        <input
                                            type="text"
                                            name="name"
                                            value={groupDetails.name}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Enter your group name"
                                        />
                                    </div>
                                    <div className="group-desc">
                                        <input
                                            type="text"
                                            name="desc"
                                            value={groupDetails.desc}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Description..."
                                        />
                                    </div>
                                </div>
                                {(groupList.length > 1) ? <button className='create-group-button' type="submit">Create</button> :
                                    <></>
                                }
                            </form>
                        </div>

                        <div className='create-chat-model-close' onClick={closeCreateChatBox}>x</div>

                        <div className="selected-profile-container">
                            {groupList.map((selectedProfile, index) => (
                                <div key={index} className="selected-profiles" onClick={() => { removeFromGroup(selectedProfile) }}>
                                    <div className="profile-img">
                                        {/* Display the profile image if available */}
                                        {/* <img src={selectedProfile.avatar} alt="" /> */}
                                    </div>
                                    <div className="profile-msg-detail">
                                        <div className="profile-heading">
                                            <div className="profile-name">{selectedProfile.name}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="search-container">
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
                                    fetchedProfiles
                                        .filter((profile) => !groupList.some((existingProfile) => existingProfile.id === profile.id))
                                        .map((profile, ind) => (
                                            <div key={ind} className='profiles' onClick={() => { createGroupList(profile) }}>
                                                <div className="profile-img">
                                                    {/* Your profile image component or content goes here */}
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
                </div>
            </div>
        </>
    )
}

export default GroupChatCreator