import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useRegisterNewUserMutation } from "../../services/auth.service";

function Register() {
  const navigate = useNavigate();
  const [registerNewUser, { data, error }] = useRegisterNewUserMutation();
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await registerNewUser({ name, email, password }).unwrap();
      navigate("/login", { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-gray-300 flex items-center justify-center p-4">
      <div className="max-w-lg ">
        <div className="bg-zinc-800 w-full rounded-lg p-8 mb-8">
          <div className="flex flex-col items-center gap-1 mb-8">
            <h1 className="text-xl text-white">Register</h1>
            <p>
              {error
                ? "data" in error
                  ? "Rellene todos los campos"
                  : "no data"
                : ""}
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="relative">
              <input
                onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
                  setName(target.value)
                }
                type="name"
                className="bg-zinc-800 w-full border border-neutral-700 py-2 px-10 rounded-md outline-none"
                placeholder="Name"
                required={true}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 absolute left-2 top-[50%] -translate-y-[50%] text-gray-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15A2.25 2.25 0 002 6.75m19.5 0V21"
                />
              </svg>
            </div>
            <div className="relative">
              <input
                onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
                  setEmail(target.value)
                }
                type="email"
                className="bg-zinc-800 w-full border border-neutral-700 py-2 px-10 rounded-md outline-none"
                placeholder="Email"
                required={true}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 absolute left-2 top-[50%] -translate-y-[50%] text-gray-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </div>
            <div className="relative">
              <input
                onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
                  setPassword(target.value)
                }
                type="password"
                className="bg-zinc-800  w-full border border-neutral-700  py-2 px-10 rounded-md outline-none"
                placeholder="Password"
                required={true}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 absolute left-2 top-[50%] -translate-y-[50%] text-gray-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-emerald-500 text-white  py-2 px-4 rounded-md hover:bg-emerald-600  transition-colors"
              >
                {"Save"}
              </button>
            </div>
          </form>
        </div>
        <span className="flex items-center justify-center gap-2 text-[#d1d5db]">
          <Link className="text-blue-500" to={"/login"}>
            Sing In
          </Link>
        </span>
      </div>
    </div>
  );
}

export default Register;
