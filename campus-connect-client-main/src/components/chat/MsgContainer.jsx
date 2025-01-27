import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from "axios";
import avatar from "../../assets/avatar.svg"
import { fetchMsg } from '../../utils/fetchingData/fetchEntitiesMessages';


const MsgContainer = ({ profile }) => {

    const [isAnimated, setIsAnimated] = useState(false);
    const [messageArray, setMessageArray] = useState([])
    const profileDetailRef = useRef(null);
    const [content, setContent] = useState("");
    const [loadin, setLoading] = useState(false);

    const token = useSelector((state) => state.auth.user.token);
    const userId = useSelector((state) => state.auth.user.id);
    let allUserMessage = useSelector((state) => state.userMsg.allUserMessage)
    let { groupId } = profile;
    const [tempGroupId, setTempGroupId] = useState(null);



    const handleClickOutside = (event) => {
        const isMoreDetail = event.target.classList.contains("more-detail");
        const isOpenDetailHandler = event.target.classList.contains("open-detail-handler");

        if (
            profileDetailRef.current &&
            !profileDetailRef.current.contains(event.target) &&
            !isMoreDetail &&
            !isOpenDetailHandler
        ) {
            setIsAnimated(false);
        }
    };

    const onMoreDetailClick = () => {
        setIsAnimated((prevAnimated) => !prevAnimated);
    }

    const updateMessages = (prevMessages, newMessages) => {

        const uniqueMessages = newMessages.filter((newMessage) => {
            return !prevMessages.some(
                (prevMessage) =>
                    prevMessage.timestamp === newMessage.timestamp &&
                    prevMessage.sender.id === newMessage.sender.id
            );
        });

        const combinedMessages = [...prevMessages, ...uniqueMessages];

        const sortedMessages = combinedMessages.sort((a, b) => {
            const timestampA = new Date(a.timestamp).getTime();
            const timestampB = new Date(b.timestamp).getTime();
            return timestampA - timestampB;
        });

        return sortedMessages;
    };


    const fetchingMessage = async () => {

        if (groupId !== undefined) {
            fetchMsg(groupId, token, setMessageArray, setLoading)
        }

        // You can start the chat {you have to create temp state to display}
    }

    useEffect(() => {


        setIsAnimated(false);
        setMessageArray([])
        fetchingMessage();
        setTempGroupId(null);

        // Attach the event listener when the component mounts
        window.addEventListener('click', handleClickOutside);

        // Detach the event listener when the component unmounts
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };


    }, [profile]);



    const handleFormSubmit = async (e) => {
        e.preventDefault();
    
        try {
            let groupIdToSend = profile.groupId || tempGroupId;
    
            if (!groupIdToSend) {
                // Create a new group if profile doesn't have groupId
                const userDetail = {
                    otherMember: {
                        id: profile.id
                    }
                };
    
                const response = await axios.post('http://localhost:3000/groups/create/user', userDetail, {
                    headers: {
                        Authorization: token
                    }
                });
    
                if (response.data.status === "success") {
                    console.log("New group created");
                    groupIdToSend = response.data.groupId;
                    setTempGroupId(groupIdToSend);
                }
            }
    
            // Check if groupIdToSend is set (either from profile or newly created group)
            if (groupIdToSend) {
                // Send the message
                const messageData = {
                    groupId: groupIdToSend,
                    content: content
                };
    
                if (content.trim() === "") {
                    return;
                }
    
                const response = await axios.post(`http://localhost:3000/messages/send/`, messageData, {
                    headers: {
                        Authorization: token,
                        Timestamp: new Date().toString()
                    }
                });
    
                if (response.data.status === "success") {
                    const newMessage = [{
                        messageId: groupIdToSend,
                        sender: {
                            id: userId,
                            name: "tempName"
                        },
                        content: content,
                        timestamp: new Date().toString()
                    }];
    
                    setMessageArray((prevMessages) => updateMessages(prevMessages, newMessage));
                    setContent("");
                }
            } else {
                console.error("Error: groupIdToSend is not set");
            }
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <>
            <div className="msg-container">
                <div className="msg-container-heading">
                    <div className="sender-header">
                        <div className="sender-avatar">
                            <img src={avatar} alt="" />
                        </div>
                        <div className="sender-deatils">
                            <div className="sender-name">{profile.name}</div>
                            <div className="last-active-time">Last seen 22:24</div>
                        </div>
                    </div>
                    <div className="functionality">
                        <div className="more-detail" onClick={onMoreDetailClick}>
                            <span className="material-symbols-outlined open-detail-handler">
                                person
                            </span>
                        </div>
                    </div>
                </div>
                <div className="msg-box">
                    <div className='msg-box-wrapper'>

                        {messageArray.map((msgObj, ind) => {

                            let timestamp = new Date(msgObj.timestamp)

                            let hour = timestamp.getHours() < 10 ? `0${timestamp.getHours()}` : timestamp.getHours();
                            let min = timestamp.getMinutes() < 10 ? `0${timestamp.getMinutes()}` : timestamp.getMinutes();

                            if (msgObj.sender.id !== userId) {
                                return (
                                    <div key={ind} className="right-msg">
                                        <div className='sender-name'>{msgObj.sender.name}</div>
                                        <span>{msgObj.content}<span className='time'>12:23</span></span>
                                    </div>
                                )
                            }

                            return (
                                <div key={ind} className="left-msg">
                                    <span>{msgObj.content}<span className='time'>{`${hour} : ${min}`}</span></span>
                                </div>
                            )

                        })}

                    </div>
                </div>
                <form onSubmit={handleFormSubmit}>
                    <div className="sending-msg-box">
                        <span className="material-symbols-outlined attach-file">
                            attach_file
                        </span>
                        <input
                            type="text"
                            id="content"
                            name="content"
                            placeholder="Write a message..."
                            maxLength='1000'
                            value={content}
                            onChange={(event) => setContent(event.target.value)}
                            required
                        />
                        <button className="message-button" type="submit" >
                            <span className="material-symbols-outlined">
                                send
                            </span>
                        </button>
                    </div>
                </form>
            </div>

            <div ref={profileDetailRef} className={`profile-detail-container${isAnimated ? ' animate-in' : ' animate-out'}`} >
                <div className="cross" onClick={onMoreDetailClick}>x</div>
                <div className='profile-details'>
                    <div className="profile-img">
                        {/* <img src={profile.picture.large} alt="" /> */}
                    </div>
                    <div className="profile-name">
                        {profile.name}
                    </div>
                    <hr className='horizontal-line' />
                </div>
            </div>
        </>

    )
}

export default MsgContainer