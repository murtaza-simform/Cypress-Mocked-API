import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch("https://dummyjson.com/users");
      const data = await response.json();
      setUsers(data?.users);
    } catch (error) {
      setError(error?.message);
    }
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <button onClick={() => fetchUsers()}>Get Users</button>
      <div className="card">
        {error && <p id="error">Something went wrong!</p>}

        {users && users?.length > 0 && (
          <>
            <h1>Users List</h1>
            {users.map((user) => (
              <>
                <p id="user" key={user?.id}>
                  {user?.firstName} {user?.lastName}
                </p>
              </>
            ))}
          </>
        )}
      </div>
    </>
  );
}

export default App;
