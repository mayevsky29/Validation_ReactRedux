import React from 'react'
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";

import http from "../../http_common";
import { GetUser } from '../../actions/usersAction';

const UserList = () => {
    const dispatch = useDispatch();
    const {userList}=useSelector(state=>state.user);

    useEffect(()=>
    {
        dispatch(GetUser());
    },[]);

    return (
       
        <div>            
            <table className="table">
                <thead className="table table-light">
                <>
                    <h2 className="text-center">Список користувачів</h2>
                </>
                    <tr>
                        <th scope="col">Photo</th>
                        <th scope="col">Name</th>
                    </tr>
                </thead>
                <tbody>
                    {userList && userList.map((item) =>
                            <tr key={item.email}>
                                <td>
                                    <img src={http.defaults.baseURL + item.photo}
                                        alt="user photo"
                                        width="150"
                                    />
                                </td>
                                <td>{item.email}</td>
                            </tr>)}
                </tbody>
            </table>
        </div>
    )
}

export default UserList


