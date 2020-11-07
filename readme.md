## set up

npm install -g typeScript  
npm install -g ts-node  
npm install -g nodemon  
npm install typeorm @types/express pg reflect-metadata

tsc --init  
-> tsconfig.json ができる

nodemon.json を作る  
{  
 // 監視するフォルダ  
 "watch": ["./"],  
 // .ts を監視する  
 "ext": "ts",  
 // nodemon を起動したら ts-node を実行する  
 "exec": "ts-node ./main.ts"  
}

## 実行

nodemon

### express

### 接続

http://localhost:3001/api/test
http://localhost:3001/api/blogs/search
http://localhost:3001/api/blogs/search?postedBy[]=usio&postedBy[]=kageyama&dateFrom=2016/8/3&dateTo=2016/8/5&title=%E3%81%AE
http://localhost:3001/api/blogs/search?sort=desc&showNumber=10
http://localhost:3001/api/blogs/search?postedBy[]=ushio&postedBy[]=kageyama&dateFrom=2016/8/3&dateTo=2016/8/5&title=%E3%81%AE&sort=desc

http://localhost:3001/api/blogs/search?postedBy[]=usio&postedBy[]=kageyama&dateFrom=2016/8/3&dateTo=2016/8/5&title=%E3%81%AE

http://34.219.139.226/hinata-blogs-api/blogs/search?postedBy[]=ushio&postedBy[]=kageyama&dateFrom=2016/8/3&dateTo=2016/8/5&title=%E3%81%AE
http://34.219.139.226/hinata-blogs-api/blogs/search?sort=desc&showNumber=10

http://34.219.139.226/hinata-blogs-api/blogs/search?postedBy[]=ushio&postedBy[]=kageyama&dateFrom=2016/8/3&dateTo=2016/8/5&title=%E3%81%AE&sort=desc&showNumber=100

# プロセスを殺す

linux 編  
https://eng-entrance.com/linux-command-ps
ps -aux | grep node
kill -9 [プロセス ID]

windows 編  
コマンドプロント
netstat -ano | find "3001"
taskkill /f /pid 5664

# 参考

https://qiita.com/ekzemplaro/items/bf9ffe81e948e77d0c3e
