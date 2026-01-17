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
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("volunteer");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("Entry");
  const [skills, setSkills] = useState("");
  const [interests, setInterests] = useState("");
  const [availability, setAvailability] = useState("");

  const register = async () => {
    // Validate required fields
    if (!fullName.trim()) {
      alert("Full name is required");
      return;
    }
    if (!email.trim()) {
      alert("Email is required");
      return;
    }
    if (!password.trim()) {
      alert("Password is required");
      return;
    }
    if (!phone.trim()) {
      alert("Contact number is required");
      return;
    }

    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName,
        email,
        password,
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

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Registration failed");
      return;
    }

    alert("✅ Registration submitted!\n\nYour application has been sent to our admin team for review. You'll be able to log in after approval.");
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
        {/* Notice Banner */}
        <View
          style={{
            backgroundColor: "#fef3c7",
            borderRadius: 12,
            padding: 16,
            marginBottom: 20,
            borderLeftWidth: 4,
            borderLeftColor: "#f59e0b",
          }}
        >
          <Text style={{ fontSize: 13, fontWeight: "600", color: "#92400e", marginBottom: 4 }}>
            ℹ️ Approval Required
          </Text>
          <Text style={{ fontSize: 12, color: "#b45309", lineHeight: 18 }}>
            Your registration will be reviewed by our admin team. You'll be able to log in after approval.
          </Text>
        </View>

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
              marginBottom: 20,
              fontSize: 14,
            }}
          />

          <Text style={{ fontSize: 14, fontWeight: "600", color: "#1e293b", marginBottom: 12 }}>
            Contact Number *
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
              marginBottom: 20,
              fontSize: 14,
            }}
          />

          <Text style={{ fontSize: 14, fontWeight: "600", color: "#1e293b", marginBottom: 12 }}>
            Role *
          </Text>
          <View style={{ flexDirection: "row", marginBottom: 20, gap: 10 }}>
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
              marginBottom: 20,
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
              marginBottom: 20,
              fontSize: 14,
              minHeight: 80,
            }}
          />

          <Text style={{ fontSize: 14, fontWeight: "600", color: "#1e293b", marginBottom: 12 }}>
            Experience Level
          </Text>
          <View style={{ flexDirection: "row", marginBottom: 20, gap: 10 }}>
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
              marginBottom: 20,
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
              marginBottom: 20,
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
