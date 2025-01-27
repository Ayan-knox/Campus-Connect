import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import avatar from "../../assets/avatar.svg"
import { fetchProfiles, searchGroup } from '../../utils/fetchingData/fetchEntitiesData'

const EntitiesContainer = ({ profiles, onProfileClick }) => {

    const [activeProfiles, setActiveProfiles] = useState(Array(profiles.length).fill(false));
    const containerRef = useRef(null);

    const handleProfileClick = ({ profile, index }) => {
        setActiveProfiles((prevActiveProfiles) => (
            prevActiveProfiles.map((value, i) => (i === index ? (value ? value : !value) : false))
        ));

        if (!activeProfiles[index]) {
            onProfileClick(profile);
        }
    };



    // ssssssssssssssssssssssssssssssssssssssssssssssssss

    // const [loading, setLoading] = useState(false);
    // const [fetchedProfiles, setfetchedProfiles] = useState(null);
    // const token = useSelector((state) => state.auth.user.token);


    // let lastProfile = profiles[profiles.length - 1]

    // let hasRecentMessage = lastProfile.recentMessage

    // let timestamp = hasRecentMessage ? new Date(lastProfile.recentMessage.timestamp) : new Date(lastProfile.created_at);

    // console.log(lastProfile);
    // console.log(timestamp);

    // useEffect(() => {
    //     const handleScroll = () => {
    //         const container = containerRef.current;
    //         if (container.scrollTop + container.clientHeight === container.scrollHeight) {
    //             fetchProfiles("chatrooms", token, timestamp, setfetchedProfiles, setLoading);
    //         }
    //     };

    //     const container = containerRef.current;
    //     container.addEventListener('scroll', handleScroll);

    //     return () => {
    //         container.removeEventListener('scroll', handleScroll);
    //     };
    // }, []);



    // sssssssssssssssssssssssssssssssssssssssssssssssssss



    return (
        <div className="msg-profiles" ref={containerRef}>
            {profiles.map((profile, index) => {

                if (profile.recentMessage === undefined) {
                    return (
                        <div
                            key={index}
                            onClick={() => handleProfileClick({ profile, index })}
                            className={`profile ${activeProfiles[index] ? 'active' : ''}`}
                        >
                            <div className="profile-img">
                                <img src={avatar} alt="" />
                            </div>
                            <div className="profile-msg-detail">
                                <div className="profile-heading">
                                    <div className="profile-name">{profile.name}</div>
                                    {/* <div className="last-msg-time">{timestamp}</div> */}
                                </div>
                                <div className="profile-msg">
                                    <div className="profile-recent-msg">Lets start a Chat</div>
                                    {/* {(Math.floor(profile.dob.age / 30)) !== 0 ?
                                        <div className="unseen-msg-count">{Math.floor(profile.dob.age / 30)}+</div> : ""} */}
                                </div>
                            </div>
                        </div>
                    );
                }
                else {

                    let name = `${profile.recentMessage.sender.name} ${profile.recentMessage.content}`

                    let profileName = profile.name;
                    let dateObj = new Date(profile.recentMessage.timestamp);
                    let timestamp = `${dateObj.getHours() < 10 ? '0' : ''}${dateObj.getHours()}:${dateObj.getMinutes() < 10 ? '0' : ''}${dateObj.getMinutes()}`;
                    let lastMsg = profile.recentMessage.content;
                    // console.log(name)
                    return (
                        <div
                            key={index}
                            onClick={() => handleProfileClick({ profile, index })}
                            className={`profile ${activeProfiles[index] ? 'active' : ''}`}
                        >
                            <div className="profile-img">
                                <img src={avatar} alt="" />
                            </div>
                            <div className="profile-msg-detail">
                                <div className="profile-heading">
                                    <div className="profile-name">{profileName}</div>
                                    <div className="last-msg-time">{timestamp}</div>
                                </div>
                                <div className="profile-msg">
                                    <div className="profile-recent-msg">{lastMsg}</div>
                                    {/* {(Math.floor(profile.dob.age / 30)) !== 0 ?
                                    <div className="unseen-msg-count">{Math.floor(profile.dob.age / 30)}+</div> : ""} */}
                                </div>
                            </div>
                        </div>
                    );
                }
            })}
        </div>
    )
}

export default EntitiesContainer
