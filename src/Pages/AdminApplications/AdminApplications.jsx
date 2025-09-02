import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const AdminApplications = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate()

    const handleClearSearch = () => {
        navigate('/admin/applications')
        setSearchTerm('')
    }

    return (
        <div className="p-4 max-w-6xl mx-auto">
            {/* Search box */}
            <div className="mb-6 flex items-center gap-5 sticky top-[90px] md:top-[115px] lg:top-[90px] z-40"
            >
                <input
                    type="text"
                    placeholder="Search by job title or job ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-1/2 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button onClick={handleClearSearch} className='btn bg-indigo-500 text-white'>Clear</button>
            </div>
            <Outlet context={{ searchTerm }}></Outlet>
        </div>
    );
};

export default AdminApplications;