import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

import { API_URL } from "../config";

export default function EditProfile() {
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("volunteer");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("Entry");
  const [skills, setSkills] = useState("");
  const [interests, setInterests] = useState("");
  const [availability, setAvailability] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      const token = await AsyncStorage.getItem("token");

      const res = await fetch(`${API_URL}/volunteers/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      const profile = data.profile;
      setFullName(profile.fullName);
      setPhone(profile.phone || "");
      setRole(profile.role || "volunteer");
      setLocation(profile.location || "");
      setBio(profile.bio || "");
      setExperienceLevel(profile.experienceLevel || "Entry");
      setSkills(profile.skills?.join(", ") || "");
      setInterests(profile.interests?.join(", ") || "");
      setAvailability(profile.availability || "");
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
          phone,
          role,
          location,
          bio,
          experienceLevel,
          skills: skills.split(",").map((s) => s.trim()).filter((s) => s),
          interests: interests.split(",").map((i) => i.trim()).filter((i) => i),
          availability,
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
            Contact Number
          </Text>
          <TextInput
            placeholder="+1 (555) 000-0000"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
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
            Role
          </Text>
          <View style={{ flexDirection: "row", marginBottom: 24, gap: 10 }}>
            {[
              { label: "Volunteer", value: "volunteer" },
              { label: "Leader", value: "leader" },
              { label: "Core Team", value: "core-team" },
            ].map((item) => (
              <TouchableOpacity
                key={item.value}
                onPress={() => setRole(item.value)}
                style={{
                  flex: 1,
                  padding: 10,
                  borderRadius: 8,
                  borderWidth: 2,
                  borderColor: role === item.value ? "#1e40af" : "#e2e8f0",
                  backgroundColor: role === item.value ? "#dbeafe" : "white",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: role === item.value ? "700" : "500",
                    color: role === item.value ? "#1e40af" : "#64748b",
                    fontSize: 12,
                  }}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

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

          <Text style={{ fontSize: 14, fontWeight: "600", color: "#1e293b", marginBottom: 12 }}>
            Phone Number (optional)
          </Text>
          <TextInput
            placeholder="+1 (555) 000-0000"
            value={phone}
            onChangeText={setPhone}
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
            Location (optional)
          </Text>
          <TextInput
            placeholder="City, State"
            value={location}
            onChangeText={setLocation}
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
            Bio (optional)
          </Text>
          <TextInput
            placeholder="Tell us about yourself..."
            value={bio}
            onChangeText={setBio}
            multiline
            style={{
              borderWidth: 1,
              borderColor: "#e2e8f0",
              padding: 12,
              borderRadius: 8,
              marginBottom: 24,
              fontSize: 14,
              minHeight: 80,
            }}
          />

          <Text style={{ fontSize: 14, fontWeight: "600", color: "#1e293b", marginBottom: 12 }}>
            Experience Level
          </Text>
          <View style={{ flexDirection: "row", marginBottom: 24, gap: 10 }}>
            {["Entry", "Intermediate", "Advanced"].map((level) => (
              <TouchableOpacity
                key={level}
                onPress={() => setExperienceLevel(level)}
                style={{
                  flex: 1,
                  padding: 10,
                  borderRadius: 8,
                  borderWidth: 2,
                  borderColor: experienceLevel === level ? "#1e40af" : "#e2e8f0",
                  backgroundColor: experienceLevel === level ? "#dbeafe" : "white",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: experienceLevel === level ? "700" : "500",
                    color: experienceLevel === level ? "#1e40af" : "#64748b",
                  }}
                >
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={{ fontSize: 14, fontWeight: "600", color: "#1e293b", marginBottom: 12 }}>
            Skills (comma-separated, optional)
          </Text>
          <TextInput
            placeholder="React, Node.js, AWS, etc."
            value={skills}
            onChangeText={setSkills}
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
            Interests (comma-separated, optional)
          </Text>
          <TextInput
            placeholder="Teaching, Mentoring, Development, etc."
            value={interests}
            onChangeText={setInterests}
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
            Availability (optional)
          </Text>
          <TextInput
            placeholder="e.g., Weekends, 2 hours per week"
            value={availability}
            onChangeText={setAvailability}
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
