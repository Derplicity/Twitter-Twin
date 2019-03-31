import moxios from 'moxios';
import storeConfig from '../storeConfig';
import { getSuggestedUsers } from '../actions/userActions';

describe('getSuggestedUsers', () => {
	beforeEach(() => {
		moxios.install();
	});

	afterEach(() => {
		moxios.uninstall();
	});

	it('should update store correctly', () => {
		const expectedState = [
			{
				name: 'John',
				screen_name: 'johnsmith',
				profile_image_url_https:
					'http://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder-350x350.png',
				verified: true,
			},
			{
				name: 'Adam',
				screen_name: 'adamwright',
				profile_image_url_https:
					'http://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder-350x350.png',
				verified: false,
			},
		];

		const store = storeConfig();

		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200,
				response: expectedState,
			});
		});

		return store.dispatch(getSuggestedUsers()).then(() => {
			const newState = store.getState();
			expect(newState.user.suggested_users).toEqual(expectedState);
		});
	});
});
