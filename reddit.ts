import { bootstrap } from "angular2/platform/browser";
import { Component } from "angular2/core";

class Article {
  title: string;
  link: string;
  votes: number;

  constructor(title: string, link: string, votes?: number) {
    this.title = title;
    this.link = link;
    this.votes = votes || 0;
  }

  voteUp(): void {
    this.votes += 1;
  }

  voteDown(): void {
    this.votes -= 1;
  }
}

@Component({
  selector: 'reddit-article',
  inputs: ['article'],
  host: {
    class: 'row'
  },
  template: `
  <div class="four wide column center aligned votes">
    <div class="ui statistic">
      <div class="value">
        {{ article.votes }}
      </div>
      <div class="label">
        Points
      </div>
    </div>
  </div>

  <div class="twelve wide column">
    <a class="ui large header" href="{{ article.link }}">
      {{ article.title }}
    </a>
    <ul class="ui big horizontal list voters">
      <li class="item">
        <a href (click)="voteUp()">
          <i class="arrow up icon"></i>
          upvote
        </a>
      </li>
      <li class="item">
        <a href (click)="voteDown()">
          <i class="arrow down icon"></i>
          downvote
        </a>
      </li>
    </ul>
  </div>
  `
})
class RedditArticle {
  article: Article;

  voteUp() {
    this.article.voteUp();
    return false;
  }

  voteDown() {
    this.article.voteDown();
    return false;
  }
}

@Component({
  selector: 'reddit',
  directives: [RedditArticle],
  template: `
  <form class="ui large form segment">
    <h3 class="ui header">Add an Article</h3>

    <div class="field">
      <label for="title">Title:</label>
      <input name="title" #newTitle>
    </div>
    <div class="field">
      <label for="link">Link:</label>
      <input name="link" #newLink>
    </div>

    <button (click)="addArticle(newTitle, newLink)"
            class="ui positive right floated button">
      Submit
    </button>
  </form>

  <div class="ui grid posts">
    <reddit-article
      *ngFor="#article of articles"
      [article]="article">
    </reddit-article>
  </div>
  `
})
class RedditApp {
  articles: Array<Article>;

  constructor() {
    this.articles = [
      new Article('JakartaJS', 'http://meetup.com/jakartajs', 3),
      new Article('Angular 2', 'http://angular.io', 2),
      new Article('Starqle', 'http://starqle.com', 1)
    ]
  }

  addArticle(title: HTMLInputElement, link: HTMLInputElement): void {
    console.log(`Adding article with title: ${title.value} and link: ${link.value}`);
  }
}

bootstrap(RedditApp);
