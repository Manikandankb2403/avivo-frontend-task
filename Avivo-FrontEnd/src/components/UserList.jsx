import UserCard from "./UserCard";
import { VStack } from "@chakra-ui/react";

const UserList = ({ users, onDelete }) => {
  return (
    <VStack spacing={4} mt={4}>
      {users.map((user) => (
        <UserCard key={user.id} user={user} onDelete={onDelete} />
      ))}
    </VStack>
  );
};

export default UserList;