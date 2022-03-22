import React from "react";
const Register = () => {
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
      <div className="mb-4">
        <label
          className="block text-grey-darker text-sm font-bold mb-2"
          for="name"
        >
          Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
          id="name"
          type="text"
          placeholder="Name"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-grey-darker text-sm font-bold mb-2"
          for="Email"
        >
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
          id="email"
          type="text"
          placeholder="Email"
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-grey-darker text-sm font-bold mb-2"
          for="password"
        >
          Password
        </label>
        <input
          className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
          id="password"
          type="password"
          placeholder="******************"
        />
        <p className="text-red text-xs italic">Please choose a password.</p>
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
          type="button"
        >
          Sign In
        </button>
        <p>Already have an account?</p>
        <a
          className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker"
          href="/components/login"
        >
          Login Here
        </a>
      </div>
    </div>
  );
};
export default Register;
