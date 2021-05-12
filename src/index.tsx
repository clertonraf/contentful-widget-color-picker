import * as React from 'react';
import { render } from 'react-dom';
import { Card } from '@contentful/forma-36-react-components';
import { init, FieldExtensionSDK } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import './index.css';
import { ColorSet } from './color-config';
import CardHeading from './card-heading';
import BackgroundColorTable from './background-color-table';
import BackgroundColorTableBase from './background-color-table-base';

interface AppProps {
  sdk: FieldExtensionSDK;
}

const App = ({ sdk }: AppProps) => {
  const [value, setValue] = React.useState<string>(sdk.field.getValue() || '');
  
  const detachExternalChangeHandler = React.useRef<Function | null>(null);
  
  const onExternalChange = (value: string) => setValue(value);

  const onClick = async (event: ColorSet) => {
    setValue(event.hexCode);
    if (event) {
      await sdk.field.setValue(event.hexCode);
    } else {
      await sdk.field.removeValue();
    }
  };

  React.useEffect(() => {
    sdk.window.startAutoResizer();
    detachExternalChangeHandler.current = sdk.field.onValueChanged(onExternalChange);
    return detachExternalChangeHandler.current();
  },[]);

  return (
    <div>
      <Card>
        <CardHeading value={value} />
        <BackgroundColorTableBase value={value} onClick={onClick} />
        <BackgroundColorTable value={value} onClick={onClick} />
      </Card>
    </div>
  );
}

init(sdk => {
  render(<App sdk={sdk as FieldExtensionSDK} />, document.getElementById('root'));
});

/**
 * By default, iframe of the extension is fully reloaded on every save of a source file.
 * If you want to use HMR (hot module reload) instead of full reload, uncomment the following lines
 */
if (module.hot) {
  module.hot.accept();
}
