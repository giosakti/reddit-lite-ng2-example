import { bootstrap } from "angular2/platform/browser";
import { Component } from "angular2/core";

@Component({
  selector: 'reddit',
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
  `
})
class RedditApp {
  constructor() {
  }

  addArticle(title: HTMLInputElement, link: HTMLInputElement): void {
    console.log(`Adding article with title: ${title.value} and link: ${link.value}`);
  }
}

bootstrap(RedditApp);
