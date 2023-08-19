import axios from "axios";
import { useState, useEffect } from "react";
import noUserImg from "../assets/ejeImg.png"

const editSVG = <svg className="dark:fill-gray-200 fill-gray-700 " width="28px" height="28px" viewBox="0 -0.5 25 25" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M17.7 5.12758L19.266 6.37458C19.4172 6.51691 19.5025 6.71571 19.5013 6.92339C19.5002 7.13106 19.4128 7.32892 19.26 7.46958L18.07 8.89358L14.021 13.7226C13.9501 13.8037 13.8558 13.8607 13.751 13.8856L11.651 14.3616C11.3755 14.3754 11.1356 14.1751 11.1 13.9016V11.7436C11.1071 11.6395 11.149 11.5409 11.219 11.4636L15.193 6.97058L16.557 5.34158C16.8268 4.98786 17.3204 4.89545 17.7 5.12758Z" stroke="" strokeWidth="0" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M12.033 7.61865C12.4472 7.61865 12.783 7.28287 12.783 6.86865C12.783 6.45444 12.4472 6.11865 12.033 6.11865V7.61865ZM9.23301 6.86865V6.11865L9.23121 6.11865L9.23301 6.86865ZM5.50001 10.6187H6.25001L6.25001 10.617L5.50001 10.6187ZM5.50001 16.2437L6.25001 16.2453V16.2437H5.50001ZM9.23301 19.9937L9.23121 20.7437H9.23301V19.9937ZM14.833 19.9937V20.7437L14.8348 20.7437L14.833 19.9937ZM18.566 16.2437H17.816L17.816 16.2453L18.566 16.2437ZM19.316 12.4937C19.316 12.0794 18.9802 11.7437 18.566 11.7437C18.1518 11.7437 17.816 12.0794 17.816 12.4937H19.316ZM15.8863 6.68446C15.7282 6.30159 15.2897 6.11934 14.9068 6.2774C14.5239 6.43546 14.3417 6.87397 14.4998 7.25684L15.8863 6.68446ZM18.2319 9.62197C18.6363 9.53257 18.8917 9.13222 18.8023 8.72777C18.7129 8.32332 18.3126 8.06792 17.9081 8.15733L18.2319 9.62197ZM8.30001 16.4317C7.8858 16.4317 7.55001 16.7674 7.55001 17.1817C7.55001 17.5959 7.8858 17.9317 8.30001 17.9317V16.4317ZM15.767 17.9317C16.1812 17.9317 16.517 17.5959 16.517 17.1817C16.517 16.7674 16.1812 16.4317 15.767 16.4317V17.9317ZM12.033 6.11865H9.23301V7.61865H12.033V6.11865ZM9.23121 6.11865C6.75081 6.12461 4.7447 8.13986 4.75001 10.6203L6.25001 10.617C6.24647 8.96492 7.58269 7.62262 9.23481 7.61865L9.23121 6.11865ZM4.75001 10.6187V16.2437H6.25001V10.6187H4.75001ZM4.75001 16.242C4.7447 18.7224 6.75081 20.7377 9.23121 20.7437L9.23481 19.2437C7.58269 19.2397 6.24647 17.8974 6.25001 16.2453L4.75001 16.242ZM9.23301 20.7437H14.833V19.2437H9.23301V20.7437ZM14.8348 20.7437C17.3152 20.7377 19.3213 18.7224 19.316 16.242L17.816 16.2453C17.8195 17.8974 16.4833 19.2397 14.8312 19.2437L14.8348 20.7437ZM19.316 16.2437V12.4937H17.816V16.2437H19.316ZM14.4998 7.25684C14.6947 7.72897 15.0923 8.39815 15.6866 8.91521C16.2944 9.44412 17.1679 9.85718 18.2319 9.62197L17.9081 8.15733C17.4431 8.26012 17.0391 8.10369 16.6712 7.7836C16.2897 7.45165 16.0134 6.99233 15.8863 6.68446L14.4998 7.25684ZM8.30001 17.9317H15.767V16.4317H8.30001V17.9317Z" fill=""></path> </g></svg>

function ExportDataButton() {
    const handleExport = () => {
        try {
            axios.get('http://localhost:4000/export')
                .then(response => {
                    const data = response.data;
                    const jsonData = JSON.stringify(data, null, 2);

                    const blob = new Blob([jsonData], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);

                    const link = document.createElement('a');
                    link.href = url;
                    link.download = 'exported_data.json';
                    link.click();

                    URL.revokeObjectURL(url);
                })
                .catch(error => {
                    console.error('Error exporting data:', error);
                });
        } catch (error) {
            console.error('An error occurred while exporting:', error);
        }
    };

    return (<button
        className="p-3 text-white bg-green-500 hover:bg-green-600 transition-all duration-300 rounded-md"
        id="exportDataButton"
        onClick={handleExport}
    >
        Export
    </button>)
}

const GeneralSettingsTab = () => {
    return (
        <>
            {/* <div className="mb-4 flex justify-between items-center  border-b border-gray-700 ">
                <span className="text-lg">Theme</span>
                <select className="p-3 bg-white dark:bg-slate-900" name="theme" id="theme">
                    <option className="" value="light">Dark</option>
                    <option value="dark">Light</option>
                </select>
            </div> */}
            <div className="pb-3 mb-2 flex justify-between items-center  border-b border-gray-700 ">
                <span className="text-lg">Export data</span>
                <ExportDataButton />
            </div>
        </>
    )
}


const ProfileSettingsTab = () => {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [profilePhoto, setProfilePhoto] = useState(noUserImg);

    const checkLogin = async () => {
        var val = await axios.get("http://localhost:4000/login");
        if (val.data.user) {
            setId(val.data.user[0].id)
            setName(val.data.user[0].name)
            setUsername(val.data.user[0].username)
            setEmail(val.data.user[0].email)
            setPhoneNumber(val.data.user[0].tel)
            if (val.data.user[0].profile_photo !== null) {
                setProfilePhoto(`http://localhost:4000/${val.data.user[0].profile_photo}`)
            }
        }
        else {
            his("/login")
        }
    }
    useEffect(() => {
        checkLogin();
    }, []);

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        if (selectedFile) {
            try{
            const formData = new FormData();
            formData.append('file', selectedFile);

            axios.post('http://localhost:4000/upload-profile-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(response => {
                    closeFileInput()
                    setProfilePhoto(`http://localhost:4000/${val.data.user[0].profile_photo}`)
                    console.log('File uploaded successfully', response.data);
                })
                .catch(error => {
                    console.error('Error uploading file', error);
                    setProfilePhoto(noUserImg);
                });}
                catch (err){
                    console.error(err)
                }

        }
    };

    const [open, setOpen] = useState(false);

    const openFileInput = () => {
        setOpen(true);
    };

    const closeFileInput = () => {
        setOpen(false)
    }

    return (
        <div className="w-full">
            <div className="mb-4 flex justify-between items-center pb-3 border-b border-gray-700">
                <img className="w-16 rounded-md" id="profile_photo" src={profilePhoto} alt="profile photo" />
                <button onClick={openFileInput} className="hover:bg-gray-200 dark:hover:bg-slate-700 rounded-md transition-all">
                    {editSVG}
                </button>
                <div className={`${!open ? 'hidden' : ''} fixed inset-0 flex items-center justify-center z-30 bg-opacity-50 bg-gray-900`}>
                    <div className="dark:text-white text-gray-700 flex flex-col bg-gray-200 dark:bg-slate-800 px-4 rounded-lg shadow-md p-4 gap-4">
                    <div className="flex items-center border-b border-gray-700 py-1 justify-between">
                    <span className="text-lg font-bold py-3">Change profile photo</span>
                    <button
                        className="justify-self-end dark:hover:bg-slate-700 hover:bg-gray-200 text-gray-700 
                        dark:text-white p-3 px-5 rounded-md"
                        onClick={closeFileInput}
                    >
                        x
                    </button>
                </div>
                        <input className="p-5 file:bg-gray-300 file:dark:bg-slate-700 file:border-none file:text-gray-600 file:dark:text-gray-400 file:rounded-md bg-gray-300 dark:bg-slate-700 cursor-pointer file:cursor-pointer rounded-md" type="file" onChange={handleFileChange} accept="image/png" />
                        <button  onClick={handleUpload} className="bg-green-500 hover:bg-green-600 text-white rounded-md p-3 transition-all">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
            <div className="pb-3 mb-2 gap-2 flex flex-col">
                <h2 className="text-lg font-bold">Details</h2>
                <div className="flex flex-col">
                    <span><strong>ID:</strong> {id}</span>
                </div>
                <div className="flex justify-between items-center ">
                    <span><strong>Name:</strong> {name}</span>
                
                </div>
                <span><strong>Username:</strong> {username}</span>
                <span><strong>Email:</strong> {email}</span>
                <div className="flex justify-between">
                    <span><strong>Phone number:</strong> {phoneNumber}</span>
                    
                </div>
                <div className="pt-3">
                    <button className="bg-red-500 hover:bg-red-600 rounded-md p-3 transition-all text-white">Delete Account</button>
                </div>
            </div>
        </div>
    );
}

export default function Settings({ onClose, tab }) {

    const [switcher, setSwitcher] = useState(tab)

    function toggleToProfile() {
        setSwitcher('profile')
    }
    function toggleToGeneral() {
        setSwitcher('general')
    }

    const [isModalOpen, setIsModalOpen] = useState(true);

    useEffect(() => {
        if (isModalOpen) {
            // Desactivar el scroll cuando se abre el modal
            document.body.style.overflow = "hidden";
        } else {
            // Reactivar el scroll cuando se cierra el modal
            document.body.style.overflow = "auto";
        }

        // Limpieza del efecto
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isModalOpen]);

    function toggleToProfile() {
        setSwitcher('profile');
    }

    function toggleToGeneral() {
        setSwitcher('general');
    }

    return (
        <div className={`${isModalOpen ? "" : "hidden "} fixed inset-0 flex items-center justify-center z-30 bg-opacity-50 bg-gray-900`}>
            <div className="dark:text-white text-gray-700 flex flex-col bg-white dark:bg-slate-900 px-4 rounded-lg shadow-md">
                <div className="flex items-center border-b border-gray-700 py-2 justify-between">
                    <span className="text-lg font-bold py-3">Settings</span>
                    <button
                        className="justify-self-end dark:hover:bg-slate-700 hover:bg-gray-200 text-gray-700 
                        dark:text-white p-3 px-5 rounded-md"
                        onClick={onClose}
                    >
                        x
                    </button>
                </div>
                <div id="tabButtons" className="flex items-center py-2 justify-between">
                    <div className="flex gap-x-3">
                        <button
                            onClick={toggleToGeneral}
                            className={`p-3 hover:dark:bg-slate-700 hover:bg-gray-200 rounded-md 
                            ${switcher !== 'profile' ? 'bg-gray-200 dark:bg-slate-700' : ''}`}
                        >
                            General
                        </button>
                        <button
                            onClick={toggleToProfile}
                            className={`p-3 hover:dark:bg-slate-700 hover:bg-gray-200 rounded-md 
                            ${switcher === 'profile' ? 'bg-gray-200 dark:bg-slate-700' : ''}`}
                        >
                            Profile
                        </button>
                    </div>
                </div>
                <div className="w-64 sm:w-96 p-3">
                    <div
                        id="generalSettingsTab"
                        className={`mb-4 flex flex-col 
                        ${switcher !== 'profile' ? '' : 'hidden'}`}
                    >
                        <GeneralSettingsTab />
                    </div>
                    <div
                        id="profileSettingsTab"
                        className={`mb-4 flex justify-between items-center 
                        ${switcher === 'profile' ? '' : 'hidden'}`}
                    >
                        <ProfileSettingsTab />
                    </div>
                </div>
            </div>
        </div>
    );
};

