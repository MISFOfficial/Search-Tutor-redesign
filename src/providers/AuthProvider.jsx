import { createContext, use, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import axiosInstance from "../utils/axiosInstance";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userInfo, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    gender: "",
    city: "",
    location: "",
    fbLink: "",
    institute: "",
    department: "",
    degree: "",
    passingYear: "",
    experience: "",
    agreement: "",
    image: "",
    nid: "",
    idCard: "",
  });


  const [profileParcentage, setProfileParcentage] = useState(() => {
    // load from localStorage if available
    return parseInt(localStorage.getItem("profileParcentage")) || 0;
  });

  useEffect(() => {
    localStorage.setItem("profileParcentage", profileParcentage);
  }, [profileParcentage]);


  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth).finally(() => setLoading(false));
  };

  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email).finally(() => setLoading(false));
  };

  const sendVerificationEmail = async () => {
    if (auth.currentUser) {
      try {
        await sendEmailVerification(auth.currentUser);
        return { success: true, message: "Verification email sent." };
      } catch (error) {
        return { success: false, error };
      }
    } else {
      return { success: false, error: "No user logged in." };
    }
  };

  const requiredFields = [
    "name",
    "phone",
    "whatsapp",
    "gender",
    "city",
    "location",
    "fbLink",
    "institute",
    "department",
    "degree",
    "passingYear",
    "experience",
    "agreement",
    "image",
    "nid",
    "idCard",
  ];


  // 🔹 calculate completion
  const calculateCompletion = () => {
    let filled = 0;
    requiredFields.forEach((field) => {
      if (formData[field] && formData[field].toString().trim() !== "") {
        filled++;
      }
    });
    return Math.round((filled / requiredFields.length) * 100);
  };

  // 🔹 whenever formData changes → update percentage
  useEffect(() => {
    const percentage = calculateCompletion();
    setProfileParcentage(percentage);
    localStorage.setItem("profileParcentage", percentage);
  }, [formData]);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          let token = localStorage.getItem("accessToken");

          // যদি token না থাকে তাহলে JWT থেকে নতুন টোকেন চাও
          if (!token) {
            const jwtRes = await axiosInstance.post("/jwt", {
              uid: currentUser.uid,
              email: currentUser.email,
            });

            token = jwtRes.data.token;
            localStorage.setItem("accessToken", token);
          }

          // এখন ইউজার ডেটা নিয়ে আসো
          const userRes = await axiosInstance.get(`/users/${currentUser.uid}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setUserData(userRes.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUserData(null);
        }
      } else {
        setUserData(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    userInfo,
    loading,
    profileParcentage,
    formData,
    setFormData,
    createUser,
    signIn,
    logOut,
    setLoading,
    setUserData,
    resetPassword,
    sendVerificationEmail,
    setProfileParcentage,
  };




  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
