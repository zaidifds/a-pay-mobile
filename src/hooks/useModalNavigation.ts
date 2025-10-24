import { useNavigation } from '@react-navigation/native';
import { TabStackNavigationProp } from '../navigation/navigationTypes';

const useModalNavigation = () => {
  const navigation = useNavigation<TabStackNavigationProp>();

  const openReceiveModal = () => {
    navigation.navigate('ReceiveModal');
  };

  const openSwapModal = () => {
    navigation.navigate('SwapModal');
  };

  const closeModal = () => {
    navigation.goBack();
  };

  return {
    openReceiveModal,
    openSwapModal,
    closeModal,
    navigation,
  };
};

export default useModalNavigation;
