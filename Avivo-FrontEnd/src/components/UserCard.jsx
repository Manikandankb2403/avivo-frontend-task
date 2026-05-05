import { Box, Text, Button } from "@chakra-ui/react";

const UserCard = ({ user, onDelete }) => {
  return (
    <Box p={4} shadow="md" borderWidth="1px" width="100%">
      <Text fontWeight="bold">
        {user.firstName} {user.lastName}
      </Text>
      <Text>Company: {user.company?.name}</Text>
      <Text>Role: {user.role}</Text>
      <Text>Country: {user.address?.country}</Text>

      <Button
        mt={2}
        colorScheme="red"
        size="sm"
        onClick={() => onDelete(user.id)}
      >
        Delete
      </Button>
    </Box>
  );
};

export default UserCard;