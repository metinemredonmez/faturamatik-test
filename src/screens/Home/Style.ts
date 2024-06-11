import { colors } from "@/config";
import { StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

const styles = StyleSheet.create({
  container: {

  },
  blogContainer: {
    marginTop: 10
  },
  homeBg: {
    width: '100%',
    height: '100%',
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
    paddingTop: getStatusBarHeight() + 20,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  inputContainer: {
    height: 50,
    borderRadius: 25,
    width: 50,
    borderWidth: 1,
    borderColor: colors.white,
    backgroundColor: 'rgba(255,255,255,0.2)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;