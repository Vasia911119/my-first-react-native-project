import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Camera, CameraType } from "expo-camera";

const CreateScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState("#");

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
    // if (!camera) return;
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
  };

  const switchCamera = () => {
    setType(type === CameraType.back ? CameraType.front : CameraType.back);
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
          style={styles.captureContainer}
        >
          <Text style={styles.flip}> Flip </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={takePhoto}
          activeOpacity={0.8}
          style={styles.captureContainer}
        >
          <Text style={styles.capture}>Capture</Text>
        </TouchableOpacity>
      </Camera>
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
  captureContainer: {
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
});

export default CreateScreen;
