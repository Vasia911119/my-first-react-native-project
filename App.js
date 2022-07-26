import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import useRoute from "./router";

import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

const loadApplication = async () => {
  await Font.loadAsync({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });
};

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const routing = useRoute(true);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return <NavigationContainer>{routing}</NavigationContainer>;
}
