import { Flip, toast } from "react-toastify"
import { usePatientStore } from "../store"
import { Patient } from "../types"
import PatientDetailItem from "./PatientDetailItem"

type PatientDetailsProps = {
    patient: Patient
}

export default function PatientDetails({patient} : PatientDetailsProps) {

    const deletePatient = usePatientStore((state) => state.deletePatient)
    const getPatientById = usePatientStore((state) => state.getPatientById)

    const handleClick = () => {
        deletePatient(patient.id)
        
        // Alerta
        toast('Paciente Eliminado Correctamente', {
            type: 'error',
            transition: Flip,
        });
    }

    return (
        <div className="mx-5 my-10 px-5 py-8 bg-white shadow-md rounded-xl">
            <PatientDetailItem
                label="ID"
                data={patient.id}
            />

            <PatientDetailItem
                label="Nombre"
                data={patient.name}
            />

            <PatientDetailItem
                label="Propietario"
                data={patient.caretaker}
            />

            <PatientDetailItem
                label="Email del Propietario"
                data={patient.email}
            />

            <PatientDetailItem
                label="Fecha de Alta"
                data={patient.date.toString()}
            />

            <PatientDetailItem
                label="Sintomas"
                data={patient.symptoms}
            />

            <div className="flex flex-col lg:flex-row gap-3 justify-between mt-10">
                <button 
                    type="button"
                    className="py-2 px-10 bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase rounded-lg"
                    onClick={() => getPatientById(patient.id)}
                >Editar
                </button>

                <button 
                    type="button"
                    className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg"
                    onClick={handleClick}
                >Eliminar
                </button>
            </div>
        </div>
    )
}
