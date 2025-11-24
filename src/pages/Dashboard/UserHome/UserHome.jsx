import useAuth from "../../../hooks/useAuth";


const UserHome = () => {
    const { user } = useAuth();
    return (
        // <div>
        //     <h2 className="text-3xl">
        //         <span>Hi, Welcome</span>
        //         {
        //             user?.displayName ? user.displayName : 'Back'
        //         }
        //     </h2>
        // </div>
        <div className="max-w-3xl mx-auto mt-10 shadow-lg rounded-xl overflow-hidden bg-white">

            {/* Cover Photo */}
            <div className="h-48 w-full bg-gradient-to-r from-indigo-500 to-purple-600 relative">

                {/* Profile Image */}
                <img
                    src={user?.photoURL || "https://i.ibb.co/2FsfXqM/user.png"}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-white absolute left-1/2 transform -translate-x-1/2 bottom-[-40px]"
                />
            </div>

            {/* Main Info */}
            <div className="mt-16 text-center px-4 pb-8">
                <h2 className="text-3xl font-semibold">
                    {user?.displayName || "User Name"}
                </h2>
                <p className="text-gray-600 mt-1">
                    {user?.email || "user@example.com"}
                </p>

                {/* Bio Section */}
                <p className="mt-4 text-gray-700">
                    {user?.bio || "This is a short user bio. You can update your profile to add a description."}
                </p>

                {/* Buttons */}
                <div className="mt-5 flex justify-center gap-4">
                    <button className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
                        Edit Profile
                    </button>
                    <button className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">
                        Settings
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserHome;