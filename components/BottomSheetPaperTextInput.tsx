import React, { forwardRef, useCallback } from "react";
import {
  TextInput as RNTextInput,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from "react-native";
import {
  TextInput as PaperTextInput,
  TextInputProps,
} from "react-native-paper";
import { useBottomSheetInternal } from "@gorhom/bottom-sheet";
import { findNodeHandle } from "react-native";

export const BottomSheetPaperTextInput = forwardRef<
  RNTextInput,
  TextInputProps
>(({ onFocus, onBlur, ...rest }, ref) => {
  const { animatedKeyboardState, textInputNodesRef } = useBottomSheetInternal();

  const handleOnFocus = useCallback(
    (args: NativeSyntheticEvent<TextInputFocusEventData>) => {
      animatedKeyboardState.set((state) => ({
        ...state,
        target: args.nativeEvent.target,
      }));
      if (onFocus) {
        onFocus(args);
      }
    },
    [onFocus, animatedKeyboardState]
  );

  const handleOnBlur = useCallback(
    (args: NativeSyntheticEvent<TextInputFocusEventData>) => {
      const keyboardState = animatedKeyboardState.get();
      const currentFocusedInput = findNodeHandle(
        RNTextInput.State.currentlyFocusedInput()
      );

      const shouldRemoveCurrentTarget =
        keyboardState.target === args.nativeEvent.target;
      const shouldIgnoreBlurEvent =
        currentFocusedInput &&
        textInputNodesRef.current.has(currentFocusedInput);

      if (shouldRemoveCurrentTarget && !shouldIgnoreBlurEvent) {
        animatedKeyboardState.set((state) => ({
          ...state,
          target: undefined,
        }));
      }

      if (onBlur) {
        onBlur(args);
      }
    },
    [onBlur, animatedKeyboardState, textInputNodesRef]
  );

  return (
    <PaperTextInput
      ref={ref}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
      {...rest}
    />
  );
});
