# Manual Analysis

Say you are building a photo gallery website using React and bundling it together with webpa. Here are 4 files you might have:

- photo-list.js
- photo-zoom.js
- react-dom
- reactjs/react-modal

and here is a snippet of each file,

```javascript
# photo-list.js

import React from 'react';
import PhotoZoom from './photo-zoom.js';

export default class PhotoList extends React.Component {
  render() {
    return (
      <div>
        <PhotoZoom photo={this.state.selectedPhoto} />
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


# photo-zoom.js

import React from 'react';
import ReactModal from 'react-modal';

export default class PhotoZoom extends React.Component {
  render() {
    const photo = this.props.photo;
    const hasPhoto = photo !== null;
    return (
      <ReactModal
        isOpen={hasPhoto}>
        <img
          width={photo.full.width}
          height={photo.full.height}
          src={photo.full.src}
          alt={photo.alt}
        />
      </ReactModal>
    );
  }
}
```

We can see that, if no photo is picked the PhotoZoom component will render ReactModal with `isOpen=false`, so nothing gets displayed. `photo-zoom.js` itself is a really small file, so it might not seem like a great win to lazy load it. But if we consider that it's the only module that uses react-modal then all of a sudden one change will result in much more code saved.

In a simple example this is obvious, but in a larger codebase where things are very complex and change very fast using a tool to help with this analysis is invaluable.
