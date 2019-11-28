import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { TextInput, TextLink, Switch, HelpText } from '@contentful/forma-36-react-components';
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

    let value = this.extractTitleFromFullTitle(
      props.sdk.field.getValue(),
      props.sdk.parameters.installation.brandName
    );

    let brandValidatorObj = this.containsBrandName(
      props.sdk.field.getValue(),
      props.sdk.parameters.installation.brandName
    );

    let urlStub = props.sdk.parameters.installation.urlStub
      ? props.sdk.parameters.installation.urlStub
      : 'https://example.com/you-are-probably-missing-urlStub-installation-parameter';
    let exampleMeta =
      'Example of a meta description text that is not above 160 characters in length.';

    let urlField = props.sdk.entry.fields[props.sdk.parameters.instance.urlField];
    let metaField = props.sdk.entry.fields[props.sdk.parameters.instance.metaTargetField];

    this.state = {
      value,
      exampleMeta,
      urlStub,
      urlField,
      metaField,
      useBrandName: brandValidatorObj.isBrandName || brandValidatorObj.brandAppended ? true : false,
      url: urlField ? urlField.getValue() : '',
      meta: metaField ? metaField.getValue() : exampleMeta
    };

    console.log(this.state.useBrandName);
  }

  calcFullTitle = (pageTitle, brandName) => {
    if (brandName === undefined || brandName === '' || pageTitle === brandName) return pageTitle;
    else if (pageTitle === undefined || pageTitle === '') {
      return brandName;
    } else {
      return `${pageTitle} | ${brandName}`;
    }
  };

  containsBrandName = (pageTitle, brandName) => {
    return {
      isBrandName: pageTitle === brandName,
      brandAppended: pageTitle.endsWith(' | ' + brandName)
    };
  };

  extractTitleFromFullTitle = (pageTitle, brandName) => {
    if (!pageTitle) {
      return '';
    }
    let brandValidatorObj = this.containsBrandName(pageTitle, brandName);
    if (brandValidatorObj.isBrandName) {
      return '';
    } else if (brandValidatorObj.brandAppended) {
      return pageTitle.slice(0, -` | ${brandName}`.length);
    } else {
      return pageTitle;
    }
  };

  componentDidMount() {
    this.props.sdk.window.startAutoResizer();

    // Handler for external field value changes (e.g. when multiple authors are working on the same entry).
    this.detachExternalChangeHandler = this.props.sdk.field.onValueChanged(this.onExternalChange);

    if (this.state.metaField) {
      this.detachMetaChangeHandler = this.state.metaField.onValueChanged(this.onMetaChange);
    }

    if (this.state.urlField) {
      this.detachUrlChangeHandler = this.state.urlField.onValueChanged(this.onUrlChange);
    }
  }

  componentWillUnmount() {
    if (this.detachExternalChangeHandler) {
      this.detachExternalChangeHandler();
    }
  }

  onExternalChange = value => {
    this.setState({
      value: this.extractTitleFromFullTitle(value, this.props.sdk.parameters.installation.brandName)
    });
  };

  onMetaChange = value => {
    if (value) {
      this.setState({ meta: value });
    } else {
      this.setState(prevState => ({
        meta: prevState.exampleMeta
      }));
    }
  };

  onUrlChange = value => {
    if (value) {
      this.setState({ url: value });
    } else {
      this.setState({ url: '' });
    }
  };

  // while using manual mode
  onChange = e => {
    const value = e.currentTarget.value;
    this.setState({ value });
    if (this.state.useBrandName) {
      this.props.sdk.field.setValue(
        this.calcFullTitle(value, this.props.sdk.parameters.installation.brandName)
      );
    } else if (value && !this.state.useBrandName) {
      this.props.sdk.field.setValue(value);
    } else {
      this.props.sdk.field.removeValue();
    }
  };

  handleToggle = () =>
    this.setState(
      prevState => ({ useBrandName: !prevState.useBrandName }),
      () => this.onChange({ currentTarget: { value: this.state.value } })
    );

  render() {
    return (
      <>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <TextInput
            width="large"
            type="text"
            id="title-assistant-input"
            testId="title-assistant-input"
            value={
              this.state.useBrandName
                ? this.state.value
                : this.extractTitleFromFullTitle(
                    this.props.sdk.field.getValue(),
                    this.props.sdk.parameters.installation.brandName
                  ) || ''
            }
            onChange={this.onChange}
          />
          <Switch
            id="title-assistant-switch"
            labelText="Append brand name"
            isChecked={this.state.useBrandName}
            onToggle={this.handleToggle}
          />
        </div>

        <div style={{ margin: '10px 0', fontFamily: 'Roboto, Lato, sans-serif', width: '600px' }}>
          <div
            style={{
              lineHeight: '1.5',
              width: '600px',
              height: '27px'
            }}
            className="title-preview-container">
            <div
              style={{
                color: '#1a0dab',
                whiteSpace: 'nowrap',
                fontSize: '18px'
              }}
              className="title-preview">
              {this.props.sdk.field.getValue()}
            </div>
          </div>
          <div
            style={{ fontSize: '14px', color: '#006621', fontFamily: 'Roboto, Lato, sans-serif' }}
            className="url-preview">
            {`${this.state.urlStub}/${this.state.url}`}
          </div>
          <div
            style={{ fontSize: '13px', lineHeight: '18px' }}
            className="meta-description-preview">
            {this.state.meta}
          </div>
        </div>
        <HelpText>
          Current title length:{' '}
          <span
            className={
              this.props.sdk.field.getValue() &&
              this.props.sdk.field.getValue().length >
                (this.props.sdk.parameters.installation.titleMaxLength || 60)
                ? 'f36-color--negative'
                : 'f36-color--positive'
            }>
            {this.props.sdk.field.getValue() && this.props.sdk.field.getValue().length > 0
              ? this.props.sdk.field.getValue().length
              : 0}{' '}
            characters
          </span>
        </HelpText>
        <TextLink
          href="https://moz.com/learn/seo/title-tag"
          target="_blank"
          icon="ExternalLink"
          linkType="primary">
          See Title SEO Guidelines
        </TextLink>
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
