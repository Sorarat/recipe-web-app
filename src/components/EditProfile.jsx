import { useState, useEffect} from 'react';
import { getAuth, updateProfile, updateEmail, updatePassword } from 'firebase/auth';


const EditProfile = () => {

    const auth = getAuth();
    const user = auth.currentUser;
    const [email, setEmail] = useState(user?.email || "");
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState(user?.displayName || '');
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    

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
        }

        
        catch (error) {
            
            setError('Failed to update profile: ' + error.message);
            setSuccess('');

        }
    };


  return (
    <div>
        <div className='mt-20'>
            <h3 className='flex justify-center font-semibold text-3xl'>My Profile</h3>
        </div>

        <div className='flex flex-col items-center bg-gray-100 p-10 mx-20 rounded-mds'>


        {/* Display name field */}
        <div className='mb-4'>
            <label htmlFor='displayName' className='font-medium text-gray-700 block'>Email</label>
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

       
        </div>
    </div>
  );
};

export default EditProfile;