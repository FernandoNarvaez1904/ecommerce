import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";
import { Text, View, TouchableOpacity } from "react-native";

import SignInForm from "../components/auth/SignInForm";
import SignUpForm from "../components/auth/SignUpForm";
import { useState } from "react";

function ProfileScreen() {
  const { signOut } = useAuth();
  const [needsNewAccount, setNeedsNewAccount] = useState(false);

  return (
    <View className="h-full justify-center px-10">
      <SignedOut>
        <View className="rounded  border border-gray-100 bg-white p-5 shadow">
          {needsNewAccount ? <SignUpForm /> : <SignInForm />}

          <TouchableOpacity
            className="mt-2.5"
            onPress={() => setNeedsNewAccount((prev) => !prev)}
          >
            <Text className="self-center font-normal text-gray-500">
              {needsNewAccount
                ? "No Account? Sign Up"
                : "Have an Account? Sign In"}
            </Text>
          </TouchableOpacity>
        </View>
      </SignedOut>
      <SignedIn>
        <TouchableOpacity onPress={() => signOut()}>
          <Text>Sign Out</Text>
        </TouchableOpacity>
      </SignedIn>
    </View>
  );
}

export default ProfileScreen;
