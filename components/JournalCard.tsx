import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function JournalCard({
  title,
  description,
  onPress,
}: {
  title: string;
  description: string;
  onPress?: () => void;
}) {
  const maxLength = 160;
  const shouldTruncate = description.length > maxLength;
  const shortText = shouldTruncate ? description.slice(0, maxLength).trim() : description;

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Text style={styles.cardTitle} numberOfLines={1} ellipsizeMode="tail">
        {title}
      </Text>

      <Text style={styles.cardDescription}>
        {shortText}
        {shouldTruncate && (
          <Text style={styles.readMore}> Read more</Text>
        )}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 16,
    marginTop: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3730a3", // Indigo-800
  },
  cardDescription: {
    fontSize: 14,
    color: "#555",
    marginTop: 8,
    lineHeight: 20,
  },
  readMore: {
    color: "#6366f1", // Indigo-500
    fontWeight: "600",
  },
});
