function Login() {
  return (
    <div className="mx-auto w-4/12">
      <section id="input">
        <div className="flex flex-col items-center">
          <label htmlFor="email" className="text-xl font-bold">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 rounded bg-gray-50 border-2 m-2"
          />
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="password" className="text-xl font-bold">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-2 rounded bg-gray-50 border-2 m-2"
          />
        </div>
        <div className="flex flex-col items-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5">
            Sign In
          </button>
        </div>
      </section>
    </div>
  )
}
export default Login
