import axios from "axios";
import {updateMessages} from "./updatingMsg"

const fetchMsg = async (groupId, token, setMessageArray, setLoading) => {

    try {
        setLoading(false);
        let response = await axios.get(`http://localhost:3000/messages/view?groupId=${groupId}`, {
            headers: {
                Authorization: token,
                Timestamp: new Date().toString()
            }
        });

        console.log("fetching the user Message", response.data)
        response.data.status !== 'empty' ?
            setMessageArray((prevMessages) => updateMessages(prevMessages, response.data.messages))
            : console.log(response.status);

    } catch (error) {
        throw error;
    } finally {
        setLoading(true);
    }

}

export {fetchMsg};