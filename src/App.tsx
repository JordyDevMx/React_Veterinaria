import { ToastContainer } from "react-toastify" // Alertas - npm i react-toastify
import PatientsForm from "./components/PatientsForm"
import PatientsList from "./components/PatientsList"
import "react-toastify/dist/ReactToastify.css"

function App() {
  const currentYear = new Date().getFullYear();

  return (
    <>
    
      <header className="flex justify-center items-center py-4 px-4">
        <img className="w-70" src="/logo.svg" alt="Logo" />
      </header>

      <div className="container mx-auto mt-20">
        <h1 className="text-5xl font-black text-center md:w-2/3 md:mx-auto">
          Seguimiento de pacientes{' '}
          <span className="text-red-600">
            Veterinaria
          </span>
        </h1>

        <div className="mt-12 md:flex">
          <PatientsForm/>
          <PatientsList/>
        </div>
        
      </div>

      <ToastContainer/>

      <footer className="bg-red-600 p-4 text-center mt-16">
        <p className="text-2xl text-white">&copy; {currentYear} <a className="font-black" href="https://jordydev.website/" target="blank" rel="noopener noreferrer">JordyDev</a> | Todos los derechos reservados</p>
      </footer>
    </>
  )
}

export default App
