import { theme } from "@/constants/theme";
import { useAuthStore } from "@/store/auth-store";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Profile = () => {
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    router.replace("/(auth)/login");
  };

  const menuItems = [
    {
      id: 1,
      icon: "settings-outline",
      title: "Settings",
      onPress: () => console.log("Settings pressed"),
    },
    {
      id: 2,
      icon: "notifications-outline",
      title: "Notifications",
      onPress: () => console.log("Notifications pressed"),
    },
    {
      id: 3,
      icon: "time-outline",
      title: "History",
      onPress: () => console.log("History pressed"),
    },
    {
      id: 4,
      icon: "help-circle-outline",
      title: "Support and Help",
      onPress: () => console.log("Support pressed"),
    },
    {
      id: 5,
      icon: "log-out-outline",
      title: "Logout",
      onPress: handleLogout,
      isLogout: true,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/images/human.png")}
            style={styles.profileImage}
          />
        </View>
        <Text style={styles.name}>{user?.username || "Guest"}</Text>
        <Text style={styles.email}>{user?.email || "No email"}</Text>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.menuItem,
              index === menuItems.length - 1 && styles.lastMenuItem,
            ]}
            onPress={item.onPress}
            activeOpacity={0.7}
          >
            <View style={styles.menuItemLeft}>
              <View
                style={[
                  styles.iconContainer,
                  item.isLogout && styles.logoutIconContainer,
                ]}
              >
                <Ionicons
                  name={item.icon as any}
                  size={20}
                  color={item.isLogout ? "#EF4444" : "#6B7280"}
                />
              </View>
              <Text
                style={[
                  styles.menuItemText,
                  item.isLogout && styles.logoutText,
                ]}
              >
                {item.title}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  profileHeader: {
    justifyContent: "flex-end",
    alignItems: "center",
    height: "30%",
    gap: 8,
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: "hidden",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  name: {
    fontFamily: theme.font.bold,
    fontSize: 20,
    color: "#111827",
    marginBottom: 4,
  },
  email: {
    fontFamily: theme.font.bold,
    fontSize: 14,
    color: "#94A3B8",
  },
  menuContainer: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 10,
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 18,
    marginBottom: 1,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  lastMenuItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    marginBottom: 0,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    marginRight: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutIconContainer: {
    backgroundColor: "#FEF2F2",
    borderRadius: 8,
  },
  menuItemText: {
    fontSize: 16,
    fontFamily: theme.font.bold,
    color: "#374151",
    flex: 1,
  },
  logoutText: {
    color: "#EF4444",
  },
});

export default Profile;
