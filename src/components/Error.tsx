export default function Error({children} : {children:React.ReactNode}) {
  return (
    <p className="my-3 text-red-600 font-bold">* {children}</p>
  )
}
