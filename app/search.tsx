import { router } from "expo-router";
import { useState } from "react";
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

import { API_URL } from "../config";

interface User {
  _id: string;
  fullName: string;
  email: string;
}

export default function SearchUsers() {
  const [q, setQ] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [searched, setSearched] = useState(false);

  const search = async () => {
    if (!q.trim()) return;
    setSearched(true);
    const res = await fetch(`${API_URL}/api/volunteers/search?q=${q}`);
    const data = await res.json();
    setUsers(data.users);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      {/* Header */}
      <View style={{ backgroundColor: "#1e40af", padding: 24, paddingBottom: 32 }}>
        <Text style={{ fontSize: 28, fontWeight: "700", color: "white", marginBottom: 8 }}>
          Find Volunteers
        </Text>
        <Text style={{ fontSize: 14, color: "#e0e7ff" }}>
          Search and connect with volunteers
        </Text>
      </View>

      {/* Search Bar */}
      <View style={{ padding: 20 }}>
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 12,
            padding: 16,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
            marginBottom: 20,
          }}
        >
          <TextInput
            placeholder="Search by name or email…"
            value={q}
            onChangeText={setQ}
            style={{
              borderWidth: 1,
              borderColor: "#e2e8f0",
              padding: 12,
              borderRadius: 8,
              marginBottom: 12,
              fontSize: 14,
            }}
          />

          <TouchableOpacity
            onPress={search}
            style={{
              backgroundColor: "#1e40af",
              padding: 12,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: "white", textAlign: "center", fontSize: 14, fontWeight: "600" }}>
              🔍 Search
            </Text>
          </TouchableOpacity>
        </View>

        {/* Results */}
        {searched ? (
          users.length > 0 ? (
            <View>
              <Text style={{ fontSize: 12, fontWeight: "600", color: "#94a3b8", marginBottom: 12 }}>
                Found {users.length} result{users.length !== 1 ? "s" : ""}
              </Text>
              {users.map((item) => (
                <TouchableOpacity
                  key={item._id}
                  onPress={() =>
                    router.push({
                      pathname: "/volunteer/[id]",
                      params: { id: item._id },
                    })
                  }
                  style={{
                    backgroundColor: "white",
                    borderRadius: 12,
                    padding: 16,
                    marginBottom: 12,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 2,
                    borderLeftWidth: 4,
                    borderLeftColor: "#0284c7",
                  }}
                >
                  <Text style={{ fontSize: 14, fontWeight: "700", color: "#1e293b" }}>
                    {item.fullName}
                  </Text>
                  <Text style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>
                    {item.email}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View style={{ alignItems: "center", paddingVertical: 40 }}>
              <Text style={{ fontSize: 16, color: "#94a3b8", marginBottom: 8 }}>
                No volunteers found
              </Text>
              <Text style={{ fontSize: 12, color: "#cbd5e1" }}>
                Try a different search term
              </Text>
            </View>
          )
        ) : (
          <View style={{ alignItems: "center", paddingVertical: 60 }}>
            <Text style={{ fontSize: 32, marginBottom: 12 }}>🔎</Text>
            <Text style={{ fontSize: 16, color: "#94a3b8", marginBottom: 8 }}>
              Start searching
            </Text>
            <Text style={{ fontSize: 12, color: "#cbd5e1", textAlign: "center" }}>
              Enter a name or email to find volunteers
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
