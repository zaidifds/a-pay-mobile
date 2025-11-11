npm install --legacy-peer-deps
cd ios
rm Podfile.lock
pod install
cd ..
npx react-native bundle --minify --entry-file index.js --platform ios --dev false --bundle-output ./ios/main.jsbundle --assets-dest ./ios
cd ios