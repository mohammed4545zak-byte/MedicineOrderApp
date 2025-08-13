// src/types/navigation.ts
export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  MedicineDetail: { medicine: any };
  Cart: undefined;
  Orders: undefined;
  Profile: undefined;
  WebView: undefined;
};

export type NavigationProp = import('@react-navigation/native').NavigationProp<RootStackParamList>;
