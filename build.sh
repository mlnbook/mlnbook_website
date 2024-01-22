echo "execute npm run build"
npm run build

if [ -d "dist/" ];then
  echo "execute rm -rf deploy_dist"
  rm -rf deploy_dist
  echo "execute mv dist deploy_dist"
  mv dist deploy_dist
  echo "deploy success!"
else
  echo "发布失败，请检查后重试"
fi
