import { useTheme } from "@/components/ThemeProvider";
import ThemeTest from "@/components/UI/ThemeTest";
import { StyleSheet, View } from "react-native";

const Saved = () => {
    const { theme } = useTheme();
    
    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <ThemeTest />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 16,
        fontWeight: "500",
    },
});

export default Saved;