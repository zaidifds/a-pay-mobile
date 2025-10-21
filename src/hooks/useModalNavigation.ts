import { useNavigation } from '@react-navigation/native';
import { TabStackNavigationProp } from '../navigation/navigationTypes';

export const useModalNavigation = () => {
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
