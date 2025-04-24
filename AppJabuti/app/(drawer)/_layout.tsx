// app/(drawer)/_layout.tsx
import { Slot } from 'expo-router';
import DrawerNavigator from '../components/DrawerNavigator';

export default function DrawerLayout() {
  return <DrawerNavigator />;
}
