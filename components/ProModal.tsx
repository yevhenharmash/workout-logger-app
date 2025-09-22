import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  Title,
  Paragraph,
  Button,
  IconButton,
  Divider,
  Card,
} from "react-native-paper";

interface ProModalProps {
  onClose: () => void;
  theme: any;
}

const ProModal: React.FC<ProModalProps> = ({ onClose, theme }) => {
  const handleUpgrade = () => {
    // TODO: Implement upgrade logic
    console.log("Upgrading to Pro...");
    onClose();
  };

  return (
    <View style={styles.modalContent}>
      <View style={styles.modalHeader}>
        <Title>Upgrade to Pro</Title>
        <IconButton
          icon="close"
          onPress={onClose}
          iconColor={theme.colors.onSurface}
        />
      </View>

      <Divider style={{ marginBottom: 16 }} />

      <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
        <View style={styles.proContent}>
          <IconButton
            icon="crown"
            size={48}
            iconColor={theme.colors.secondary}
            style={styles.crownIcon}
          />

          <Title style={styles.proTitle}>Unlock Premium Features</Title>

          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <IconButton
                icon="check-circle"
                size={20}
                iconColor={theme.colors.primary}
              />
              <Paragraph style={styles.featureText}>
                Unlimited workout logging
              </Paragraph>
            </View>

            <View style={styles.featureItem}>
              <IconButton
                icon="check-circle"
                size={20}
                iconColor={theme.colors.primary}
              />
              <Paragraph style={styles.featureText}>
                Advanced analytics & insights
              </Paragraph>
            </View>

            <View style={styles.featureItem}>
              <IconButton
                icon="check-circle"
                size={20}
                iconColor={theme.colors.primary}
              />
              <Paragraph style={styles.featureText}>
                Custom workout plans
              </Paragraph>
            </View>

            <View style={styles.featureItem}>
              <IconButton
                icon="check-circle"
                size={20}
                iconColor={theme.colors.primary}
              />
              <Paragraph style={styles.featureText}>
                Export data & reports
              </Paragraph>
            </View>

            <View style={styles.featureItem}>
              <IconButton
                icon="check-circle"
                size={20}
                iconColor={theme.colors.primary}
              />
              <Paragraph style={styles.featureText}>Priority support</Paragraph>
            </View>
          </View>

          <Card style={styles.pricingCard}>
            <Card.Content>
              <Title style={styles.priceTitle}>$4.99/month</Title>
              <Paragraph style={styles.priceSubtitle}>Cancel anytime</Paragraph>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>

      <View style={styles.modalActions}>
        <Button
          mode="contained"
          onPress={handleUpgrade}
          buttonColor={theme.colors.secondary}
          textColor={theme.colors.onSecondary}
          icon="crown"
          style={styles.button}
        >
          Upgrade Now
        </Button>
        <Button mode="outlined" onPress={onClose} style={styles.button}>
          Maybe Later
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  modalBody: {
    paddingVertical: 8,
  },
  modalActions: {
    flexDirection: "column",
    paddingVertical: 16,
    paddingBottom: 32, // Extra padding for safe area
  },
  button: {
    marginBottom: 8,
  },
  proContent: {
    alignItems: "center",
    paddingVertical: 16,
  },
  crownIcon: {
    marginBottom: 16,
  },
  proTitle: {
    textAlign: "center",
    marginBottom: 24,
  },
  featureList: {
    width: "100%",
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  featureText: {
    flex: 1,
    marginLeft: 8,
  },
  pricingCard: {
    width: "100%",
    alignItems: "center",
  },
  priceTitle: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  priceSubtitle: {
    textAlign: "center",
    opacity: 0.7,
  },
});

export default ProModal;
