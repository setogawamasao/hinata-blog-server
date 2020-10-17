// 基本形
import "reflect-metadata";
import { createConnection } from "typeorm";
import { Blog } from "./entity/blog";

createConnection()
  .then(async (connection) => {
    const blog = new Blog();
    blog.memberName = "金村美玖";
    blog.blogTitle = "蚊取り線香の匂いがする";
    blog.url = "https://www.hinatazaka46.com/s/official/diary/detail/35532?ima=0000&cd=member";
    blog.postedAt = new Date("2020-09-09T22:47:00");

    await connection.manager.save(blog);
    const blogs = await connection.manager.find(Blog);
    console.log("Loaded : ", blogs);
  })
  .catch((error) => console.log(error));