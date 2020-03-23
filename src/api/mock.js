import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

export default function mock(useMock) {
  if (useMock) {
    // This sets the mock adapter on the default instance
    const mockApi = new MockAdapter(axios);

    mockApi
      // Let unmatched requests through
      .onAny()
      .passThrough();
  }
}
