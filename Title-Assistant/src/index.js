import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { TextInput, TextLink, HelpText, Switch } from '@contentful/forma-36-react-components';
import { init } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import '@contentful/forma-36-fcss/dist/styles.css';
import './index.css';

export class App extends React.Component {
  static propTypes = {
    sdk: PropTypes.object.isRequired
  };

  detachExternalChangeHandler = null;

  constructor(props) {
    super(props);
    let value = '';
    try {
      let fieldValue = props.sdk.field.getValue();
      if (fieldValue.split('|').length == 1) {
        value = fieldValue;
      } else {
        value = fieldValue.split('-')[0].split(' |')[0];
        console.log(value);
      }
    } catch (e) {
      value = 'Placeholder';
    }
    this.state = {
      value,
      fullTitle: this.calcFullTitle(
        value,
        false ? undefined : this.props.sdk.parameters.installation.brandName,
        false ? undefined : this.props.sdk.parameters.instance.secondaryKeyword
      ),
      manualMode: false
    };
  }

  calcFullTitle = (pageTitle, brandName, secondaryKeyword) => {
    let page = pageTitle || '';
    let second = secondaryKeyword !== undefined ? ` - ${secondaryKeyword}` : '';
    let brand = brandName !== undefined ? brandName : '';
    brand = (page === '' && second === '') || brand === '' ? brand : ` | ${brand}`;
    return page + second + brand;
  };

  componentDidMount() {
    this.props.sdk.window.startAutoResizer();
    // Handler for external field value changes (e.g. when multiple authors are working on the same entry).
    this.detachExternalChangeHandler = this.props.sdk.field.onValueChanged(this.onExternalChange);
  }

  componentWillUnmount() {
    if (this.detachExternalChangeHandler) {
      this.detachExternalChangeHandler();
    }
  }

  onExternalChange = value => {
    if (value !== this.state.fullTitle && value !== undefined) {
      console.log(value, 'external change', this.state.fullTitle);
      try {
        let fieldValue = value;
        if (fieldValue.split('|').length == 1) {
          this.setState({ value: fieldValue });
        } else {
          fieldValue = fieldValue.split('-')[0].split(' |')[0];
          this.setState({ value: fieldValue });
        }
      } catch (e) {
        value = 'Placeholder';
      }
    }
  };

  onChange = e => {
    const value = e.currentTarget.value;
    this.setState({ value });
    this.setTitle(value);
  };

  toggleManual = () => {
    console.log(this.props.sdk);
    this.setState({ manualMode: !this.state.manualMode }, () => {
      this.setTitle(this.state.value);
    });
  };

  setTitle = value => {
    this.setState(
      {
        fullTitle: this.calcFullTitle(
          value,
          this.state.manualMode ? undefined : this.props.sdk.parameters.installation.brandName,
          this.state.manualMode ? undefined : this.props.sdk.parameters.instance.secondaryKeyword
        )
      },
      () => {
        if (value && !this.state.manualMode) {
          this.props.sdk.field.setValue(this.state.fullTitle);
        } else if (value) {
          this.props.sdk.field.setValue(value);
        } else {
          this.props.sdk.field.removeValue();
        }
      }
    );
  };

  render() {
    return (
      <>
        <TextInput
          width="large"
          type="text"
          id="title-assistant-input"
          testId="title-assistant-input"
          value={this.state.value || ''}
          onChange={this.onChange}
        />
        <Switch
          defaultChecked={false}
          isChecked={this.state.manualMode}
          labelText="Set full title manually"
          id="setManually"
          onToggle={this.toggleManual}
        />
        <HelpText>Final display: {this.state.fullTitle}</HelpText>
        <HelpText>
          Current title length:{' '}
          <span
            className={
              this.state.fullTitle.length >
              (this.props.sdk.parameters.installation.titleMaxLength || 60)
                ? 'f36-color--warning'
                : 'f36-color--positive'
            }>
            {this.state.fullTitle.length} characters
          </span>
        </HelpText>
        <TextLink
          href="https://moz.com/learn/seo/title-tag"
          target="_blank"
          icon="ExternalLink"
          linkType="primary"
        />
        See Title SEO Guidelines
        <TextLink />
      </>
    );
  }
}

init(sdk => {
  ReactDOM.render(<App sdk={sdk} />, document.getElementById('root'));
});

/**
 * By default, iframe of the extension is fully reloaded on every save of a source file.
 * If you want to use HMR (hot module reload) instead of full reload, uncomment the following lines
 */
// if (module.hot) {
//   module.hot.accept();
// }
