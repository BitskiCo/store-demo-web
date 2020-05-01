import Component from '@glimmer/component';
import ENV from 'store-demo/config/environment';

export default class MainJumbotronComponent extends Component {
  get subtitle() {
    return ENV.siteSubtitle;
  }

  get description() {
    return ENV.siteDescription;
  }
}
