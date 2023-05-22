import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const HeaderButtonBack = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ paddingLeft: 10 }}>
      <Ionicons color="white" name={"arrow-back-outline"} size={24} />
    </TouchableOpacity>
  );
};

export default HeaderButtonBack;
