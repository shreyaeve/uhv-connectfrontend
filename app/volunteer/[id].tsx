import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

import { API_URL } from "../../config";

interface User {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  approved: boolean;
}

export default function VolunteerProfile() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const loadUser = async () => {
      try {
        const res = await fetch(`${API_URL}/api/volunteers/${id}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to load profile");
        }

        setUser(data.user);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f8fafc" }}>
        <ActivityIndicator size="large" color="#1e40af" />
      </View>
    );
  }

  if (error || !user) {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
        <View style={{ padding: 20, justifyContent: "center", alignItems: "center", minHeight: "100%" }}>
          <Text style={{ fontSize: 48, marginBottom: 16 }}>⚠️</Text>
          <Text style={{ color: "#ef4444", fontSize: 16, fontWeight: "600" }}>
            {error || "User not found"}
          </Text>
        </View>
      </ScrollView>
    );
  }

  const getStatusColor = (approved: boolean) => {
    return approved ? { bg: "#dcfce7", text: "#166534", border: "#22c55e" } : { bg: "#fef3c7", text: "#92400e", border: "#f59e0b" };
  };

  const statusColors = getStatusColor(user.approved);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      {/* Header */}
      <View style={{ backgroundColor: "#1e40af", padding: 24, paddingBottom: 40 }}>
        <Text style={{ fontSize: 28, fontWeight: "700", color: "white", marginBottom: 8 }}>
          {user.fullName}
        </Text>
        <Text style={{ fontSize: 14, color: "#e0e7ff" }}>
          Volunteer Profile
        </Text>
      </View>

      {/* Profile Info */}
      <View style={{ padding: 20 }}>
        {/* Contact Card */}
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 12,
            padding: 20,
            marginBottom: 16,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <Text style={{ fontSize: 12, fontWeight: "600", color: "#94a3b8", marginBottom: 4 }}>
            EMAIL ADDRESS
          </Text>
          <Text style={{ fontSize: 16, color: "#1e293b", marginBottom: 16 }}>
            {user.email}
          </Text>

          <Text style={{ fontSize: 12, fontWeight: "600", color: "#94a3b8", marginBottom: 4 }}>
            ROLE
          </Text>
          <Text style={{ fontSize: 16, color: "#1e293b", marginBottom: 16, textTransform: "capitalize" }}>
            {user.role}
          </Text>

          <Text style={{ fontSize: 12, fontWeight: "600", color: "#94a3b8", marginBottom: 4 }}>
            STATUS
          </Text>
          <View
            style={{
              backgroundColor: statusColors.bg,
              borderLeftWidth: 4,
              borderLeftColor: statusColors.border,
              padding: 12,
              borderRadius: 6,
            }}
          >
            <Text style={{ color: statusColors.text, fontSize: 14, fontWeight: "600" }}>
              {user.approved ? "✅ Approved" : "⏳ Pending Review"}
            </Text>
          </View>
        </View>
      </View>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
}
