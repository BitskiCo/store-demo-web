import Component from '@glimmer/component';
import ENV from 'store-demo/config/environment';

export default class MainNavbarComponent extends Component {
  get siteTitle() {
    return ENV.siteTitle;
  }
}
