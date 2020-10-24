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

http://localhost:3001/test
http://localhost:3001/api/blogs/search?postedBy[]=usio&postedBy[]=kageyama

# プロセスを殺す

linux 編  
https://eng-entrance.com/linux-command-ps
ps -e | grep node
kill -9 [プロセス ID]

windows 編  
コマンドプロント
netstat -ano | find "3001"
taskkill /f /pid 5664

# 参考

https://qiita.com/ekzemplaro/items/bf9ffe81e948e77d0c3e
