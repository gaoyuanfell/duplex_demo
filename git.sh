#!/usr/bin/env bash
echo "Start to publish..."
git add .
date=$(date '+%Y-%m-%d %H:%M:%S → ')
user=`git config user.name`
email=`git config user.email`
msg=" | msg → $1"
str="$date$user:$email$msg"
commit="git commit -am '"$str"'"
eval $commit
git pull origin master
git push origin master
echo "Success"


# https://developer.mozilla.org/zh-CN/docs/Web/API/WebRTC_API/Simple_RTCDataChannel_sample
# chrome://webrtc-internals/

# https://mp.weixin.qq.com/s?src=11&timestamp=1596362765&ver=2498&signature=5KLIOgcaJWCzZHdgZr1cUIigJwMVBd1csunwceuHdpFhPLn9haiDkAiWQQsC51l-Q8U*MHAEY8UArQgednGQ1znSZ16l1PVIGX0hnnJ1ZnJZZp6iW6EcfZ-2Le06TYHf&new=1