import { useEffect } from "react";
import { useForm } from "react-hook-form";  // Para formulario libreria npm i react-hook-form
import { Flip, toast } from "react-toastify"; // Alertas
import Error from "./Error";
import type { DraftPatient } from "../types";
import { usePatientStore } from "../store"; // Zustand

export default function PatientForm() {

    const addPatient = usePatientStore(state => state.addPatient)
    const activeId = usePatientStore(state => state.activeId)
    const patients = usePatientStore(state => state.patients)
    const updatePatient = usePatientStore(state => state.updatePatient)

    const { register, handleSubmit, setValue, formState: {errors}, reset } = useForm<DraftPatient>()

    useEffect(() => {
        if(activeId) {
            const activePatient = patients.filter( patient => patient.id === activeId)[0]
            //setvalue es para setear el formulario y regresar el valor al formulario (actualizar)
            setValue('name', activePatient.name)
            setValue('caretaker', activePatient.caretaker)
            setValue('date', activePatient.date)
            setValue('email', activePatient.email)
            setValue('symptoms', activePatient.symptoms)
        }
    }, [activeId])

    const registerPatient = (data: DraftPatient) => {
        if(activeId) {
            updatePatient(data)
            // Alerta
            toast('Paciente Actualizado Correctamente', {
                type: 'success',
                transition: Flip,
            });
        } else {
            addPatient(data)
            // Alerta
            toast('Paciente Registrado Correctamente', {
                type: 'success',
                transition: Flip,
            });
        }

        reset() // Reiniciar el formulario despues de guardarlo
    }
  
    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

            <p className="text-lg mt-5 text-center mb-10">
                Añade Pacientes y {''}
                <span className="text-red-600 font-bold">Administralos</span>
            </p>

            <form 
                className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
                noValidate
                onSubmit={handleSubmit(registerPatient)}
            >
                <div className="mb-5">
                    <label htmlFor="name" className="text-sm uppercase font-bold">
                        Paciente 
                    </label>
                    <input  
                        id="name"
                        className={errors.name ? 'border-l-8 border-l-red-500  p-3 border w-full border-gray-100' : 'w-full p-3  border border-gray-100'}  
                        type="text" 
                        placeholder="Nombre del Paciente"
                        {...register('name', {
                            required: 'El nombre del paciente es obligatorio'
                        })}
                    />

                    {errors.name && (
                        <Error>{errors.name?.message}</Error>
                    )}
                </div>

                <div className="mb-5">
                    <label htmlFor="caretaker" className="text-sm uppercase font-bold">
                        Propietario 
                    </label>
                    <input  
                        id="caretaker"
                        className={errors.caretaker ? 'border-l-8 border-l-red-500  p-3 border w-full border-gray-100' : 'w-full p-3  border border-gray-100'}
                        type="text" 
                        placeholder="Nombre del Propietario" 
                        {...register('caretaker', {
                            required: 'El Propietario del paciente es obligatorio'
                        })}
                    />

                    {errors.caretaker && (
                        <Error>{errors.caretaker?.message}</Error>
                    )}
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="text-sm uppercase font-bold">
                        Email 
                    </label>
                    <input  
                        id="email"
                        className={errors.email ? 'border-l-8 border-l-red-500  p-3 border w-full border-gray-100' : 'w-full p-3  border border-gray-100'}  
                        type="email" 
                        placeholder="Email de Registro"
                        {...register("email", {
                            required: "El Email es Obligatorio",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Email No Válido'
                            }
                        })} 
                    />

                    {errors.email && (
                        <Error>{errors.email?.message}</Error>
                    )}
                </div>

                <div className="mb-5">
                    <label htmlFor="date" className="text-sm uppercase font-bold">
                        Fecha Alta 
                    </label>
                    <input  
                        id="date"
                        className={errors.date ? 'border-l-8 border-l-red-500  p-3 border w-full border-gray-100' : 'w-full p-3  border border-gray-100'}  
                        type="date" 
                        {...register('date', {
                            required: 'La fecha de alta es obligatoria'
                        })}
                    />

                    {errors.date && (
                        <Error>{errors.date?.message}</Error>
                    )}
                </div>
                
                <div className="mb-5">
                    <label htmlFor="symptoms" className="text-sm uppercase font-bold">
                        Síntomas 
                    </label>
                    <textarea  
                        id="symptoms"
                        className={errors.symptoms ? 'border-l-8 border-l-red-500  p-3 border w-full border-gray-100' : 'w-full p-3  border border-gray-100'}  
                        placeholder="Síntomas del paciente" 
                        {...register('symptoms', {
                            required: 'Los síntomas son obligatorios'
                        })}
                    ></textarea>

                    {errors.symptoms && (
                        <Error>{errors.symptoms?.message?.toString()}</Error>
                    )}
                </div>

                <input
                    type="submit"
                    className="bg-blue-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                    value='Guardar Paciente'
                />
            </form> 
        </div>
    )
}