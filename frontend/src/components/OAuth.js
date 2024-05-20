import React, { useContext } from "react";
import iconGoogle from "../assest/img/google.png";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";
import API from "../common";
import { toast } from 'react-toastify';
import Context from "../context";

const OAuth = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const { fetchUserDetails } = useContext(Context)

  const handleGoogle = async () => {      
      try {
        const provider = new GoogleAuthProvider();
        const resultFromGoogle = await signInWithPopup(auth, provider);
        const payload = {
            name: resultFromGoogle.user.displayName,
            email: resultFromGoogle.user.email,
            photoURL: resultFromGoogle.user.photoURL
        }
        
        const res = await fetch(API.google.url, {
            method: API.google.method,
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(payload)
        })

        const dataApi = await res.json();
        if(dataApi.success) {
            toast.success(dataApi.message);
            fetchUserDetails();
            navigate('/');
        }
    
        if(dataApi.error) {
            toast.error(dataApi.message);
        }
    } catch (error) {
        console.log(error);
    }
  };
  return (
    <div onClick={handleGoogle} className="button-google">
      <img src={iconGoogle} alt="google icon" className="w-6 h-6 mr-2" />
      Continue with Google
    </div>
  );
};

export default OAuth;
