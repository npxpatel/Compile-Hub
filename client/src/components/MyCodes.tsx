import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const BACKEND_URL = "https://wd-compiler-backend.vercel.app";


interface Code {
    id : number
}

const MyCodes = () =>{
    const [codes, setCodes] = useState<Code[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");    

    useEffect(() =>{

         const fetchCodes = async () =>{
            try{
                const response = await axios.get(`${BACKEND_URL}/compiler/get-my-codes`,{
                   headers :{
                      Authorization : `Bearer ${localStorage.getItem('token')}`
                   }
                });
                setCodes(response.data.savedCodes);
            }
            catch(err){
                setError("Error while fetching codes");
            }
            finally{
                setLoading(false);
            }
         }

         fetchCodes();

    }, [])

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
   
    return (
        <div className="max-w-3xl mx-auto p-4">
          <h2 className="text-2xl font-bold mb-4">My Codes</h2>
          {codes.length === 0 ? (
            <p className="text-gray-500">No saved codes found.</p>
          ) : (
            <ul className="space-y-3">
              {codes.map((code) => (
                <li key={code.id} className="border p-3 rounded-lg bg-gray-800 text-white flex justify-between items-center">
                  <Link to={`/compile/${code.id}`}>
                    <Button>Open</Button>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      );
};

export default MyCodes;