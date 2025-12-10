import { Link } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";
import { useEffect } from "react";

const DocList = () => {
    const [ docList, setDocList ] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/documents/");
                setDocList(response.data.data);
            }
            catch (err) {
                setDocList([]);
            }
        }
        fetch();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(`Do you want to delete this file - ${docList.find(itm => itm.id == id).filename} ?`);
        if (!confirmDelete) return;
        try {
            const response = await axios.delete(`http://localhost:8080/api/documents/${id}`);

            if (!response.data.success) {
                throw Error("error");
            }
    
            setDocList((prev) => prev.filter((item) => item.id !== id));

            alert("File deleted successfully!");
        }
        catch (err) {
            alert("Failed to delete! Please try later.")
        }
    }

    const handleDownload = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/documents/${id}`,{responseType: 'blob'});
            console.log(response.headers);
            const url = window.URL.createObjectURL(response.data);

            const contentDisposition = response.headers['content-disposition'];
            let fileName = 'downloaded-file';
            if (contentDisposition) {
                const match = contentDisposition.match(/filename="(.+)"/);
                if (match && match[1]) fileName = match[1];
            }

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        }
        catch (err) {
            console.log(err)
            alert("Failed to get file! Please try later.")
        }
    }

    return (
        <>
        <div className="h-[90vh] w-auto flex flex-col justify-start items-center gap-0 p-2 overflow-scroll">
            <div className="flex justify-center items-center text-gray-600 p-1 py-8">
                <span>Find all your uploaded documents below.</span>
            </div>
            <div className="relative w-[1300px] flex justify-end items-center text-gray-700 font-light py-3">
                <Link to={"/upload"}><span>Need to upload a document? <u className="text-blue-700 cursor-pointer">Click here to add document.</u></span></Link>
            </div>
            <div className="flex justify-around items-center w-auto h-auto bg-blue-400 text-white font-bold [&>*]:p-2">
                <div className="w-[50px] h-[100%] p-2 border">
                    <span></span>
                </div>
                <div className="w-[500px] p-2 border">
                    <span>Document</span>
                </div>
                <div className="w-[150px] p-2 border">
                    <span>Size</span>
                </div>
                <div className="w-[250px] p-2 border">
                    <span>Uploaded on</span>
                </div>
                <div className="w-[350px] p-2 border">
                    <span>Actions</span>
                </div>
            </div>
            {
                docList.length == 0 && <div className="py-10">
                    <span className="text-gray-600">No documents uploaded.</span>
                </div>
            }
            { docList.length !== 0 && docList.map( (item, index) => {
                return(
                        <div key={item.id} className="w-auto h-auto flex justify-center items-center py-2 [&>*]:p-2">
                            <div className="w-[50px] h-[100%] flex justify-center items-center">{index+1}</div>
                            <div className="w-[500px] flex justify-start items-center">{item.filename}</div>
                            <div className="w-[150px] text-gray-600 flex justify-start items-center">{(item.filesize/1024).toFixed(0)} KB</div>
                            <div className="w-[250px] text-gray-600 flex justify-start items-center">{item.created_at}</div>
                            <div className="w-[350px] flex justify-end items-center gap-4">
                                <button onClick={() => handleDownload(item.id) } className="w-[100px] border border-green-500 rounded p-2 text-green-800 cursor-pointer hover:bg-green-200">Download</button>
                                <button onClick={() => handleDelete(item.id) } className="w-[100px] border border-red-300 rounded p-2 text-red-800 cursor-pointer hover:bg-red-200">Delete</button>
                            </div>
                        </div>
                    )}
                )
            }
        </div>
        
        </>
    )
}

export default DocList;