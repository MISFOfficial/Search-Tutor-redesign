import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

const Test = () => {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="p-4 max-w-6xl mx-auto">
            {/* Search box */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search by job title or job ID..."
                    // value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-1/2 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            <Outlet context={{ searchTerm }}></Outlet>
        </div>
    );
};

export default Test;