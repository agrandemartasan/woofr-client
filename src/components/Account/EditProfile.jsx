import {
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { getUser, updateUser, uploadImage } from "../../api";
import { UserContext } from "../../context/user.context";
import parishList from "../../utils/parish.json";

function EditProfile() {
  const { loggedUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [birthday, setBirthday] = useState(
    new Date(Date.now().toString().slice(10))
  );
  const [gender, setGender] = useState("");
  const [breed, setBreed] = useState("");
  const [isNeuteredOrSpayed, setIsNeuteredOrSpayed] = useState(false);
  const [isVaccinated, setIsVaccinated] = useState(false);
  const [isTrained, setIsTrained] = useState(false);
  const [size, setSize] = useState("");
  const [currentProfilePicture, setCurrentProfilePicture] = useState("");

  function handleImageSelect(event) {
    setImage(event.target.files[0]);
  }

  useEffect(() => {
    async function handleGetUserDetails() {
      const response = await getUser(loggedUser._id);
      setUsername(response.data.username);
      setEmail(response.data.email);
      setPassword(response.data.password);
      setImage(response.data.profilePicture);
      setLocation(response.data.info.locationByParish);
      setBio(response.data.info.bio);
      setBirthday(response.data.info.birthday);
      setGender(response.data.info.gender);
      setBreed(response.data.info.breed);
      setIsNeuteredOrSpayed(response.data.info.isNeuteredOrSpayed);
      setIsVaccinated(response.data.info.isVaccinated);
      setIsTrained(response.data.info.isTrained);
      setSize(response.data.info.size);
      setCurrentProfilePicture(response.data.profilePicture);
    }

    if (loggedUser) {
      handleGetUserDetails();
    }
  }, [loggedUser]);

  async function handleSubmitForm(event) {
    event.preventDefault();

    let uploadedImage;

    if (image !== currentProfilePicture) {
      const uploadData = new FormData();
      uploadData.append("filename", image);
      uploadedImage = await uploadImage(uploadData);
    }

    await updateUser(loggedUser._id, {
      username,
      email,
      password,
      profilePicture: uploadedImage
        ? uploadedImage.data.fileUrl
        : currentProfilePicture,
      locationByParish: location,
      bio,
      birthday,
      gender,
      breed,
      isNeuteredOrSpayed,
      isVaccinated,
      isTrained,
      size
    });

    window.location.reload();
  }

  return (
    <Flex
      w={"100%"}
      minH={"fit-content"}
      bg={useColorModeValue("brand.50", "brand.600")}
      color={useColorModeValue("brand.900", "brand.50")}
      borderRadius="lg"
      borderWidth="1px"
      pb={3}
    >
      <Container maxW="100%" centerContent>
        <Box
          d="flex"
          justifyContent="center"
          p={2}
          bg="brand.300"
          w="100%"
          my={2}
          borderRadius="lg"
          borderWidth="1px"
        >
          <Text fontSize="2xl" color="brand.50" textAlign="center">
            Edit your profile
          </Text>
        </Box>
        <Flex gap={3} flexDirection={{ base: "column", md: "row" }}>
          <Box
            w="100%"
            p={4}
            borderRadius="lg"
            borderWidth="1px"
            borderColor={"brand.200"}
          >
            <FormControl id="username" pb={3}>
              <FormLabel>Username</FormLabel>
              <Input
                borderColor={"brand.200"}
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>

            <FormControl id="email" pb={3}>
              <FormLabel>Email</FormLabel>
              <Input
                borderColor={"brand.200"}
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl id="password" pb={3}>
              <FormLabel>Password</FormLabel>
              <Input
                borderColor={"brand.200"}
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <FormControl id="image" pb={3}>
              <FormLabel>Profile Picture</FormLabel>
              <Input
                borderColor={"brand.200"}
                type="file"
                name="image"
                onChange={handleImageSelect}
              />
            </FormControl>

            <FormControl id="location" pb={3}>
              <FormLabel>Location</FormLabel>
              <Select
                borderColor={"brand.200"}
                name="locationByParish"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                {parishList.map((parish) => (
                  <option key={parish} value={parish}>
                    {parish}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl id="birthday" pb={3}>
              <FormLabel>Birthday</FormLabel>
              <Input
                type="date"
                name="birthday"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </FormControl>
          </Box>

          <Box
            w="100%"
            p={4}
            borderRadius="lg"
            borderWidth="1px"
            borderColor={"brand.200"}
          >
            <FormControl id="bio" pb={3}>
              <FormLabel>Bio</FormLabel>
              <Input
                borderColor={"brand.200"}
                type="text"
                name="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </FormControl>

            <FormControl id="gender" pb={3}>
              <FormLabel>Gender</FormLabel>
              <Select
                borderColor={"brand.200"}
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option>Unspecified</option>
                <option>Female</option>
                <option>Male</option>
              </Select>
            </FormControl>

            <FormControl id="breed" pb={3}>
              <FormLabel>Breed</FormLabel>
              <Input
                borderColor={"brand.200"}
                type="text"
                name="breed"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
              />
            </FormControl>

            <Flex pb={3}>
              <FormControl id="isNeuteredOrSpayed">
                <FormLabel>Is the Dog Neutered/Spayed?</FormLabel>
                <Checkbox
                  colorScheme="brand"
                  borderColor={"brand.200"}
                  isChecked={isNeuteredOrSpayed}
                  checked={isNeuteredOrSpayed}
                  onChange={(e) => setIsNeuteredOrSpayed(e.target.checked)}
                />
              </FormControl>

              <FormControl id="isVaccinated">
                <FormLabel>Is the Dog Vaccinated?</FormLabel>
                <Checkbox
                  colorScheme="brand"
                  borderColor={"brand.200"}
                  isChecked={isVaccinated}
                  checked={isVaccinated}
                  onChange={(e) => setIsVaccinated(e.target.checked)}
                />
              </FormControl>

              <FormControl id="isTrained">
                <FormLabel>Is the Dog Trained?</FormLabel>
                <Checkbox
                  colorScheme="brand"
                  borderColor={"brand.200"}
                  isChecked={isTrained}
                  checked={isTrained}
                  onChange={(e) => setIsTrained(e.target.checked)}
                />
              </FormControl>
            </Flex>

            <FormControl id="size" pb={3}>
              <FormLabel>Size</FormLabel>
              <Select
                borderColor={"brand.200"}
                name="size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              >
                <option>Unspecified</option>
                <option>Small (Up to 14 kg)</option>
                <option>Medium (Between 14-28kg)</option>
                <option>Large (Between 28–42kg)</option>
                <option>Extra Large (Over 42kgs)</option>
              </Select>
            </FormControl>

            <Button
              colorScheme="brand"
              w="50%"
              style={{ marginTop: 15 }}
              type="submit"
              onClick={handleSubmitForm}
            >
              Save Changes
            </Button>
          </Box>
        </Flex>
      </Container>
    </Flex>
  );
}

export default EditProfile;
