import React from 'react';
import { shallow } from 'enzyme';
import { findByTestId, checkProps } from '../../testUtils';

import { VirtualScroller as Component } from './VirtualScroller';

const setUp = (props = {}) => {
  const enzymeWrapper = shallow(<Component {...props} />);
  return {
    props,
    enzymeWrapper,
  };
};

/* ********************
    VIRTUAL SCROLLER
******************** */
describe('<VirtualScroller />', () => {
  /* ********************
      CHECK PROPTYPES
  ******************** */
  describe('Check PropTypes', () => {
    it('should not throw a warning', () => {
      const expectedProps = {
        items: [
          { id_str: '0123456789' },
          { id_str: '1234567890' },
          { id_str: '2345678901' },
        ],
        getNewData: jest.fn(),
      };

      expect(checkProps(Component, expectedProps)).toBeUndefined();
    });
  });

  /* ********************
         COMPONENT
  ******************** */
  describe('Component', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {
        items: [
          { id_str: '0123456789' },
          { id_str: '1234567890' },
          { id_str: '2345678901' },
        ],
        getNewData: jest.fn(),
      };

      const { enzymeWrapper, props } = setUp(initialProps);

      wrapper = enzymeWrapper;
      passedProps = props;
    });

    /* ********************
      COMPONENT DID MOUNT
    ******************** */
    describe('componentDidMount()', () => {
      it('should set state, call loadItems(), and add a scroll listener', () => {
        const loadItems = (wrapper.instance().loadItems = jest.fn());
        const addEventListener = (global.addEventListener = jest.fn());
        const expectedState = {
          0: {
            id_str: '0123456789',
            index: 0,
          },
          1: {
            id_str: '1234567890',
            index: 1,
          },
          2: {
            id_str: '2345678901',
            index: 2,
          },
        };

        wrapper.instance().componentDidMount();
        expect(wrapper.state().items).toEqual(expectedState);
        expect(loadItems).toHaveBeenCalledTimes(1);
        expect(addEventListener).toHaveBeenCalledTimes(1);
        expect(addEventListener).toHaveBeenCalledWith(
          'scroll',
          wrapper.instance().onScroll,
          false,
        );
      });
    });

    /* ********************
      COMPONENT DID UPDATE
    ******************** */
    describe('componentDidUpdate()', () => {
      it('should set state and call loadItems() if props changed', () => {
        const state = () => wrapper.state();
        const props = () => wrapper.instance().props;
        const loadItems = (wrapper.instance().loadItems = jest.fn());

        const prevProps = props();
        const prevState = state();

        // Same props -> no change
        wrapper.instance().componentDidUpdate(prevProps);
        expect(state()).toEqual(prevState);
        expect(loadItems).toHaveBeenCalledTimes(0);

        let expectedState = prevState;
        expectedState.items[3] = {
          id_str: '3456789012',
          index: 3,
        };

        // Automatically calls componentDidUpdate()
        // Different props -> change
        wrapper.setProps({
          items: [
            ...props().items,
            {
              id_str: '3456789012',
            },
          ],
        });

        expect(state()).toEqual(expectedState);
        expect(loadItems).toHaveBeenCalledTimes(1);
      });
    });

    /* ********************
     COMPONENT WILL UNMOUNT
    ******************** */
    describe('componentWillUnmount()', () => {
      it('should remove scroll listener', () => {
        const removeEventListener = (global.removeEventListener = jest.fn());

        wrapper.instance().componentWillUnmount();
        expect(removeEventListener).toHaveBeenCalledTimes(1);
        expect(removeEventListener).toHaveBeenCalledWith(
          'scroll',
          wrapper.instance().onScroll,
          false,
        );
      });
    });

    /* ********************
           ON SCROLL
    ******************** */
    describe('onScroll()', () => {
      it('should set state if scrolling direction has changed', () => {
        const prevScroll = a => (wrapper.instance().prevScroll = a);
        const scrollY = b => (global.scrollY = b);
        const isScrollUp = c => wrapper.setState({ isScrollUp: c });

        const scroll = (a, b, c) => {
          prevScroll(a);
          scrollY(b);
          isScrollUp(c);
          wrapper.instance().onScroll();
        };

        // scrollY - prevScroll > 0 && isScrollUp -> set state false
        scroll(0, 100, true);
        expect(wrapper.state().isScrollUp).toBeFalsy();

        // scrollY - prevScroll > 0 && !isScrollUp -> no change
        scroll(0, 100, false);
        expect(wrapper.state().isScrollUp).toBeFalsy();

        // scrollY - prevScroll < 0 && isScrollUp -> no change
        scroll(100, 0, true);
        expect(wrapper.state().isScrollUp).toBeTruthy();

        // scrollY - prevScroll < 0 && !isScrollUp -> set state true
        scroll(100, 0, false);
        expect(wrapper.state().isScrollUp).toBeTruthy();
      });

      it('should call loadItems() if all conditions are met', () => {
        const scrollY = a => (global.scrollY = a);
        const spaceAbove = b => wrapper.setState({ spaceAbove: b });
        const innerHeight = c => (global.innerHeight = c);
        const isScrollUp = d => wrapper.setState({ isScrollUp: d });

        const scroll = (a, b, c, d) => {
          scrollY(a);
          spaceAbove(b);
          innerHeight(c);
          isScrollUp(d);
          wrapper.instance().onScroll();
        };

        const loadItems = (wrapper.instance().loadItems = jest.fn());

        // scrollY > (spaceAbove + innerHeight) && isScrollUp -> no call
        scroll(3, 1, 1, true);
        expect(loadItems).toHaveBeenCalledTimes(0);

        // scrollY > (spaceAbove + innerHeight) && !isScrollUp -> no call
        scroll(3, 1, 1, false);
        expect(loadItems).toHaveBeenCalledTimes(0);

        // scrollY < (spaceAbove + innerHeight) && !isScrollUp -> no call
        scroll(0, 1, 1, false);
        expect(loadItems).toHaveBeenCalledTimes(0);

        // scrollY < (spaceAbove + innerHeight) && isScrollUp -> call loadItems()
        scroll(0, 1, 1, true);
        expect(loadItems).toHaveBeenCalledTimes(1);
      });

      it('should set prevScroll to offset', () => {
        wrapper.instance().prevScroll = 0;

        global.scrollY = 100;

        wrapper.instance().onScroll();
        expect(wrapper.instance().prevScroll).toEqual(100);
      });

      it('should call getNewItems if all conditions are met', () => {
        const node = a => (wrapper.instance().node = a);
        const isLoadingNew = b => wrapper.setState({ isLoadingNew: b });
        const scrollY = c => (global.scrollY = c);
        const innerHeight = d => (global.innerHeight = d);
        const height = e =>
          (wrapper.instance().node = {
            getBoundingClientRect: () => {
              return {
                height: e,
              };
            },
          });

        const scroll = (a, b, c, d, e) => {
          node(a);
          isLoadingNew(b);
          c && scrollY(c);
          d && innerHeight(d);
          e && height(e);
          wrapper.instance().onScroll();
        };

        const getNewItems = (wrapper.instance().getNewItems = jest.fn());

        // !node && !isLoadingNew -> break
        scroll(false, false);
        expect(getNewItems).toHaveBeenCalledTimes(0);

        // !node && isLoadingNew -> break
        scroll(false, true);
        expect(getNewItems).toHaveBeenCalledTimes(0);

        // node && isLoadingNew -> break
        scroll(true, true);
        expect(getNewItems).toHaveBeenCalledTimes(0);

        // node && !isLoadingNew -> continue
        // scrollY + innerHeight < height - 300 -> call loadNewItems()
        scroll(true, false, 0, 0, 500);
        expect(getNewItems).toHaveBeenCalledTimes(0);

        // node && !isLoadingNew -> continue
        // scrollY + innerHeight === height - 300 -> call loadNewItems()
        scroll(true, false, 100, 100, 500);
        expect(getNewItems).toHaveBeenCalledTimes(1);

        // node && !isLoadingNew -> continue
        // scrollY + innerHeight > height - 300 -> call loadNewItems()
        scroll(true, false, 100, 100, 400);
        expect(getNewItems).toHaveBeenCalledTimes(2);
      });
    });

    /* ********************
         GET NEW ITEMS
    ******************** */
    describe('getNewItems()', () => {
      it('should set state and call getNewData with correct param', () => {
        wrapper.setState({
          items: {
            0: { id_str: '0123456789' },
            1: { id_str: '1234567890' },
            2: { id_str: '2345678901' },
          },
          isLoadingNew: false,
        });

        const getNewData = passedProps.getNewData;
        const expectedParam = wrapper.state().items[2].id_str;

        expect(getNewData).toHaveBeenCalledTimes(0);

        wrapper.instance().getNewItems();
        expect(wrapper.state().isLoadingNew).toBeTruthy();
        expect(getNewData).toHaveBeenCalledTimes(1);
        expect(getNewData).toHaveBeenCalledWith(expectedParam);
      });
    });

    /* ********************
           LOAD ITEMS
    ******************** */
    describe('loadItems()', () => {
      it('should set state based on calculated values', () => {
        const scrollY = a => (global.scrollY = a);
        const innerHeight = b => (global.innerHeight = b);

        const loadItems = (a, b) => {
          scrollY(a);
          innerHeight(b);
          wrapper.instance().loadItems();
        };

        const testState = (c, d, e, f, g) => {
          expect(state().hasMoreItems).toEqual(c);
          expect(state().startIndex).toEqual(d);
          expect(state().endIndex).toEqual(e);
          expect(state().spaceAbove).toEqual(f);
          expect(state().spaceBelow).toEqual(g);
        };

        const state = () => wrapper.state();
        const reset = () =>
          wrapper.setState({
            hasMoreItems: true,
            startIndex: 0,
            endIndex: 0,
            spaceAbove: 0,
            spaceBelow: 0,
          });

        /* ********************************
           EACH ITEM HEIGHT DEFAULT TO 400 
         ******************************** */

        // All items fit
        reset();
        wrapper.setState({
          items: {
            0: { id_str: '0123456789' },
            1: { id_str: '1234567890' },
            2: { id_str: '2345678901' },
          },
        });

        // 400 innerHeight = 1200 total height
        loadItems(
          0, // scrollY
          400, // innerHeight ( prints value * 3 total height )
        );
        testState(
          false, // hasMoreItems
          0, // startIndex
          3, // endIndex ( exclusive -> +1 actual value )
          0, // spaceAbove
          300, // spaceBelow ( base 300 )
        );

        // Space below
        reset();
        wrapper.setState({
          items: {
            0: { id_str: '0123456789' },
            1: { id_str: '1234567890' },
            2: { id_str: '2345678901' },
            3: { id_str: '3456789012' },
            4: { id_str: '4567890123' },
          },
        });

        // 400 innerHeight = 1200 total height
        loadItems(
          0, // scrollY
          400, // innerHeight ( prints value * 3 total height )
        );
        testState(
          true, // hasMoreItems
          0, // startIndex
          3, // endIndex ( exclusive -> +1 actual value )
          0, // spaceAbove
          1100, // spaceBelow ( base 300 )
        );

        // Space above and below
        reset();
        wrapper.setState({
          items: {
            0: { id_str: '0123456789' },
            1: { id_str: '1234567890' },
            2: { id_str: '2345678901' },
            3: { id_str: '3456789012' },
            4: { id_str: '4567890123' },
          },
        });

        // 400 innerHeight = 1200 total height
        loadItems(
          800, // scrollY
          400, // innerHeight ( prints value * 3 total height )
        );
        testState(
          true, // hasMoreItems
          1, // startIndex
          4, // endIndex ( exclusive -> +1 actual value )
          400, // spaceAbove
          700, // spaceBelow ( base 300 )
        );

        // Space above
        reset();
        wrapper.setState({
          items: {
            0: { id_str: '0123456789' },
            1: { id_str: '1234567890' },
            2: { id_str: '2345678901' },
            3: { id_str: '3456789012' },
            4: { id_str: '4567890123' },
          },
        });

        // 400 innerHeight = 1200 total height
        loadItems(
          1200, // scrollY
          400, // innerHeight ( prints value * 3 total height )
        );
        testState(
          false, // hasMoreItems
          2, // startIndex
          5, // endIndex ( exclusive -> +1 actual value )
          800, // spaceAbove
          300, // spaceBelow ( base 300 )
        );

        /* ********************************
                VARYING ITEM HEIGHT 
         ******************************** */

        // All items fit
        reset();
        wrapper.setState({
          items: {
            0: { id_str: '0123456789', itemHeight: 300 },
            1: { id_str: '1234567890', itemHeight: 500 },
            2: { id_str: '2345678901' },
          },
        });

        // 400 innerHeight = 1200 total height
        loadItems(
          0, // scrollY
          400, // innerHeight ( prints value * 3 total height )
        );
        testState(
          false, // hasMoreItems
          0, // startIndex
          3, // endIndex ( exclusive -> +1 actual value )
          0, // spaceAbove
          300, // spaceBelow ( base 300 )
        );

        // Space below
        reset();
        wrapper.setState({
          items: {
            0: { id_str: '0123456789', itemHeight: 250 },
            1: { id_str: '1234567890', itemHeight: 368 },
            2: { id_str: '2345678901' },
            3: { id_str: '3456789012', itemHeight: 650 },
            4: { id_str: '4567890123' },
          },
        });

        // 400 innerHeight = 1200 total height
        loadItems(
          0, // scrollY
          400, // innerHeight ( prints value * 3 total height )
        );
        testState(
          true, // hasMoreItems
          0, // startIndex
          4, // endIndex ( exclusive -> +1 actual value )
          0, // spaceAbove
          700, // spaceBelow ( base 300 )
        );

        // Space above and below
        reset();
        wrapper.setState({
          items: {
            0: { id_str: '0123456789', itemHeight: 600 },
            1: { id_str: '1234567890', itemHeight: 540 },
            2: { id_str: '2345678901' },
            3: { id_str: '3456789012', itemHeight: 650 },
            4: { id_str: '4567890123' },
          },
        });

        // 400 innerHeight = 1200 total height
        loadItems(
          635, // scrollY
          400, // innerHeight ( prints value * 3 total height )
        );
        testState(
          true, // hasMoreItems
          1, // startIndex
          4, // endIndex ( exclusive -> +1 actual value )
          600, // spaceAbove
          700, // spaceBelow ( base 300 )
        );

        // Space above
        reset();
        wrapper.setState({
          items: {
            0: { id_str: '0123456789', itemHeight: 300 },
            1: { id_str: '1234567890', itemHeight: 500 },
            2: { id_str: '2345678901' },
            3: { id_str: '3456789012', itemHeight: 650 },
            4: { id_str: '4567890123' },
          },
        });

        // 400 innerHeight = 1200 total height
        loadItems(
          742, // scrollY
          400, // innerHeight ( prints value * 3 total height )
        );
        testState(
          false, // hasMoreItems
          2, // startIndex
          5, // endIndex ( exclusive -> +1 actual value )
          800, // spaceAbove
          300, // spaceBelow ( base 300 )
        );
      });
    });

    /* ********************
        CALC ITEM HEIGHT
    ******************** */
    describe('calcItemHeight()', () => {
      it('should update state with items height', () => {
        const e = {
          getBoundingClientRect: () => {
            return { height: 625 };
          },
        };

        wrapper.setState({
          items: {
            0: { id_str: '0123456789' },
            1: { id_str: '1234567890' },
            2: { id_str: '2345678901' },
          },
        });

        let expectedState = {
          0: { id_str: '0123456789', itemHeight: 625 },
          1: { id_str: '1234567890' },
          2: { id_str: '2345678901' },
        };

        wrapper.instance().calcItemHeight(e, 0);
        expect(wrapper.state().items).toEqual(expectedState);

        expectedState = {
          0: { id_str: '0123456789', itemHeight: 625 },
          1: { id_str: '1234567890' },
          2: { id_str: '2345678901', itemHeight: 625 },
        };

        wrapper.instance().calcItemHeight(e, 2);
        expect(wrapper.state().items).toEqual(expectedState);
      });
    });

    /* ********************
            RENDER
    ******************** */
    describe('render()', () => {
      it('should render without errors', () => {
        expect(findByTestId(wrapper, 'VirtualScroller').length).toEqual(1);
      });

      it('should not render if there are no items', () => {
        wrapper.setState({
          items: {},
          startIndex: 0,
          endIndex: 0,
        });

        expect(wrapper.instance().render()).toBeNull();
      });

      it('should render with styles corresponding to state', () => {
        const virtualScroller = () => findByTestId(wrapper, 'VirtualScroller');
        const styles = () => virtualScroller().props().style;

        wrapper.setState({
          spaceAbove: 400,
          spaceBelow: 600,
        });

        wrapper.instance().render();
        expect(virtualScroller().length).toEqual(1);
        expect(styles().paddingTop).toEqual(wrapper.state().spaceAbove);
        expect(styles().paddingBottom).toEqual(wrapper.state().spaceBelow);

        wrapper.setState({
          spaceAbove: 900,
          spaceBelow: 1200,
        });

        wrapper.instance().render();
        expect(virtualScroller().length).toEqual(1);
        expect(styles().paddingTop).toEqual(wrapper.state().spaceAbove);
        expect(styles().paddingBottom).toEqual(wrapper.state().spaceBelow);
      });

      it('should render <InfiniteScroll /> with correct props', () => {
        const infiniteScroll = findByTestId(wrapper, 'InfiniteScroll');

        const props = infiniteScroll.props();

        expect(infiniteScroll.length).toEqual(1);
        expect(props.loadMore).toEqual(wrapper.instance().loadItems);
        expect(props.hasMore).toEqual(wrapper.state().hasMoreItems);
      });

      it('should render <TweetContainer /> based on state, with correct props', () => {
        const tweetContainer = () => findByTestId(wrapper, 'TweetContainer');

        // No Items -> no render
        wrapper.setState({
          items: {},
          startIndex: 0,
          endIndex: 0,
        });

        wrapper.instance().render();
        expect(tweetContainer().length).toEqual(0);

        // 3 items, endIndex = 3 (exclusive) -> render 0 - 2
        wrapper.setState({
          items: {
            0: { id_str: '0123456789' },
            1: { id_str: '1234567890' },
            2: { id_str: '2345678901' },
          },
          startIndex: 0,
          endIndex: 3,
        });

        wrapper.instance().render();
        expect(tweetContainer().length).toEqual(3);

        // 4 items, endIndex = 3 (exclusive) -> render 0 - 2
        wrapper.setState({
          items: {
            0: { id_str: '0123456789' },
            1: { id_str: '1234567890' },
            2: { id_str: '2345678901' },
            3: { id_str: '3456789012' },
          },
          startIndex: 0,
          endIndex: 3,
        });

        wrapper.instance().render();
        expect(tweetContainer().length).toEqual(3);

        // Check props
        tweetContainer().forEach((tweet, i) => {
          expect(tweet.props().data).toEqual(wrapper.state().items[i]);
          expect(tweet.props().calcItemHeight).toEqual(
            wrapper.instance().calcItemHeight,
          );
        });
      });
    });
  });
});
