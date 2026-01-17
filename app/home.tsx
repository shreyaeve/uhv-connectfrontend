import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { API_URL } from "../config";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const loadProfile = async () => {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        router.replace("/login");
        return;
      }

      const res = await fetch(`${API_URL}/api/volunteers/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setUser(data.profile);
    };

    loadProfile();
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setUser(null);
    router.replace("/login");
  };

  if (!user)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 18, color: "#666" }}>Loading...</Text>
      </View>
    );

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#f8fafc",
      }}
    >
      {/* Header */}
      <View
        style={{
          backgroundColor: "#1e40af",
          padding: 24,
          paddingTop: 32,
          paddingBottom: 32,
        }}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: "700",
            color: "white",
            marginBottom: 8,
          }}
        >
          Welcome back, {user.fullName}!
        </Text>
        <Text style={{ fontSize: 14, color: "#e0e7ff", opacity: 0.9 }}>
          {user.email}
        </Text>
      </View>

      {/* Main Content */}
      <View style={{ padding: 20 }}>
        {/* Profile Card */}
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 12,
            padding: 20,
            marginBottom: 20,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "#1e293b",
              marginBottom: 16,
            }}
          >
            Your Profile
          </Text>

          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/volunteer/[id]",
                params: { id: user._id },
              })
            }
            style={{
              backgroundColor: "#dbeafe",
              padding: 14,
              borderRadius: 8,
              marginBottom: 12,
              borderLeftWidth: 4,
              borderLeftColor: "#0284c7",
            }}
          >
            <Text
              style={{
                color: "#0369a1",
                textAlign: "center",
                fontSize: 14,
                fontWeight: "600",
              }}
            >
              👁️ View My Public Profile
            </Text>
          </TouchableOpacity>

          <Link href="/edit-profile" asChild>
            <TouchableOpacity
              style={{
                backgroundColor: "#f0fdf4",
                padding: 14,
                borderRadius: 8,
                borderLeftWidth: 4,
                borderLeftColor: "#16a34a",
              }}
            >
              <Text
                style={{
                  color: "#15803d",
                  textAlign: "center",
                  fontSize: 14,
                  fontWeight: "600",
                }}
              >
                ✏️ Edit Profile
              </Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Navigation Card */}
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 12,
            padding: 20,
            marginBottom: 20,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "#1e293b",
              marginBottom: 16,
            }}
          >
            Explore
          </Text>

          <Link href="/feed" asChild>
            <TouchableOpacity
              style={{
                backgroundColor: "#fef3c7",
                padding: 14,
                borderRadius: 8,
                borderLeftWidth: 4,
                borderLeftColor: "#f59e0b",
              }}
            >
              <Text
                style={{
                  color: "#92400e",
                  textAlign: "center",
                  fontSize: 14,
                  fontWeight: "600",
                }}
              >
                📰 View Feed
              </Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Logout Section */}
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 12,
            padding: 20,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <TouchableOpacity
            onPress={logout}
            style={{
              backgroundColor: "#fee2e2",
              padding: 14,
              borderRadius: 8,
              borderLeftWidth: 4,
              borderLeftColor: "#ef4444",
            }}
          >
            <Text
              style={{
                color: "#b91c1c",
                textAlign: "center",
                fontSize: 14,
                fontWeight: "600",
              }}
            >
              🚪 Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
}
