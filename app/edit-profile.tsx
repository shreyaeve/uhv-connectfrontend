import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

import { API_URL } from "../config";

export default function EditProfile() {
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      const token = await AsyncStorage.getItem("token");

      const res = await fetch(`${API_URL}/volunteers/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setFullName(data.profile.fullName);
    };

    loadProfile();
  }, []);

  const saveProfile = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");

      const res = await fetch(`${API_URL}/api/volunteers/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fullName,
          ...(password ? { password } : {}),
        }),
      });

      if (!res.ok) throw new Error("Update failed");

      Alert.alert("Success", "Profile updated");
      router.back();
    } catch {
      Alert.alert("Error", "Could not update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      {/* Header */}
      <View style={{ backgroundColor: "#1e40af", padding: 24, paddingBottom: 32 }}>
        <Text style={{ fontSize: 28, fontWeight: "700", color: "white", marginBottom: 8 }}>
          Edit Profile
        </Text>
        <Text style={{ fontSize: 14, color: "#e0e7ff" }}>
          Update your personal information
        </Text>
      </View>

      {/* Form */}
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
            value={fullName}
            onChangeText={setFullName}
            style={{
              borderWidth: 1,
              borderColor: "#e2e8f0",
              padding: 12,
              borderRadius: 8,
              marginBottom: 24,
              fontSize: 14,
            }}
          />

          <Text style={{ fontSize: 14, fontWeight: "600", color: "#1e293b", marginBottom: 12 }}>
            New Password (optional)
          </Text>
          <TextInput
            secureTextEntry
            placeholder="Leave blank to keep current password"
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
            onPress={saveProfile}
            disabled={loading}
            style={{
              backgroundColor: "#1e40af",
              padding: 14,
              borderRadius: 8,
              marginBottom: 12,
              opacity: loading ? 0.7 : 1,
            }}
          >
            <Text style={{ color: "white", textAlign: "center", fontSize: 14, fontWeight: "600" }}>
              {loading ? "Saving..." : "💾 Save Changes"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              backgroundColor: "#f1f5f9",
              padding: 14,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: "#e2e8f0",
            }}
          >
            <Text style={{ color: "#475569", textAlign: "center", fontSize: 14, fontWeight: "600" }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
