import * as React from 'react';
import ReactDOMServer from 'react-dom/server';
import { View } from 'react-native-web';

import Markdown from './index';

// ![image](https://fm.cnbc.com/applications/cnbc.com/resources/img/editorial/2018/01/10/104938454-_Y2A0131.1910x1000.JPG)


//   [google.com](https://www.google.com)

const markdownStyles = {
  link: {
    fontSize: 100,
  },
}

const html = ReactDOMServer.renderToStaticMarkup(
  <View>
    <Markdown
      debug
      markdownStyles={markdownStyles}
    >
      **[test](https://google.com)**
    </Markdown>
  </View>
);


console.log(html);
