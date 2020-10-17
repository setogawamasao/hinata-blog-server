import express from "express";
import { dummyData } from "./dummy";

import "reflect-metadata";
import { Connection, createConnection } from "typeorm";
import { Blog } from "./entity/blog";

const init = async () => {
  console.log("connect server");
  const con = await createConnection();
  // const blog = new Blog();
  // blog.memberName = "金村美玖";
  // blog.blogTitle = "蚊取り線香の匂いがする";
  // blog.url =
  //   "https://www.hinatazaka46.com/s/official/diary/detail/35532?ima=0000&cd=member";
  // blog.postedAt = new Date("2020-09-09T22:47:00");
  // await con.manager.save(blog);

  console.log("start server");
  const app: express.Express = express();

  // CORSの許可
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  // body-parserに基づいた着信リクエストの解析
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Getルーティング
  const router: express.Router = express.Router();
  router.get(
    "/api/v1/blogs",
    async (req: express.Request, res: express.Response) => {
      console.log("call");
      const blogs = await con.manager.find(Blog, {
        take: 100,
        order: { postedAt: "DESC" },
      });
      res.send(blogs);
    }
  );
  app.use(router);

  // 3000番ポートでAPIサーバ起動
  app.listen(3001, () => {
    console.log("Example app listening on port 3001!");
  });
};

init();
