import { useEffect, useState } from "react";
import { fetchUsers } from "./services/api";
import UserList from "./components/UserList";
import SearchBar from "./components/SearchBar";
import "./App.css";
import {
  Button,
  Container,
  Heading,
  Flex,
  IconButton,
  Spacer,
} from "@chakra-ui/react";

import { FiRefreshCw, FiPlus } from "react-icons/fi";

function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  // Fetch users from API (ONLY here API is used)
  const loadUsers = async () => {
    try {
      setLoading(true);
  
      const data = await fetchUsers();
  
      // Force minimum delay for better UX 
      await new Promise((resolve) => setTimeout(resolve, 500));
  
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  //  Delete user (LOCAL ONLY)
  const handleDelete = (id) => {
    setUsers((prevUsers) =>
      prevUsers.filter((user) => user.id !== id)
    );
  };

  // ➕ Add user (LOCAL ONLY)
  const handleAddUser = () => {
    const newUser = {
      id: Date.now(),
      firstName: "Manikandan",
      lastName: "KB",
      company: { name: "Avivo AI" },
      role: "Software Developer",
      address: { country: "India" },
    };

    setUsers((prevUsers) => [newUser, ...prevUsers]);
  };

  // 🔍 Search filter
  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName} ${user.company?.name} ${user.role} ${user.address?.country}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <Container maxW="container.lg" py={6}>
      {/* Header */}
      <Heading mb={6} textAlign="center">
        👥 User Management Dashboard
      </Heading>

      {/* Search */}
      <SearchBar setSearch={setSearch} />

      {/* Actions */}
      <Flex mt={4} mb={4} align="center">
        <Heading size="md">Users</Heading>
        <Spacer />

        {/* Refresh Icon Button */}
        <IconButton
          onClick={loadUsers}
          colorScheme="blue"
          aria-label="Refresh Users"
          mr={2}
        >
          <FiRefreshCw
            style={{
              animation: loading ? "spin 1s linear infinite" : "none",
            }}
          />
        </IconButton>

        {/* Add User Button */}
        <Button
          leftIcon={<FiPlus />}
          onClick={handleAddUser}
          colorScheme="green"
        >
          Add User
        </Button>
      </Flex>

      {/* User List */}
      <UserList users={filteredUsers} onDelete={handleDelete} />
    </Container>
  );
}

export default App;