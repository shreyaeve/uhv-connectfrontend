import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { API_URL } from "../config";

const API = "https://uhv-connectbackend1.onrender.com/";

export default function Register() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName,
        email,
        password,
        experienceLevel: "Entry",
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Registration failed");
      return;
    }

    alert("Registered successfully");
    router.replace("/login");
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      {/* Header */}
      <View style={{ backgroundColor: "#1e40af", padding: 32, paddingBottom: 40 }}>
        <Text style={{ fontSize: 28, fontWeight: "700", color: "white", marginBottom: 8 }}>
          Join Our Community
        </Text>
        <Text style={{ fontSize: 14, color: "#e0e7ff", opacity: 0.9 }}>
          Create your account to get started
        </Text>
      </View>

      {/* Registration Form */}
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
            Full Name
          </Text>
          <TextInput
            placeholder="John Doe"
            value={fullName}
            onChangeText={setFullName}
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
            onPress={register}
            style={{
              backgroundColor: "#1e40af",
              padding: 14,
              borderRadius: 8,
              marginBottom: 12,
            }}
          >
            <Text style={{ color: "white", textAlign: "center", fontSize: 14, fontWeight: "600" }}>
              Create Account
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 20, alignItems: "center" }}>
          <Text style={{ color: "#64748b", fontSize: 14, marginBottom: 12 }}>
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text style={{ color: "#1e40af", fontSize: 14, fontWeight: "600" }}>
              Sign in instead →
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
