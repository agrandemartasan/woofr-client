import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack
} from "@chakra-ui/react";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api";
import { UserContext } from "../context/user.context";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { authenticateUser } = useContext(UserContext);

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  async function handleSubmitForm(event) {
    event.preventDefault();
    try {
      const response = await login({ username, password });
      console.log(response);
      localStorage.setItem("authToken", response.data);
      // Setting the logged user in the context
      authenticateUser();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <VStack spacing="5px">
      <FormControl id="username" isRequired>
        <FormLabel>Username</FormLabel>
        <Input
          type="text"
          placeholder="Enter Your Username"
          value={username}
          onChange={handleUsernameChange}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Your Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <InputRightElement w="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleShowPassword}>
              {showPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="yellow"
        w="100%"
        style={{ marginTop: 15 }}
        type="submit"
        onClick={handleSubmitForm}
      >
        Login
      </Button>

      <p>Don't have an account?</p>
      <Link to="/signup">Sign Up</Link>
    </VStack>
  );
}

export default Login;
