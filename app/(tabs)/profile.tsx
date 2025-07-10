import { useAuthStore } from "@/store/auth-store";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@/components/ThemeProvider";
import ThemeToggle from "@/components/UI/ThemeToggle";

const getMenuItems = (handleLogout: () => void) => [
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
    icon: "moon-outline",
    title: "Theme",
    onPress: () => console.log("Theme pressed"),
    isTheme: true,
  },
  {
    id: 5,
    icon: "help-circle-outline",
    title: "Support and Help",
    onPress: () => console.log("Support pressed"),
  },
  {
    id: 6,
    icon: "log-out-outline",
    title: "Logout",
    onPress: handleLogout,
    isLogout: true,
  },
];

const Profile = () => {
  const { user, logout } = useAuthStore();
  const { theme } = useTheme();

  const handleLogout = async () => {
    await logout();
    router.replace("/(auth)/login");
  };

  const menuItems = getMenuItems(handleLogout);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.profileHeader}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/images/human.png")}
            style={styles.profileImage}
          />
        </View>
        <Text style={[styles.name, { color: theme.colors.text }]}>{user?.username || "Guest"}</Text>
        <Text style={[styles.email, { color: theme.colors.textSecondary }]}>{user?.email || "No email"}</Text>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.menuItem,
              { 
                backgroundColor: theme.colors.card,
                borderTopColor: theme.colors.divider,
                borderBottomColor: theme.colors.divider,
              },
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
                  color={item.isLogout ? "#EF4444" : theme.colors.textSecondary}
                />
              </View>
              <Text
                style={[
                  styles.menuItemText,
                  { color: theme.colors.text },
                  item.isLogout && styles.logoutText,
                ]}
              >
                {item.title}
              </Text>
            </View>
            {item.isTheme ? (
              <ThemeToggle size="small" />
            ) : (
              <Ionicons name="chevron-forward" size={20} color={theme.colors.textTertiary} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    fontWeight: "500",
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
    paddingHorizontal: 20,
    paddingVertical: 18,
    marginBottom: 1,
    borderTopWidth: 1,
  },
  lastMenuItem: {
    borderBottomWidth: 1,
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
    fontWeight: "500",
    flex: 1,
  },
  logoutText: {
    color: "#EF4444",
  },
});

export default Profile;
