import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import tiles from './mockdata';

export default function mock(useMock) {
  if (useMock) {
    // This sets the mock adapter on the default instance
    const mock = new MockAdapter(axios);

    mock
      // Mock GET requests
      .onGet('data/tiles', { params: { z: 8 } })
      .reply(200, tiles.eight)

      .onGet('data/tiles', { params: { z: 9 } })
      .reply(200, tiles.nine)

      // Let unmatched requests through
      .onAny()
      .passThrough();
  }
}
