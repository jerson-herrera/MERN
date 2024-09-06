// import React, { useState } from 'react';
// import { registerRequest } from '../api/auth';
// export const RegisterPage = () => {
//     const [formData, setFormData] = useState({
//         username: '',
//         password: '',
//         email: ''
//     });

//     // handleChange es una función que se ejecuta cada vez que el usuario escribe en uno de los campos del formulario.
//     const handleChange = (e) => {
//         const { name, value } = e.target; //e.target representa el elemento (input)
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };
//     //es la función que se ejecuta cuando el formulario es enviado
//     const handleSubmit = async (e) => {
//         e.preventDefault(); //Evita que la página se recargue al enviar el formulario
//         console.log('Datos del formulario:', formData);
//         // Aquí puedes hacer una solicitud al backend para registrar al usuario
//         try {
//             // Llamada a la función registerRequest con los datos del formulario
//             const response = await registerRequest(formData);
//             console.log('Respuesta del servidor:', response);

//             // Aquí podrías manejar la respuesta, como redirigir al usuario o mostrar un mensaje de éxito
//         } catch (error) {
//             console.error('Error en el registro:', error);
//             // Aquí podrías manejar los errores, como mostrar un mensaje de error al usuario
//         }
//     };

//     return (
//         <div className=' bg-zinc-800 max-w-md p-10 rounden-md'>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label htmlFor="username">Username:</label>
//                     <input
//                         type="text" //tipo de input
//                         id="username" //Un id que debe coincidir con el htmlFor del <label>.
//                         name="username" //Un name que se usa en handleChange para actualizar el  estado correcto.
//                         value={formData.username} //Un value que vincula el input con el estado.
//                         onChange={handleChange} //Un onChange que llama a handleChange cada vez que el usuario escribe en el campo.
//                         required //asegura que el formulario no se puede enviar si el campo está vacío.
//                         placeholder='Username'
//                         className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="password">Password:</label>
//                     <input
//                         type="password"
//                         id="password"
//                         name="password"
//                         value={formData.password}
//                         onChange={handleChange}
//                         required
//                         placeholder='Password'
//                         className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="email">Email:</label>
//                     <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         required
//                         placeholder='Email'
//                         className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
//                     />
//                 </div>
//                 <button type="submit">Registrarse</button>
//             </form>
//         </div>
//     );
// }

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate,Link } from "react-router-dom";
export const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errores } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) navigate("/task");
  }, [isAuthenticated]);
  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });
  return (
    <div className=" bg-zinc-800 max-w-md p-10 rounden-md">
      {errores.map((error, i) => (
        <div className="bg-red-500 p-2 text-white" key={i}>
          {error}
        </div>
      ))}
      {/* {Array.isArray(errores) &&
        errores.map((error, i) => (
          <div className="bg-red-500 p-2 text-white" key={i}>
            {error}
          </div>
        ))} */}
      <form onSubmit={onSubmit}>
        <input
          type="text"
          {...register("username", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Username"
        />
        {errors.username && (
          <p className="text-red-500">Username is required</p>
        )}

        <input
          type="email"
          {...register("email", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Email"
        />
        {errors.email && <p className="text-red-500">Email is required</p>}

        <input
          type="password"
          {...register("password", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Password"
        />
        {errors.password && (
          <p className="text-red-500">Password is required</p>
        )}

        <button type="submit">Register</button>
      </form>
      <p className="flex gap-x-2 justify-between">
        Ya tiene una cuenta?{" "}
        <Link to="/login" className="text-sky-500">
          Sing in
        </Link>
      </p>
    </div>
  );
};
