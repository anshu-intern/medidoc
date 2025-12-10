import { useRef } from 'react';
import uploadIcon from '../assets/file.png';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddDoc = () => {
    const fileRef = useRef(null);
    const [ selectedFile, setSelectedFile ] = useState(null);
    const [ preview, setPreview ] = useState(null);
    const navigate = useNavigate();

    const handleFileClick = () => {
        fileRef.current.click();
    }

    const handlefileChange = (item) => {
        setSelectedFile(item);
        setPreview(URL.createObjectURL(item))
    }

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const response = await axios.post(
                "http://localhost:8080/api/documents/upload", 
                formData,
                { headers: {"Content-Type": "multipart/form-data"},}
            );
            alert("Upload successful!");
            navigate("/");
        } 
        catch (err) {
            alert("Upload failed! Please try again after some time.");
        }
    }

    return (
        <>
        <div className="relative flex flex-col justify-center items-center w-[100%] h-[90vh]">
            <div className="py-4">
                <span className='font-medium'>Add your document below.</span>
            </div>
            <div className="relative w-[70%] h-[75%] flex justify-center items-center gap-0 border rounded-xl border-gray-500 overflow-hidden">
                <div className="relative h-[100%] w-[50%] flex flex-col justify-center items-center">
                    <form id='inputForm' className='flex flex-col justify-center items-center gap-4'>
                        <div onClick={() => handleFileClick()} className='relative h-[300px] flex flex-col justify-center items-center hover:bg-blue-100 rounded-xl cursor-pointer border border-white p-10 hover:border-blue-500 hover:border-2 hover:text-blue-700 font-light hover:underline'>
                            {!selectedFile && <img src={uploadIcon} alt='' className='h-[200px] p-4'/>}
                            {!selectedFile && <span className='text-center'>Click here to select your file.</span>}
                            {selectedFile && <span className='text-center'>Selected file: {selectedFile.name}</span>}
                            {selectedFile && <span className='text-center'>Change selected file.</span>}
                        </div>
                        <input ref={fileRef} type="file" accept="application/pdf" onChange={(e) => handlefileChange(e.target.files[0])} className="hidden"/>
                        <button disabled={!selectedFile} onClick={(e) => handleUpload(e)} className={`w-[150px] h-[50px] border border-blue-400 px-6 py-2 rounded-xl ${!selectedFile ? 'bg-blue-300 cursor-not-allowed' :'bg-blue-500 hover:bg-blue-700 cursor-pointer'} font-bold text-white`}>Upload file</button>
                        <button disabled={!selectedFile} className={`w-[150px] h-[50px] border border-red-400 px-6 py-2 rounded-xl ${!selectedFile ? 'bg-red-200 cursor-not-allowed' : 'bg-red-400 hover:bg-red-500 cursor-pointer' } font-bold text-white`}>Cancel</button>
                    </form>
                </div>
                <div className="relative h-[100%] w-[50%] border-l border-gray-500 flex justify-center items-center p-4 bg-gray-100">
                    {!preview && <span className="text-gray-400">Select file to get preview.</span>}
                    {preview && <iframe src={preview} title="PDF Preview" className='border relative h-[100%] w-[100%]'></iframe>}
                </div>
            </div>
            <div className='relative w-[70%] h-[15%] flex justify-center items-start p-4'>
                <Link to={"/"}><span className='text-blue-500 font-bold underline cursor-pointer hover:text-blue-700'>Click here to go back and view all documents.</span></Link>
            </div>
        </div>
        </>
    )
}

export default AddDoc;