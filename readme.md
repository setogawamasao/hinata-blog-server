## set up

npm install -g typeScript  
npm install -g ts-node  
npm install -g nodemon  

tsc --init  
-> tsconfig.json ができる  

nodemon.jsonを作る  
{  
    // 監視するフォルダ  
    "watch": ["./"],  
    // .tsを監視する  
    "ext": "ts",  
    // nodemonを起動したらts-nodeを実行する  
    "exec": "ts-node ./main.ts"  
}  

## 実行

nodemon
