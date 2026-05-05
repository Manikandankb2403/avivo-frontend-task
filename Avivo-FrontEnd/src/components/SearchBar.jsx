import { Input } from "@chakra-ui/react";

const SearchBar = ({ setSearch }) => {
  return (
    <Input
      placeholder="Search by name, company, role, country..."
      mb={4}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

export default SearchBar;