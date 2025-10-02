import { useState } from "react";
import { BriefcaseBusiness } from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";

const AdminNoteSkill = ({ user }) => {
    const [skills, setSkills] = useState(user?.skills || []);
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(false);

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && inputValue.trim() !== "") {
            e.preventDefault();
            if (!skills.includes(inputValue.trim())) {
                setSkills([...skills, inputValue.trim()]);
            }
            setInputValue("");
        }
    };

    const removeSkill = (skillToRemove) => {
        setSkills(skills.filter((skill) => skill !== skillToRemove));
    };

    const handleSave = async () => {
        if (!user?._id && !user?.uid) {
            alert("❌ No user ID found");
            return;
        }

        try {
            setLoading(true);
            const userId = user._id || user.uid;
            const res = await axiosInstance.put(`/users/${userId}/skills`, { skills });
            console.log("✅ Saved:", res.data);
            alert("Skills saved successfully ✅");
        } catch (error) {
            console.error("❌ Error saving skills:", error);
            alert("Failed to save skills ❌");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="rounded-xl bg-blue-50 border border-blue-200 shadow p-4">
            <h3 className="text-lg font-semibold text-blue-800 flex items-center gap-2">
                <BriefcaseBusiness /> Skills
            </h3>

            <div className="mt-3 flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                    <span
                        key={index}
                        className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm flex items-center gap-2"
                    >
                        {skill}
                        <button
                            onClick={() => removeSkill(skill)}
                            className="text-xs text-red-600 hover:text-red-800"
                        >
                            ✕
                        </button>
                    </span>
                ))}
            </div>

            <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a skill and press Enter..."
                className="w-full mt-2 p-2 border border-blue-300 rounded-lg text-sm focus:outline-none focus:ring focus:ring-blue-200"
            />

            <div className="mt-3 flex gap-2">
                <button
                    onClick={handleSave}
                    disabled={loading || skills.length === 0}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? "Saving..." : "Save"}
                </button>
            </div>
        </div>
    );
};

export default AdminNoteSkill;
