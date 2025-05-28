import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MapPin } from "lucide-react-native";
import { Location } from "@/types/weather";
import { colors } from "@/constants/colors";

interface LocationInfoProps {
  location: Location;
}

export default function LocationInfo({ location }: LocationInfoProps) {
  return (
    <View style={styles.container}>
      <MapPin size={20} color={colors.primary} />
      <Text style={styles.locationText}>
        {location.city}, {location.country}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  locationText: {
    fontSize: 18,
    fontWeight: "500",
    color: colors.text,
    marginLeft: 8,
  },
});
