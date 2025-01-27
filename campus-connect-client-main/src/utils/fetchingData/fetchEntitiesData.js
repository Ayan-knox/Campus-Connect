import axios from 'axios';
import { sortingData } from './sortingFetchedData';

const fetchProfiles = async (type, token, time, setfetchedProfiles, setLoading) => {
    try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/groups/view/${type}`, {
            headers: {
                Authorization: token,
                Timestamp: time
            }
        });
        console.log(response.data);

        if(response.data.status === "success"){
            let sortData = sortingData(response.data.groups);
            setfetchedProfiles(sortData);
        } 
        else {
            setfetchedProfiles([])
        }

    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        setLoading(false);
    }
};

const searchUser = async (token, searchText, setfetchedProfiles, setLoading) => {
    try {
        setLoading(true);
        console.log(searchText)
        const response = await axios.get(`http://localhost:3000/users/search`, {
            headers: {
                Authorization: token,
                Timestamp: new Date()
            },
            params: {
                string: searchText
            }
        });
        console.log((response.data).length);

        switch ((response.data).length) {
            case 0:
                setfetchedProfiles([]);
                break;

            default:
                setfetchedProfiles(response.data);
                break;
        }

    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        setLoading(false);
    }
};

const searchGroup = async (token, searchText, setSearchedGroups, setLoading) => {
    try {
        setLoading(true);
        console.log(searchText)
        const response = await axios.get(`http://localhost:3000/groups/search/chatrooms`, {
            headers: {
                Authorization: token,
                Timestamp: new Date()
            },
            params: {
                string: searchText
            }
        });
        console.log(response.data);

        switch (response.data.status) {
            case "success":
                setSearchedGroups(response.data.groups);
                break;

            default:
                setSearchedGroups([]);
                break;
        }

    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        setLoading(false);
    }
};

export { fetchProfiles, searchGroup, searchUser };