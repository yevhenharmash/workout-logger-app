import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useCallback,
} from "react";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useTheme } from "react-native-paper";

interface BottomSheetModalProps {
  children: React.ReactNode;
  snapPoints?: string[];
  initialSnapIndex?: number;
  onClose?: () => void;
}

export interface BottomSheetModalRef {
  expand: () => void;
  close: () => void;
}

export const BottomSheetModal = forwardRef<
  BottomSheetModalRef,
  BottomSheetModalProps
>(
  (
    { children, snapPoints = ["50%", "90%"], initialSnapIndex = 0, onClose },
    ref
  ) => {
    const theme = useTheme();
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [internalIndex, setInternalIndex] = useState(-1);

    useImperativeHandle(ref, () => ({
      expand: () => bottomSheetRef.current?.snapToIndex(initialSnapIndex),
      close: () => bottomSheetRef.current?.close(),
    }));

    const handleSheetChanges = useCallback(
      (index: number) => {
        setInternalIndex(index);
        if (index === -1 && onClose) {
          onClose();
        }
      },
      [onClose]
    );

    // This is the fix for Android: When inactive, shrink the view to 0x0
    // so it cannot intercept any touch events.
    const containerStyle =
      internalIndex === -1 ? styles.inactiveContainer : styles.activeContainer;

    return (
      <GestureHandlerRootView style={containerStyle}>
        <BottomSheet
          ref={bottomSheetRef}
          index={-1} // Initially hidden
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          onChange={handleSheetChanges}
          backdropComponent={(props) => (
            <BottomSheetBackdrop
              {...props}
              disappearsOnIndex={-1}
              appearsOnIndex={0}
            />
          )}
          backgroundStyle={{ backgroundColor: theme.colors.surface }}
          handleIndicatorStyle={{
            backgroundColor: theme.colors.onSurfaceVariant,
          }}
          // keyboardBehavior="interactive"
          keyboardBlurBehavior="restore"
          android_keyboardInputMode="adjustResize"
          keyboardBehavior="extend"
          // keyboardBlurBehavior="restore"
          // android_keyboardInputMode="adjustResize"
        >
          <BottomSheetView style={styles.contentContainer}>
            {children}
          </BottomSheetView>
        </BottomSheet>
      </GestureHandlerRootView>
    );
  }
);

const styles = StyleSheet.create({
  activeContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  inactiveContainer: {
    // When inactive, the container takes up no space and cannot block touches.
    position: "absolute",
    width: 0,
    height: 0,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
});
