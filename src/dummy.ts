export type BlogInfo = {
    postedAt: Date;
    memberName: string;
    blogTitle: string;
    url: string;
  };

export const dummyData: BlogInfo[] = [
    {
      postedAt: new Date("2020-09-09T22:47:00"),
      memberName: "金村美玖",
      blogTitle: "蚊取り線香の匂いがする",
      url:
        "https://www.hinatazaka46.com/s/official/diary/detail/35532?ima=0000&cd=member",
    },
    {
      postedAt: new Date("2020-09-21T23:14:00"),
      memberName: "松田好花",
      blogTitle: "お伝えしたいこと",
      url:
        "https://www.hinatazaka46.com/s/official/diary/detail/35670?ima=0000&cd=member",
    },
  ];