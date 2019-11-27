import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Lottie from 'react-lottie';
import { Textarea, Button, HelpText } from '@contentful/forma-36-react-components';
import { init } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import './index.css';

export class App extends React.Component {
  static propTypes = {
    sdk: PropTypes.object.isRequired
  };

  detachExternalChangeHandler = null;
  constructor(props) {
    super(props);
    this.state = {
      value: props.sdk.field.getValue() || '',
      animation: props.sdk.field.getValue() || initialAnimation,
      error: null
    };
  }

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
    if (value === undefined) return;
    this.setState({ value: JSON.stringify(value) }, () => {
      try {
        this.setState({ animation: value, error: null });
      } catch (error) {
        this.setState({ error: 'Something went wrong', animation: initialAnimation });
      }
    });
  };

  onChange = e => {
    const value = e.currentTarget.value;
    this.setState({ value, error: null }, () => {
      try {
        this.props.sdk.field.setValue(JSON.parse(value));
      } catch (err) {
        this.setState({ animation: initialAnimation, error: 'Unable to parse JSON' });
      }
    });
  };

  render() {
    return (
      <>
        <Textarea
          width="large"
          type="text"
          id="lottie-json"
          testId="lottie-json"
          value={this.state.value}
          onChange={this.onChange}
        />
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: this.state.animation,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice'
            }
          }}
          height={400}
          width={400}
          isStopped={this.state.isStopped}
          isPaused={this.state.isPaused}
        />
        {this.state.error ? <HelpText>{this.state.error}</HelpText> : ''}
        <Button onClick={() => this.setState({ isStopped: true })}>stop</Button>
        <Button onClick={() => this.setState({ isStopped: false })}>play</Button>
        <Button onClick={() => this.setState({ isPaused: !this.state.isPaused })}>pause</Button>
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

const initialAnimation = {
  v: '4.6.9',
  fr: 29.9700012207031,
  ip: 0,
  op: 34.0000013848484,
  w: 800,
  h: 600,
  nm: 'Loader',
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: 'Shape Layer 2',
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [400, 300, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] }
      },
      ao: 0,
      shapes: [
        {
          ty: 'gr',
          it: [
            {
              ind: 0,
              ty: 'sh',
              ix: 1,
              ks: {
                a: 0,
                k: {
                  i: [
                    [36.812, 0],
                    [0, -19.33],
                    [-19.33, 0],
                    [-37.125, 0],
                    [0, -19.33],
                    [19.33, 0]
                  ],
                  o: [
                    [-19.33, 0],
                    [0, 19.33],
                    [36.688, 0],
                    [19.33, 0],
                    [0, 19.33],
                    [-37.25, 0]
                  ],
                  v: [
                    [-44.844, -35],
                    [-79.844, 0],
                    [-44.844, 35],
                    [44.844, -35],
                    [79.844, 0],
                    [44.844, 35]
                  ],
                  c: true
                }
              },
              nm: 'Path 1',
              mn: 'ADBE Vector Shape - Group'
            },
            {
              ty: 'st',
              c: { a: 0, k: [0.105882, 0.105882, 0.105882, 1] },
              o: { a: 0, k: 100 },
              w: { a: 0, k: 12 },
              lc: 1,
              lj: 1,
              ml: 4,
              nm: 'Stroke 1',
              mn: 'ADBE Vector Graphic - Stroke'
            },
            {
              ty: 'tr',
              p: { a: 0, k: [0, 0], ix: 2 },
              a: { a: 0, k: [0, 0], ix: 1 },
              s: { a: 0, k: [100, 100], ix: 3 },
              r: { a: 0, k: 0, ix: 6 },
              o: { a: 0, k: 100, ix: 7 },
              sk: { a: 0, k: 0, ix: 4 },
              sa: { a: 0, k: 0, ix: 5 },
              nm: 'Transform'
            }
          ],
          nm: 'Shape 1',
          np: 3,
          cix: 2,
          ix: 1,
          mn: 'ADBE Vector Group'
        },
        {
          ty: 'tm',
          s: {
            a: 1,
            k: [
              {
                i: { x: [0], y: [1] },
                o: { x: [0.167], y: [0.167] },
                n: ['0_1_0p167_0p167'],
                t: 5.834,
                s: [0],
                e: [20]
              },
              {
                i: { x: [0.833], y: [0.833] },
                o: { x: [0.167], y: [0.167] },
                n: ['0p833_0p833_0p167_0p167'],
                t: 17.11,
                s: [20],
                e: [20]
              },
              {
                i: { x: [0.611], y: [1] },
                o: { x: [0.167], y: [0.167] },
                n: ['0p611_1_0p167_0p167'],
                t: 23.334,
                s: [20],
                e: [40]
              },
              { t: 35.0000014255792 }
            ],
            ix: 1
          },
          e: {
            a: 1,
            k: [
              {
                i: { x: [0], y: [1] },
                o: { x: [0.167], y: [0.167] },
                n: ['0_1_0p167_0p167'],
                t: 0,
                s: [12],
                e: [32]
              },
              {
                i: { x: [0.833], y: [0.833] },
                o: { x: [0.167], y: [0.167] },
                n: ['0p833_0p833_0p167_0p167'],
                t: 11.666,
                s: [32],
                e: [32]
              },
              {
                i: { x: [0.5], y: [1] },
                o: { x: [0.167], y: [0.167] },
                n: ['0p5_1_0p167_0p167'],
                t: 17.11,
                s: [32],
                e: [53]
              },
              { t: 29.1662511879657 }
            ],
            ix: 2
          },
          o: {
            a: 1,
            k: [
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.167], y: [0.167] },
                n: ['0p667_1_0p167_0p167'],
                t: 0,
                s: [-22],
                e: [82.925]
              },
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.167], y: [0.167] },
                n: ['0p667_1_0p167_0p167'],
                t: 17.11,
                s: [82.925],
                e: [193]
              },
              { t: 35.0000014255792 }
            ],
            ix: 3
          },
          m: 1,
          ix: 2,
          nm: 'Trim Paths 1',
          mn: 'ADBE Vector Filter - Trim'
        }
      ],
      ip: 0,
      op: 300.00001221925,
      st: 0,
      bm: 0,
      sr: 1
    },
    {
      ddd: 0,
      ind: 3,
      ty: 4,
      nm: 'Shape Layer 1',
      ks: {
        o: { a: 0, k: 25 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [400, 300, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] }
      },
      ao: 0,
      shapes: [
        {
          ty: 'gr',
          it: [
            {
              ind: 0,
              ty: 'sh',
              ix: 1,
              ks: {
                a: 0,
                k: {
                  i: [
                    [36.812, 0],
                    [0, -19.33],
                    [-19.33, 0],
                    [-37.125, 0],
                    [0, -19.33],
                    [19.33, 0]
                  ],
                  o: [
                    [-19.33, 0],
                    [0, 19.33],
                    [36.688, 0],
                    [19.33, 0],
                    [0, 19.33],
                    [-37.25, 0]
                  ],
                  v: [
                    [-44.844, -35],
                    [-79.844, 0],
                    [-44.844, 35],
                    [44.844, -35],
                    [79.844, 0],
                    [44.844, 35]
                  ],
                  c: true
                }
              },
              nm: 'Path 1',
              mn: 'ADBE Vector Shape - Group'
            },
            {
              ty: 'st',
              c: { a: 0, k: [0.105882, 0.105882, 0.105882, 1] },
              o: { a: 0, k: 100 },
              w: { a: 0, k: 12 },
              lc: 1,
              lj: 1,
              ml: 4,
              nm: 'Stroke 1',
              mn: 'ADBE Vector Graphic - Stroke'
            },
            {
              ty: 'tr',
              p: { a: 0, k: [0, 0], ix: 2 },
              a: { a: 0, k: [0, 0], ix: 1 },
              s: { a: 0, k: [100, 100], ix: 3 },
              r: { a: 0, k: 0, ix: 6 },
              o: { a: 0, k: 100, ix: 7 },
              sk: { a: 0, k: 0, ix: 4 },
              sa: { a: 0, k: 0, ix: 5 },
              nm: 'Transform'
            }
          ],
          nm: 'Shape 1',
          np: 3,
          cix: 2,
          ix: 1,
          mn: 'ADBE Vector Group'
        }
      ],
      ip: 0,
      op: 300.00001221925,
      st: 0,
      bm: 0,
      sr: 1
    }
  ]
};
