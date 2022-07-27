import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Camera, CameraType } from "expo-camera";

const CreateScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePhoto = async () => {
    if (!camera) return;
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
  };

  const switchCamera = () => {
    setType(type === CameraType.back ? CameraType.front : CameraType.back);
  };

  const sendPhoto = () => {
    navigation.navigate("Posts", { photo });
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCamera} type={type}>
        {photo && (
          <View style={styles.takePhotoContainer}>
            <Image
              source={{ uri: photo }}
              style={{ width: 200, height: 200 }}
            />
          </View>
        )}
        <TouchableOpacity
          onPress={switchCamera}
          activeOpacity={0.8}
          style={styles.buttonContainer}
        >
          <Text style={styles.flip}> Flip </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={takePhoto}
          activeOpacity={0.8}
          style={styles.buttonContainer}
        >
          <Text style={styles.capture}>Capture</Text>
        </TouchableOpacity>
      </Camera>
      <View>
        <TouchableOpacity
          onPress={sendPhoto}
          activeOpacity={0.8}
          style={styles.sendBtn}
        >
          <Text style={styles.send}> SEND </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    // flex: 1,
    height: "70%",
    marginTop: "10%",
    marginHorizontal: "5%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  capture: {
    color: "#fff",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 50,
    width: 70,
    height: 30,
  },
  flip: {
    color: "#fff",
  },
  takePhotoContainer: {
    position: "absolute",
    top: 50,
    left: 10,
    borderColor: "fff",
    borderWidth: 1,
  },
  sendBtn: {
    marginHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    borderWidth: 2,
    borderColor: "#20b2aa",
    borderRadius: 10,
    height: 40,
  },
  send: {
    color: "#20b2aa",
    fontSize: 20,
  },
});

export default CreateScreen;
