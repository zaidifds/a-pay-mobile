# install npm modules
npm install --legacy-peer-deps

# go to android folder
cd android

#Do gradle clean
./gradlew clean

# go back to root folder
cd ..

# Execute this command
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

# remove all the files from following folders

# ./android/app/src/main/res/drawable-hdpi/
# ./android/app/src/main/res/drawable-mdpi/
# ./android/app/src/main/res/drawable-xhdpi/
# ./android/app/src/main/res/drawable-xxhdpi/
# ./android/app/src/main/res/drawable-xxxhdpi/

cd android/app/src/main/res/
rm -rf ./drawable-mdpi/*

rm -rf ./drawable-hdpi/*

rm -rf ./drawable-xhdpi/*

rm -rf ./drawable-xxhdpi/*

rm -rf ./drawable-xxxhdpi/*

# Go back to ANDROID folder
cd ../../../../

#execute this command to make Bundle for App Store
./gradlew bundleRelease
