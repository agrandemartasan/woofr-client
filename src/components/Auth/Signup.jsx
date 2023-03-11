import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  VStack
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../api";
import { UserContext } from "../../context/user.context";
import parishList from "../../utils/parish.json";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();
  const { authenticateUser } = useContext(UserContext);

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleConfirmPasswordChange(event) {
    setConfirmPassword(event.target.value);
  }

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  function handleShowConfirmPassword() {
    setShowConfirmPassword(!showConfirmPassword);
  }

  function handleParishChange(event) {
    setLocation(event.target.value);
  }

  async function handleSubmitForm(event) {
    event.preventDefault();
    try {
      const response = await signup({ username, email, password, location });
      if (response.data.message !== "Success") {
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setLocation("");
      } else {
        localStorage.setItem("authToken", response.data.authToken);
        await authenticateUser();
        navigate("/account");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <VStack spacing="5px">
      <FormControl id="username" isRequired>
        <FormLabel>Your Dog's Name (this will be your username!)</FormLabel>
        <Input
          type="text"
          placeholder="Enter Your Username"
          value={username}
          onChange={handleUsernameChange}
        />
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email"
          value={email}
          onChange={handleEmailChange}
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
            <Button
              h="1.75rem"
              size="sm"
              colorScheme="brand"
              onClick={handleShowPassword}
            >
              {showPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Your Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <InputRightElement w="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              colorScheme="brand"
              onClick={handleShowConfirmPassword}
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="location" isRequired>
        <FormLabel>Parish</FormLabel>
        <Select
          placeholder="Select your location by parish"
          value={location}
          onChange={handleParishChange}
        >
          {parishList.map((parish, index) => {
            return (
              <option key={index} value={parish}>
                {parish}
              </option>
            );
          })}
        </Select>
      </FormControl>

      <Button
        colorScheme="brand"
        w="100%"
        style={{ marginTop: 15 }}
        type="submit"
        onClick={handleSubmitForm}
      >
        Sign Up
      </Button>
    </VStack>
  );
}

export default Signup;
