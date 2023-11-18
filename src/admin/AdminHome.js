import React from 'react';
import AdminNavigation from './AdminNavigation'
import { Outlet } from 'react-router-dom';


function AdminHome() {


    return (
        <div className='admin-home'>
            <AdminNavigation />
            <Outlet />
        </div>
    )
}

export default AdminHome;
