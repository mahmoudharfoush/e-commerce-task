import React, { useContext } from 'react'
import Input from '../../pages/Input.jsx';
import { useFormik } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {sendcodeSchema} from '../validation/Validate.js'

export default function SendCode() {

  const navigate = useNavigate();

    const initialValues={
      email:'',
   
 
    };

    const onSubmit= async users=>{
      const {data} = await axios.patch(`https://ecommerce-node4.vercel.app/auth/sendcode`,users);

      if(data.message=='success'){
        toast.success('input code', {
            position: "top-right",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });    
      }
      navigate('/forgotPassword');
    }


const formik = useFormik({
   initialValues,
   onSubmit,
   validationSchema:sendcodeSchema
  
  

});


   const inputs = [
  
   {
      id:'email',
      type:'email',
      name:'email',
      title:'user email',
      value:formik.values.email,
    },
   
   ];

   const renderInputs = inputs.map( (input,index)=>
       <Input 
       type={input.type} 
       id={input.id} 
       name={input.name} 
       title={input.title} 
       value={input.value} 
       key={index}
       errors={formik.errors}
       onChange={formik.handleChange} 
       onBlur={formik.handleBlur}
       touched={formik.touched}
       />
        )

  return (
    <>
    <div className='container'>
    <h2>send code</h2>
    <form onSubmit={formik.handleSubmit}>
        {renderInputs}

     <button type='submit' disabled={!formik.isValid}> send </button>   
     
    </form>
    </div>
    </>
  )
}
