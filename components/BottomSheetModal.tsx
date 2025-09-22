import React, { forwardRef, useImperativeHandle } from "react";
import { View, StyleSheet } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useTheme } from "react-native-paper";

interface BottomSheetModalProps {
  children: React.ReactNode;
  snapPoints?: string[];
  enablePanDownToClose?: boolean;
  onClose?: () => void;
}

export interface BottomSheetModalRef {
  expand: () => void;
  collapse: () => void;
  close: () => void;
}

const BottomSheetModal = forwardRef<BottomSheetModalRef, BottomSheetModalProps>(
  (
    {
      children,
      snapPoints = ["50%", "90%"],
      enablePanDownToClose = true,
      onClose,
    },
    ref
  ) => {
    const theme = useTheme();
    const bottomSheetRef = React.useRef<BottomSheet>(null);

    useImperativeHandle(ref, () => ({
      expand: () => bottomSheetRef.current?.expand(),
      collapse: () => bottomSheetRef.current?.collapse(),
      close: () => bottomSheetRef.current?.close(),
    }));

    const handleSheetChanges = React.useCallback(
      (index: number) => {
        if (index === -1 && onClose) {
          onClose();
        }
      },
      [onClose]
    );

    const renderBackdrop = React.useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.5}
        />
      ),
      []
    );

    return (
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={enablePanDownToClose}
        backdropComponent={renderBackdrop}
        backgroundStyle={[
          styles.background,
          { backgroundColor: theme.colors.surface },
        ]}
        handleIndicatorStyle={[
          styles.handleIndicator,
          { backgroundColor: theme.colors.onSurfaceVariant },
        ]}
      >
        <BottomSheetScrollView
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </BottomSheetScrollView>
      </BottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  background: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  handleIndicator: {
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
});

BottomSheetModal.displayName = "BottomSheetModal";

export default BottomSheetModal;
