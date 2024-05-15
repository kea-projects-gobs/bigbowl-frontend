import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../components/InputField";
import { createUserWithRole } from "../../services/api/api";

interface HttpError extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export default function CreateUserForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  //const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreateUser = async () => {
    try {
      const userData = {
        email: email,
        username: username,
        password: password,
        name: name,
        address: address,
        //repeatPassword: repeatPassword,
      };
      const response = await createUserWithRole(userData);
      console.log("Response:", response);
      navigate("/login");
    } catch (error) {
      // Directly use the backend-provided error message
      const errorMessage = (error as HttpError).response?.data?.message;
      if (errorMessage) {
        console.error("Error creating user:", errorMessage);
        setError(errorMessage);
      } else {
        // Handle the unexpected case where the error message is not provided
        console.error("An unexpected error occurred.");
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div>
      {/* <InputField
        label="Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      /> */}
      {/* <InputField
        label="Phone Number"
        type="text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      /> */}
      <InputField
        label="Brugernavn"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <InputField
        label="Adgangskode"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <InputField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField
        label="Name"
        type="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <InputField
        label="Address"
        type="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      {/* <InputField
        label="Repeat Password"
        type="password"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
      /> */}
      {error && <div className="text-red-500 mt-2">{error}</div>}
      <button
        onClick={handleCreateUser}
        className="bg-blue-500 text-white font-bold px-4 py-2 rounded-md mt-4"
      >
        Opret bruger
      </button>

      <div className="mt-2">
        Har du allerede en bruger?{" "}
        <Link to="/login" className="text-blue-500 font-bold">
          Log ind her!
        </Link>
      </div>
    </div>
  );
}
