import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { Modal, Portal, useTheme } from "react-native-paper";

interface BottomSheetModalProps {
  visible: boolean;
  onDismiss: () => void;
  children: React.ReactNode;
  maxHeight?: number;
  backgroundColor?: string;
  animationDuration?: {
    show: number;
    hide: number;
  };
}

const BottomSheetModal: React.FC<BottomSheetModalProps> = ({
  visible,
  onDismiss,
  children,
  maxHeight = 0.8,
  backgroundColor,
  animationDuration = { show: 300, hide: 250 },
}) => {
  const theme = useTheme();
  const slideAnim = useRef(new Animated.Value(0)).current;
  const screenHeight = Dimensions.get("window").height;

  // Use theme surface color as default if no backgroundColor is provided
  const modalBackgroundColor = backgroundColor || theme.colors.surface;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: animationDuration.show,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: animationDuration.hide,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim, animationDuration]);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modalOverlay}
      >
        <TouchableWithoutFeedback onPress={onDismiss}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <Animated.View
                style={[
                  styles.modalContainer,
                  {
                    maxHeight: screenHeight * maxHeight,
                    backgroundColor: modalBackgroundColor,
                    transform: [
                      {
                        translateY: slideAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [screenHeight, 0],
                        }),
                      },
                    ],
                  },
                ]}
              >
                {children}
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    flexDirection: "column",
  },
});

export default BottomSheetModal;
