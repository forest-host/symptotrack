import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { count, spots } from './mockdata';

export default function mock(useMock) {
  if (useMock) {
    // This sets the mock adapter on the default instance
    const mock = new MockAdapter(axios);

    mock
      // Mock GET requests
      .onGet('data/spots')
      .reply(200, spots)

      .onGet('data/count')
      .reply(200, count)

      // Let unmatched requests through
      .onAny()
      .passThrough();
  }
}
