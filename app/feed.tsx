import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { API_URL } from "../config";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");

  const loadFeed = async () => {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    const res = await fetch(`${API_URL}/api/feed`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    setPosts(data.posts);
  };

  const createPost = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        alert("Not logged in");
        return;
      }

      if (!content || content.trim() === "") {
        alert("Post content is empty");
        return;
      }

      const res = await fetch(`${API_URL}/api/feed/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: content.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Create post failed:", data);
        alert(data.message || "Failed to create post");
        return;
      }

      console.log("Post created:", data);

      setContent("");
      await loadFeed();
    } catch (err) {
      console.error("Create post error:", err);
      alert("Backend not reachable");
    }
  };

  useEffect(() => {
    loadFeed();
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      {/* Header */}
      <View style={{ backgroundColor: "#1e40af", padding: 24, paddingBottom: 32 }}>
        <Text style={{ fontSize: 28, fontWeight: "700", color: "white" }}>
          Community Feed
        </Text>
        <Text style={{ fontSize: 14, color: "#e0e7ff", marginTop: 4 }}>
          Share and connect with volunteers
        </Text>
      </View>

      {/* Post Creation */}
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
            placeholder="Share something with the community…"
            value={content}
            onChangeText={setContent}
            multiline
            style={{
              borderWidth: 1,
              borderColor: "#e2e8f0",
              padding: 12,
              borderRadius: 8,
              marginBottom: 12,
              fontSize: 14,
              minHeight: 80,
            }}
          />

          <TouchableOpacity
            onPress={createPost}
            style={{
              backgroundColor: "#1e40af",
              padding: 12,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: "white", textAlign: "center", fontSize: 14, fontWeight: "600" }}>
              📤 Post
            </Text>
          </TouchableOpacity>
        </View>

        {/* Posts List */}
        {posts.length > 0 ? (
          posts.map((p: any) => (
            <View
              key={p._id}
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
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: "700", color: "#1e293b" }}>
                {p.author.fullName}
              </Text>
              <Text style={{ fontSize: 12, color: "#94a3b8", marginBottom: 12 }}>
                @{p.author.email}
              </Text>
              <Text style={{ fontSize: 14, color: "#334155", lineHeight: 20 }}>
                {p.content}
              </Text>
            </View>
          ))
        ) : (
          <View style={{ alignItems: "center", paddingVertical: 40 }}>
            <Text style={{ fontSize: 16, color: "#94a3b8", marginBottom: 8 }}>
              No posts yet
            </Text>
            <Text style={{ fontSize: 12, color: "#cbd5e1" }}>
              Be the first to share something!
            </Text>
          </View>
        )}
      </View>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
}
