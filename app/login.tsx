import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { API_URL } from "../config";

const API = "http://localhost:5000/api";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Login failed");
      return;
    }

    await AsyncStorage.setItem("token", data.token);
    alert("Login successful");
    router.replace("/home");
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      {/* Header */}
      <View style={{ backgroundColor: "#1e40af", padding: 32, paddingBottom: 40 }}>
        <Text style={{ fontSize: 28, fontWeight: "700", color: "white", marginBottom: 8 }}>
          Welcome Back
        </Text>
        <Text style={{ fontSize: 14, color: "#e0e7ff", opacity: 0.9 }}>
          Sign in to your account
        </Text>
      </View>

      {/* Login Form */}
      <View style={{ padding: 20 }}>
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 12,
            padding: 24,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: "600", color: "#1e293b", marginBottom: 12 }}>
            Email Address
          </Text>
          <TextInput
            placeholder="you@example.com"
            value={email}
            onChangeText={setEmail}
            style={{
              borderWidth: 1,
              borderColor: "#e2e8f0",
              padding: 12,
              borderRadius: 8,
              marginBottom: 20,
              fontSize: 14,
            }}
          />

          <Text style={{ fontSize: 14, fontWeight: "600", color: "#1e293b", marginBottom: 12 }}>
            Password
          </Text>
          <TextInput
            placeholder="••••••••"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={{
              borderWidth: 1,
              borderColor: "#e2e8f0",
              padding: 12,
              borderRadius: 8,
              marginBottom: 24,
              fontSize: 14,
            }}
          />

          <TouchableOpacity
            onPress={login}
            style={{
              backgroundColor: "#1e40af",
              padding: 14,
              borderRadius: 8,
              marginBottom: 12,
            }}
          >
            <Text style={{ color: "white", textAlign: "center", fontSize: 14, fontWeight: "600" }}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 20, alignItems: "center" }}>
          <Text style={{ color: "#64748b", fontSize: 14, marginBottom: 12 }}>
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => router.push("/register")}>
            <Text style={{ color: "#1e40af", fontSize: 14, fontWeight: "600" }}>
              Create one now →
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
