#!/bin/bash

rm -rf ./build

mkdir ./build
mkdir ./build/subapp

# main基座
cp -r ./main/build/ ./build/main/

# sub-react1子应用
cp -r ./sub-react-app/build/ ./build/subapp/sub-react-app/

# sub-react2子应用
cp -r ./sub-react-app2/build/ ./build/subapp/sub-react-app2/

# sub-vue3子应用
cp -r ./sub-vue3-app/build/ ./build/subapp/sub-vue3-app/

cd ./build
zip -r build$(date +%Y%m%d%H%M%S).zip *

GREEN=$(tput setaf 2)
RESET=$(tput sgr0)
echo "bundle.sh execute ${GREEN} successfully ${RESET}"
