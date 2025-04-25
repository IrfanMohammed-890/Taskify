import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Profile</Text>
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="create-outline" size={20} color="#4f46e5" />
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Info Card */}
      <View style={styles.card}>
        <View style={styles.profileHeader}>
          <Ionicons name="person-circle-outline" size={70} color="#4f46e5" />
          <View>
            <Text style={styles.profileName}>Krishna A.</Text>
            <Text style={styles.profileEmail}>krishna@example.com</Text>
          </View>
        </View>

        {/* Info Rows */}
        <View style={styles.infoSection}>
          <InfoRow label="Full Name" value="Krishna Aryal" />
          <InfoRow label="Email" value="krishna@example.com" />
          <InfoRow label="Contact" value="+977-9800000000" />
          <InfoRow
            label="Subscription"
            value="Active"
            badge
            badgeColor="#d1fae5"
            badgeTextColor="#065f46"
          />
        </View>
      </View>

      {/* SOS Button */}
      <TouchableOpacity style={styles.sosButton}>
        <Text style={styles.sosText}>Update SOS Details</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// Reusable Info Row
const InfoRow = ({
  label,
  value,
  badge = false,
  badgeColor,
  badgeTextColor,
}: {
  label: string;
  value: string;
  badge?: boolean;
  badgeColor?: string;
  badgeTextColor?: string;
}) => (
  <View style={styles.infoRow}>
    <Text style={styles.label}>{label}</Text>
    {badge ? (
      <View
        style={[
          styles.badge,
          {
            backgroundColor: badgeColor || "#d1fae5",
          },
        ]}
      >
        <Text
          style={[
            styles.badgeText,
            {
              color: badgeTextColor || "#065f46",
            },
          ]}
        >
          {value}
        </Text>
      </View>
    ) : (
      <Text style={styles.value}>{value}</Text>
    )}
  </View>
);

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3730a3",
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  editText: {
    color: "#4f46e5",
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 4,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 12,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
  },
  profileEmail: {
    fontSize: 14,
    color: "#6b7280",
  },
  infoSection: {
    gap: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    color: "#6b7280",
    fontSize: 14,
  },
  value: {
    fontSize: 15,
    fontWeight: "500",
    color: "#111827",
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: "500",
  },
  sosButton: {
    backgroundColor: "#ef4444",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 24,
    elevation: 2,
  },
  sosText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
