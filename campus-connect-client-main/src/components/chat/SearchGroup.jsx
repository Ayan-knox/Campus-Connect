import React from 'react'

const SearchGroup = ({ profile, ind }) => {

    let pass = profile.recentMessage;

    if (pass !== undefined) {
        let { timestamp, content, sender } = profile.recentMessage;

        let dateObj = new Date(timestamp);
        let time = `${dateObj.getHours() < 10 ? '0' : ''}${dateObj.getHours()}:${dateObj.getMinutes() < 10 ? '0' : ''}${dateObj.getMinutes()}`

        return (
            <div key={ind} className='groups' onClick={() => { closeCreateChatBox() }}>
                <div className="group-img">
                    {/* <img src={profile.avatar} alt="" /> */}
                </div>
                <div className="group-msg-detail">
                    <div className="group-heading">
                        <div className="group-name">{profile.name}</div>
                        <div className="last-msg-time">{time}</div>
                    </div>
                    <div className="group-msg">
                        {/* <div className="group-recent-msg-sender">{sender.name}</div> */}
                        <div className="group-recent-msg">{content}</div>
                    </div>
                </div>
            </div>
        )
    }
    else {

        let dateObj = new Date(profile.created_at);
        let time = `${dateObj.getHours() < 10 ? '0' : ''}${dateObj.getHours()}:${dateObj.getMinutes() < 10 ? '0' : ''}${dateObj.getMinutes()}`

        return (
            <div key={ind} className='groups' onClick={() => { closeCreateChatBox() }}>
                <div className="group-img">
                    {/* <img src={profile.avatar} alt="" /> */}
                </div>
                <div className="group-msg-detail">
                    <div className="group-heading">
                        <div className="group-name">{profile.name}</div>
                        <div className="last-msg-time">{time}</div>
                    </div>
                </div>
            </div>
        )
    }


}

export default SearchGroup