import "reflect-metadata";
import express from "express";
import {
  Between,
  Connection,
  createConnection,
  In,
  IsNull,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
} from "typeorm";
import { Blogs } from "./entity/blogs";
import { Blog } from "./entity/blog";

const init = async () => {
  // データベースに接続
  console.log("connect data base");
  const con = await createConnection();

  // const blog = new Blogs();
  // blog.posted_by = "金村美玖";
  // blog.title = "蚊取り線香の匂いがする";
  // blog.url =
  //   "https://www.hinatazaka46.com/s/official/diary/detail/35532?ima=0000&cd=member";
  // blog.posted_at = new Date("2020-09-09T22:47:00");
  // await con.manager.save(blog);

  //　サーバーを開始
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

  router.get("/api", async (req: express.Request, res: express.Response) => {
    const value = req.query.value;
    res.send(`get test ok : ${value}`);
  });

  router.get(
    "/api/blogs/search",
    async (req: express.Request, res: express.Response) => {
      console.log("call", new Date());
      const names = new Array<string>();
      const queries = req.query.postedBy;
      const dateFromBuf = req.query.dateFrom;
      const dateToBuf = req.query.dateTo;
      const title = req.query.title;

      if (queries) {
        const postedBys = queries.toString();
        for (const postedBy of postedBys.split(",")) {
          const target = members.find((member) => {
            return member.code === postedBy;
          });
          names.push(target.name);
        }
      }

      let dateFrom: Date | undefined = undefined;
      if (dateFromBuf) {
        const [year, month, day] = dateFromBuf.toString().split("/");
        dateFrom = new Date(Number(year), Number(month) - 1, Number(day));
      }

      let dateTo: Date | undefined = undefined;
      if (dateToBuf) {
        const [year, month, day] = dateToBuf.toString().split("/");
        dateTo = new Date(Number(year), Number(month) - 1, Number(day));
      }

      const nameCondition =
        names.length !== 0 ? { posted_by: In(names) } : undefined;

      let dateFromCondition = undefined;
      let dateToCondition = undefined;
      let betweenCondition = undefined;

      if (dateFrom && dateTo) {
        betweenCondition = {
          posted_at: Between(dateFrom, dateTo),
        };
      } else if (dateFrom) {
        dateFromCondition = {
          posted_at: MoreThanOrEqual(dateFrom),
        };
      } else if (dateTo) {
        dateToCondition = {
          posted_at: LessThanOrEqual(dateTo),
        };
      }

      let titleCondition = undefined;
      titleCondition = title
        ? {
            title: Like(`%${title}%`),
          }
        : undefined;

      const searchCondition = {
        ...nameCondition,
        ...betweenCondition,
        ...dateFromCondition,
        ...dateToCondition,
        ...titleCondition,
      };

      console.log(searchCondition);

      const blogEntities = await con.manager.find(Blogs, {
        take: 100,
        where: searchCondition,
        order: { posted_at: "ASC" },
      });

      const blogs = blogEntities.map((blogEntity) => {
        return new Blog(
          blogEntity.id,
          blogEntity.posted_by,
          blogEntity.posted_at,
          blogEntity.title,
          blogEntity.url
        );
      });

      res.send(blogs);
    }
  );

  app.use(router);

  // 3001番ポートでAPIサーバ起動
  const port = 3001;
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
  });
};

const members = [
  { code: "usio", name: "潮 紗理菜" },
  { code: "kageyama", name: "影山 優佳" },
  { code: "kato", name: "加藤 史帆" },
  { code: "saito", name: "齊藤 京子" },
  { code: "sasaki-k", name: "佐々木 久美" },
  { code: "sasaki-m", name: "佐々木 美玲" },
  { code: "takase", name: "高瀬 愛奈" },
  { code: "takamoto", name: "高本 彩花" },
  { code: "higashimura", name: "東村 芽依" },
  { code: "kanemura", name: "金村 美玖" },
  { code: "kawata", name: "河田 陽菜" },
  { code: "kosaka", name: "小坂 菜緒" },
  { code: "tomita", name: "富田 鈴花" },
  { code: "nibu", name: "丹生 明里" },
  { code: "hamgishi", name: "濱岸 ひより" },
  { code: "matsuhda", name: "松田 好花" },
  { code: "tomita", name: "宮田 愛萌" },
  { code: "watanabe", name: "渡邉 美穂" },
  { code: "kamimura", name: "上村 ひなの" },
  { code: "takahashi", name: "髙橋 未来虹" },
  { code: "morimoto", name: "森本 茉莉" },
  { code: "yamaguchi", name: "山口 陽世" },
];

init();
