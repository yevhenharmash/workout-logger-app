import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
export const WHEEL_SIZE = Math.min(width * 0.8, 320);

export const styles = StyleSheet.create({
});
