import { useEffect, useState} from 'react';
import { getAuth, updateProfile, updateEmail, updatePassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { fetchProfilePicUrl } from '../firestoreService';



const EditProfile = () => {

    const auth = getAuth();
    const user = auth.currentUser;
    const userId = user ? user.uid : null;
    const [email, setEmail] = useState(user?.email || "");
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState(user?.displayName || '');
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [profilePicUrl, setProfilePicUrl ] = useState('');

 

    const navigate = useNavigate();
    
    // fetch user's profile picture URL on component mount
    useEffect (() => {

        const getProfilePic = async () => {

            if (userId) {
                const url = await fetchProfilePicUrl(userId);
                console.log('Fetching profile picture for userId:', userId);
                console.log('Profile picture URL:', profilePicUrl);

                setProfilePicUrl(url);
            }

        };

        getProfilePic();

    }, [userId]);


    // update the user's profile
    const handleUpdateProfile = async () => {

        try {
            // update the displayName
            if (displayName != user.displayName) {
                await updateProfile(user, { displayName});
            }

            // update email
            if (email != user.email) {
                await updateEmail(user, email);
            }
            
            if (password) {
                await updatePassword(user, password);
            }

            setSuccess('Profile updated successfully');

            // clear the success message after 3 seconds
            setTimeout(() => {
                setSuccess('');
            }, 3000);
        }

        
        catch (error) {
            
            setError('Failed to update profile: ' + error.message);
            setSuccess('');

        }
    };

    const handleEditProfilePic = async () => {
        navigate('/edit-pic');
    }


  return (
    <div>
        <div className='mt-20'>
            <h3 className='flex justify-center font-semibold text-3xl'>My Profile</h3>
        </div>

        {/* user profile icon */}
        <div className='flex justify-center mb-4 mt-6'>
            <div className="relative w-28 h-28 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-300">
            
                {profilePicUrl ? (
                    <img src={profilePicUrl} alt="Profile" className="absolute w-28 h-28 object-cover rounded-full" />
                ) : (

                    <svg className="absolute w-20 h-20 text-gray-400 ml-4 mt-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                    </svg>

                )}

                        {/* Edit profile picture button */}
                        <button onClick={handleEditProfilePic} className="absolute bottom-3 right-1 bg-[#0A142F] rounded-full shadow-md p-1 z-20">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.659 2.341a1 1 0 00-1.414 0l-10 10a1 1 0 00-.293.707v2.586a1 1 0 001 1h2.586a1 1 0 00.707-.293l10-10a1 1 0 000-1.414l-2-2zM4 15.586v-2.586l10-10 2 2-10 10H4z" />
                            </svg>
                        </button>
                    </div>
                </div>


        <div className='flex flex-col items-center bg-gray-100 p-10 mx-96 rounded-md mt-10'>


            {/* Display name field */}
            <div className='mb-4'>
                <label htmlFor='displayName' className='font-medium text-gray-700 block'>Display Name</label>
                <input 
                type="text" 
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                disabled={!isEditingName} // disable input unless editing
                className='bg-white border border-gray-300 rounded-md shadow-sm p-2 '/> 
                <button
                    onClick={() => setIsEditingName(!isEditingName)}
                    className='ml-2 px-4 bg-[#0A142F] bg-opacity-85 text-white p-1 rounded-md hover:bg-[#0A142F] transition duration-200'
                >
                    {isEditingName ? 'Cancel': 'Edit'}
                </button>
            </div>


            {/* Email Field */}
            <div className='mb-4'>
            <label htmlFor='email' className='font-medium text-gray-700 block'>Email</label>
            <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditingEmail} // disable input unless editing
                className='bg-white border border-gray-300 rounded-md shadow-sm p-2 '/> 
                <button
                    onClick={() => setIsEditingEmail(!isEditingEmail)}
                    className='ml-2 px-4 bg-[#0A142F] bg-opacity-85 text-white p-1 rounded-md hover:bg-[#0A142F] transition duration-200'
                >
                    {isEditingEmail ? 'Cancel': 'Edit'}
                </button>
            </div>

            {/* Password Field */}
            <div className='mb-4'>
            <label htmlFor='password' className='font-medium text-gray-700 block'>Password</label>
                <input 
                    type="password" required
                    value={isEditingPassword ? password : '**********'}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={!isEditingPassword} // disable input unless editing
                    placeholder='**********'
                    className='bg-white border border-gray-300 rounded-md shadow-sm p-2'/> 
                <button
                    onClick={() => setIsEditingPassword(!isEditingPassword)}
                    className='ml-2 px-4 bg-[#0A142F] bg-opacity-85 text-white p-1 rounded-md hover:bg-[#0A142F] transition duration-200'
                >
                    {isEditingPassword ? 'Cancel': 'Edit'}
                </button>
            </div>

            {/* Update Profile Button */}
            <div className='w-full max-w-md'>
            <button 
                    className='bg-[#0A142F] ml-28 mt-10 text-gray-100 p-2 rounded-md w-[195px] hover:bg-[#1B2A56] hover:text-white transition duration-300 ease-in-out'
                    onClick={handleUpdateProfile}
                    >
                    Update Profile
                </button>
                    
            </div>

            { /* Display success message */}
            { success && (
                <div className='mt-4 text-green-600'>
                    {success}
                </div>

            )}

            { /* Display error message */}
            { error && (
                <div className='mt-4 text-red-600'>
                    {error}
                </div>

            )}

        
            </div>
    </div>
  );
};

export default EditProfile;