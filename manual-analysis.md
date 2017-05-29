# Manual Analysis

How about an example. Say you are building a photo gallery website using React and bundling it together with webpage. Here are 4 files you might have:

- index.js
- big-photo.js
- react-dom
- reactjs/react-modal

and here is a snippet of each, describing how these files might work:

```javascript
# index.js

import React from 'react';
import PhotoModal from './photo-modal.js';

class Page extends React.Component {
  render() {
    return (
      <div>
        <PhotoModal photo={this.state.selectedPhoto} />
        {photos.map((photo) =>
          <button onClick={(e) => this.onClickPhoto(photo)}>
            <img
              width={photo.thumb.width}
              height={photo.thumb.height}
              src={photo.thumb.src}
              alt={photo.alt}
            />
          </button>
        )}
      </div>
    );
  }

  onClickPhoto(photo) {
    this.setState({
      selectedPhoto: photo,
    });
  }
}
```
