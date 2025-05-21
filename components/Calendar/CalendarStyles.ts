
import { colors } from "@/app/globalStyle"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  container: {    
    padding: 24,
  },
  calendar: {
    backgroundColor: "white",
    borderRadius: 25,
    padding: 20
  },
  selected: {
    color: "#fff",
    fontSize: 16,
    marginTop: 42,
  },
  dayText: {
    color: "#000",
  },
  day: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
  },
  disabled: {
    color: "#bfbfbf",
  },
  today: {
    color: "#00adef",
    fontWeight: "bold",
    fontSize: 15
  },
  daySelected: {
    backgroundColor: "#00adef",
  },
  makedDay: {
    color: colors.azul
  },
  daySelectedText: {
    color: '#101010'
  }
})
