import React from "react";
import iconGoogle from "../assest/img/google.png";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";
import API from "../common";
import { toast } from 'react-toastify';

const OAuth = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();

  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    
    try {
        const resultFromGoogle = await signInWithPopup(auth, provider);
        const payload = {
            name: resultFromGoogle.user.displayName,
            email: resultFromGoogle.user.email,
            photoURL: resultFromGoogle.user.photoURL
        }
        
        const res = await fetch(API.google.url, {
            method: API.google.method,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(payload)
        })

        const data = await res.json();
        toast.success(data.message);
        navigate("/");
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
