import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";

const ErrorBox = ({ code }: { code: string }) => {
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    switch (code) {
      case "auth/invalid-credential":
        setErrorMsg("Your credential combination is incorrect");
        break;
      case "auth/invalid-email":
        setErrorMsg("Please input a valid email");
        break;
      case "auth/missing-password":
        setErrorMsg("Password field cannot be empty");
        break;
      case "auth/email-already-in-use":
        setErrorMsg("This user already exists");
        break;
      case "noName":
        setErrorMsg("Please provide a name");
        break;
      default:
        setErrorMsg("An error occured. Please try again")
        break;
    }
  }, [code]);

  return (
    <View style={tw`items-center`}>
      <Text style={tw`text-red-700 text-lg`}>{errorMsg}</Text>
    </View>
  );
};

export default ErrorBox;
