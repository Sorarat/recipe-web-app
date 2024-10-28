import { useState, useEffect } from 'react'
import { storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import { v4 } from 'uuid';
import { uploadProfilePic } from '../firestoreService';
import { getAuth } from 'firebase/auth';
import { fetchProfilePicUrl } from '../firestoreService';


const EditProfilePic = () => {

    const auth = getAuth();
    const userId = auth.currentUser ? auth.currentUser.uid : null;
    const [imageUpload, setImageUpload] = useState(null)
    const [profilePicUrl, setProfilePicUrl ] = useState('');

    const uploadImage = () => {
        
        if (imageUpload == null ) return;

        const imageRef = ref(storage, `profile_images/${imageUpload.name + v4()}` )

        // upload image to firebase storage
        uploadBytes(imageRef, imageUpload)
            .then((snapshot) => {
                // get the download url for the uploaded image
                return getDownloadURL(snapshot.ref);
            })
            .then((downloadURL) => {
                // call firestore function to save URL with userId
                return uploadProfilePic(userId, downloadURL);
            })
            .then(() => {
                alert ("Profile picture uploaded and URL saved");
            })
            .catch((error) => {
                console.error("Error uploading image: ", error);
                alert("Failed to upload image ");
            });

    };

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

    return (
        
        <div>
            <div className='mt-20'>
                <h3 className='flex justify-center font-semibold text-3xl'>Edit Profile Pic</h3>
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

                </div>
            </div>

            <div className='flex justify-center'>
                
                    <input 
                    type="file" 
                    onChange={(event) => {
                        setImageUpload(event.target.files[0]);
                    }} />
                <button onClick={uploadImage} 
                className='bg-gray-200 border-2 border-black'>
                     Upload Image</button>
                
            </div>

        </div>

  )
}

export default EditProfilePic