import { useState } from 'react';
import axios from 'axios';

export default (callback) => {

    const [list, setList] = useState({});

    const apiCall = async (url, method, data = '') => {
        try {
            const results = await _apiCall({
                url,
                method,
                data
            });
            let newList;
            switch (method) {
                case 'GET':
                    newList = get(results);
                    break;
                case 'POST':
                    newList = post(results);
                    break;
                case 'PUT':
                    newList = put(results);
                    break;
                case 'DELETE':
                    newList = _delete(results);
                    break;
                default:
                    break;
            }
            update(newList);
        } catch (e) {
            console.log(e);
        }
    };

    const _apiCall = async apiData => await axios(apiData);

    const get = results => results.data.results;

    const post = results => [...list, results.data];

    const put = results => {
        const data = results.data;
        return list.map(listItem => listItem._id === data._id ? data : listItem);
    }

    const _delete = results => {
        const id = results.config.data;
        return list.filter(list => list._id !== id);
    }

    const update = newList => {
        setList(newList);
        callback(newList);
    }

    return [apiCall];
};