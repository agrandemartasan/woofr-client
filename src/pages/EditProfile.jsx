import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text
} from "@chakra-ui/react";
import { ArrowDownIcon } from "@chakra-ui/icons";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUser, updateUser, uploadImage } from "../api";
import Nav from "../components/Nav";
import { UserContext } from "../context/user.context";
import parishList from "../utils/parish.json";

function EditProfile() {
  const { loggedUser } = useContext(UserContext);
  // TO DO: look into form management solution and/or reducer
  //   const [userFormData, setUserFormData] = useState();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  //   const [birthday, setBirthday] = useState();
  const [gender, setGender] = useState("");
  const [breed, setBreed] = useState("");
  const [isNeuteredOrSpayed, setIsNeuteredOrSpayed] = useState(false);
  const [isVaccinated, setIsVaccinated] = useState(false);
  const [isTrained, setIsTrained] = useState(false);
  const [size, setSize] = useState("");

  const navigate = useNavigate();

  function handleImageSelect(event) {
    setImage(event.target.files[0]);
  }

  //   function handleBirthdayChange(event) {
  //     setBirthday(event.target.value);
  //   }

  useEffect(() => {
    async function handleGetUserDetails() {
      const response = await getUser(loggedUser._id);
      setUsername(response.data.username);
      setEmail(response.data.email);
      setPassword(response.data.password);
      setImage(response.data.profilePicture);
      setLocation(response.data.info.locationByParish);
      setBio(response.data.info.bio);
      //   setBirthday(response.data.info.birthday);
      setGender(response.data.info.gender);
      setBreed(response.data.info.breed);
      setIsNeuteredOrSpayed(response.data.info.isNeuteredOrSpayed);
      setIsVaccinated(response.data.info.isVaccinated);
      setIsTrained(response.data.info.isTrained);
      setSize(response.data.info.size);
    }

    if (loggedUser) {
      handleGetUserDetails();
    }
  }, [loggedUser]);

  useEffect(() => {
    console.log(username, email, location);
  }, [username, email, location]);

  async function handleSubmitForm(event) {
    event.preventDefault();

    const uploadData = new FormData();
    uploadData.append("filename", image);

    const response = await uploadImage(uploadData);
    console.log("response from the backend with image url", response.data);

    await updateUser(loggedUser._id, {
      username,
      email,
      password,
      profilePicture: response.data.fileUrl,
      locationByParish: location,
      bio,
      //   birthday,
      gender,
      breed,
      isNeuteredOrSpayed,
      isVaccinated,
      isTrained,
      size
    });

    toast.success("Profile successfully edited!");
    navigate("/profile");
  }

  return (
    <div>
      <Nav />
      <Box>
        <Text>Edit Your Profile Here</Text>
        <br />
        <Flex maxW={"40%"} wrap={"wrap"}>
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>

          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <FormControl id="image">
            <FormLabel>Profile Picture</FormLabel>
            <Input type="file" name="image" onChange={handleImageSelect} />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="location">Location</FormLabel>
            <Select
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

          <FormControl id="bio">
            <FormLabel>Bio</FormLabel>
            <Input
              type="text"
              name="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </FormControl>

          {/* <label htmlFor="birthday">Birthday</label>
          <input
            type="date"
            id="birthday"
            name="birthday"
            value={birthday}
            onChange={handleBirthdayChange}
          /> */}

          <FormControl id="gender">
            <FormLabel>Gender</FormLabel>
            <Select
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option>Unspecified</option>
              <option>Female</option>
              <option>Male</option>
            </Select>
          </FormControl>

          <FormControl id="breed">
            <FormLabel>Breed</FormLabel>
            <Input
              type="text"
              name="breed"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
            />
          </FormControl>

          <FormControl id="isNeuteredOrSpayed">
            <FormLabel>Is the Dog Neutered/Spayed?</FormLabel>
            <Checkbox
              checked={isNeuteredOrSpayed}
              onChange={(e) => setIsNeuteredOrSpayed(e.target.checked)}
            />
          </FormControl>

          <FormControl id="isVaccinated">
            <FormLabel>Is the Dog Vaccinated?</FormLabel>
            <Checkbox
              checked={isVaccinated}
              onChange={(e) => setIsVaccinated(e.target.checked)}
            />
          </FormControl>

          <FormControl id="isTrained">
            <FormLabel>Is the Dog Trained?</FormLabel>
            <Checkbox
              checked={isTrained}
              onChange={(e) => setIsTrained(e.target.checked)}
            />
          </FormControl>

          <FormControl id="size">
            <FormLabel>Size</FormLabel>
            <Select
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
        </Flex>
      </Box>
    </div>
  );
}

export default EditProfile;
