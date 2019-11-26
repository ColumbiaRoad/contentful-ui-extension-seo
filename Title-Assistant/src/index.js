import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {
  TextInput,
  TextLink,
  HelpText,
  Switch,
  Button
} from '@contentful/forma-36-react-components';
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
    this.state = {
      value: props.sdk.field.getValue(),
      manualMode: false
    };
  }

  calcFullTitle = (pageTitle, brandName, secondaryKeyword) => {
    let page = pageTitle || '';
    let second = secondaryKeyword === undefined ? ` - ${secondaryKeyword}` : '';
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
    this.setState({ value });
  };

  // while using manual mode
  onChange = e => {
    const value = e.currentTarget.value;
    this.setState({ value });
    if (value) {
      this.props.sdk.field.setValue(value);
    } else {
      this.props.sdk.field.removeValue();
    }
  };

  // triggered by button to refresh title
  updateTitle = () => {
    let secondaryKeyword = this.props.sdk.entry.fields[
      this.props.sdk.parameters.instance.secondaryTargetField
    ]
      ? this.props.sdk.entry.fields[
          this.props.sdk.parameters.instance.secondaryTargetField
        ].getValue()
      : null;
    let title = this.calcFullTitle(
      this.props.sdk.entry.fields[this.props.sdk.parameters.instance.targetField].getValue(),
      this.props.sdk.parameters.installation.brandName,
      secondaryKeyword
    );
    this.setState({ value: title });
    this.props.sdk.field.setValue(title);
  };

  toggleManual = () => {
    this.setState({ manualMode: !this.state.manualMode });
  };

  render() {
    return (
      <>
        <Switch
          isChecked={this.state.manualMode}
          labelText="Set full title manually"
          id="setManually"
          onToggle={this.toggleManual}
        />{' '}
        {this.state.manualMode ? (
          <TextInput
            width="large"
            type="text"
            id="title-assistant-input"
            testId="title-assistant-input"
            value={this.state.value || ''}
            onChange={this.onChange}
          />
        ) : (
          <>
            <Button onClick={this.updateTitle}>Update Title</Button>
            <HelpText>Final display: {this.props.sdk.field.getValue()}</HelpText>{' '}
          </>
        )}
        <HelpText>
          Current title length:{' '}
          <span
            className={
              this.state.value &&
              this.state.value.length >
                (this.props.sdk.parameters.installation.titleMaxLength || 60)
                ? 'f36-color--warning'
                : 'f36-color--positive'
            }>
            {this.state.value && this.state.value.length > 0 ? this.state.value.length : 0}{' '}
            characters
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
