export class Blog {
  id: number;
  postedBy: string;
  postedAt: Date;
  title: string;
  url: string;

  constructor(
    id: number,
    postedBy: string,
    postedAt: Date,
    title: string,
    url: string
  ) {
    this.id = id;
    this.postedBy = postedBy;
    this.postedAt = postedAt;
    this.title = title;
    this.url = url;
  }
}
