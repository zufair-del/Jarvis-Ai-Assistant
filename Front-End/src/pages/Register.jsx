import bg from '../assets/blue.jpeg'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const Register = ()=>{
    const [name , setName] = useState("");
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [error , setError] = useState("");
    const [loading , setLoading] = useState(false);
    const navigate = useNavigate();

    const handleFormSubmit = async (e)=>{
        e.preventDefault();
        setError(false);
        setLoading(true);
        try {
           const response = await axios.post("https://orange-space-barnacle-g475p5gg7qq53v94p-3000.app.github.dev/api/auth/register",{
            name , email , password
           },{withCredentials: true})
           setLoading(false); 
        } catch (error) {
            console.log(error);
            setLoading(false);
            // setError(error.response.data.message);
        }
        
    }

    return (
        <div className="w-full h-screen flex items-center justify-center bg-cover" style={{ backgroundImage: `url(${bg})` }}>
            <form onSubmit={handleFormSubmit} className="p-9 w-[350px] h-[400px] rounded-md max-w-[500px] bg-[#00000069] backdrop-blur-md border flex flex-col justify-center gap-[20px] items-center shadow-lg shadow-blue-400">
            <h1 className='font-black text-3xl tracking-tighter text-[#ddd8d8] mb-4'>Sign Up</h1>
            <input onChange={(e)=> {setName(e.target.value)}} value={name} type='text' placeholder='Enter Your Name' className='w-full h-[40px]  p-2 text-[white] border  rounded-full px-5 outline-none' />
            <input onChange={(e)=> {setEmail(e.target.value)}} value={email} type='email' placeholder='Enter Your Email' className='w-full h-[40px]  p-2 text-[white] border  rounded-full px-5 outline-none' />
            <input onChange={(e)=> {setPassword(e.target.value)}} value={password} type='password' placeholder='Enter Your Password' className='w-full h-[40px]  p-2 text-[white] border  rounded-full px-5 outline-none' />
            {error.length > 0 && <p className='text-red-500 text-[12px]'> *{error}</p>}
            <button disabled={loading} className='mt-2 bg-[white] text-[black] tracking-tighter text-[16px] font-black cursor-pointer rounded-full px-[25px] py-[8px]'>{loading? "Loading..." : "Sign Up" }</button>

            <p className='text-[white] text-[14px] cursor-pointer' onClick={()=>{navigate('/login')}}>Already have an account ?  <span className='text-[red]'>Sign In</span></p>
                
            </form>
        </div>
    )
}

export default Register