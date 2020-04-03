import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { count, spots, edit } from './mockdata';

export default function mock(useMock) {
  if (useMock) {
    // This sets the mock adapter on the default instance
    const mock = new MockAdapter(axios);

    function route(path = '') {
      return typeof path === 'string' ? new RegExp(path.replace(/:\w+/g, '[^/]+')) : path;
    }

    mock
      // Mock GET requests
      .onGet('data/spots')
      .reply(200, spots)

      .onGet('data/counts')
      .reply(200, count)

      .onGet(route('responses/:type/:id'))
      .reply(200, edit)

      // Let unmatched requests through
      .onAny()
      .passThrough();
  }
}
