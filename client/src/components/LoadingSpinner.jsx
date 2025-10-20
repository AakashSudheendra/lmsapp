import { Loader } from "lucide-react";

import React from "react";

const LoadingSpinner = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
            <Loader className="animate-spin h-16 w-16 text-orange-600"/>
            <p className="mt-4 text-lg font-semibold text-gray-700">Loading , please Wait...</p>
        </div>
    )
}

export default LoadingSpinner;