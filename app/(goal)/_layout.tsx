import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="intro" options={{ animation: 'slide_from_left' }} />
      <Stack.Screen name="main" options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="ending" options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="modalGoal" options={{ animation: 'slide_from_bottom', presentation: 'transparentModal' }} />
    </Stack>
  )
}