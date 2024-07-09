import { Text, View, StyleSheet, Image, TextInput, Button } from "react-native";
import { useState } from "react";
import {Entypo} from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"
import { useNavigation } from "@react-navigation/native";

const user = {
  id: "u1",
  image:
    "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg",
  name: "Vadim Savin",
};

const CreatePostScreen = () => {
  const [description, setDescription] = useState("");
  const [image, setImage]=useState(null);

  const navigation=useNavigation();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    console.log(result);
  
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  
  
  const onSubmit = () => {
    console.warn("On submit", description);
    setDescription("");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: user.image }} style={styles.ProfileImage} />
        <Text style={styles.name}>{user.name}</Text>
        <Entypo
          onPress={pickImage}
          name="images"
          size={24}
          color="limegreen"
          style={styles.icon}
        />
      </View>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="What is on your mind?"
        multiline
      />
      <Image source={{uri:image}} style={styles.image} />
      <View style={styles.buttonContainer}>
        <Button title="Post" onPress={onSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 10,
    paddingTop: 40,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  header: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  ProfileImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 10,
  },
  image:{
    width:"100%",
    aspectRatio:4/3,
  },
  name: {
    fontWeight: "500",
  },
  buttonContainer: {
    marginTop: "auto",
  },
  icon:{
    marginLeft:"auto"
  }
});

export default CreatePostScreen;
