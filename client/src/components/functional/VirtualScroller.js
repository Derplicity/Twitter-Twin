import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';

import TweetContainer from '../container/Tweet';

const propTypes = {
  items: PropTypes.arrayOf(PropTypes.object.isRequired),
  getNewData: PropTypes.func.isRequired,
};

const defaultProps = {
  items: [{}],
  getNewData: () => null,
};

class VirtualScroller extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: {},
      hasMoreItems: true,
      spaceBelow: 0,
      spaceAbove: 0,
      startIndex: 0,
      endIndex: 0,
      isScrollUp: false,
      isLoadingNew: false,
    };

    this.prevScroll = 0;

    this.onScroll = this.onScroll.bind(this);
    this.getNewItems = this.getNewItems.bind(this);
    this.loadItems = this.loadItems.bind(this);
    this.calcItemHeight = this.calcItemHeight.bind(this);
  }

  componentDidMount() {
    const { items: itemsArr } = this.props;

    let items = {};

    itemsArr.map((item, i) => {
      items[i] = item;
      items[i].index = i;
      return item;
    });

    this.setState(
      {
        items,
      },
      () => this.loadItems(),
    );

    window.addEventListener('scroll', this.onScroll, false);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.items !== prevProps.items) {
      const { items: itemsArr } = this.props;

      let items = {};

      itemsArr.map((item, i) => {
        items[i] = item;
        items[i].index = i;
        return item;
      });

      this.setState(
        {
          items,
          isLoadingNew: false,
        },
        () => this.loadItems(),
      );
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  async onScroll(e) {
    const { isScrollUp, spaceAbove, isLoadingNew } = this.state;
    const offset = window.scrollY;
    const dif = offset - this.prevScroll;
    if (dif > 0 && isScrollUp) {
      this.setState({
        isScrollUp: false,
      });
    } else if (dif < 0 && !isScrollUp) {
      this.setState({
        isScrollUp: true,
      });
    }

    if (window.scrollY < spaceAbove + window.innerHeight && isScrollUp) {
      await this.loadItems();
    }

    this.prevScroll = offset;

    if (this.node && !isLoadingNew) {
      if (
        window.scrollY + window.innerHeight >=
        this.node.getBoundingClientRect().height - 300
      ) {
        this.getNewItems();
      }
    }
  }

  getNewItems() {
    const { items } = this.state;
    this.setState(
      {
        isLoadingNew: true,
      },
      () => {
        this.props.getNewData(items[Object.keys(items).length - 1].id_str);
      },
    );
  }

  loadItems() {
    const { items } = this.state;

    const offset = window.scrollY - window.innerHeight;
    let startIndex = 0;
    let spaceAbove = 0;

    while (spaceAbove < offset) {
      if (startIndex >= Object.keys(items).length) break;

      const item = items[startIndex];
      const itemHeight = item.itemHeight;

      spaceAbove += itemHeight ? itemHeight : 400;
      startIndex++;
    }

    let endIndex = startIndex;
    let heightLoaded = spaceAbove;
    const heightToLoad = heightLoaded + window.innerHeight * 3;

    while (heightLoaded < heightToLoad) {
      if (endIndex >= Object.keys(items).length) break;

      const item = items[endIndex];
      const itemHeight = item.itemHeight;

      heightLoaded += itemHeight ? itemHeight : 400;
      endIndex++;
    }

    if (endIndex < Object.keys(items).length) {
      endIndex++;
    }

    let spaceBelowIdx = endIndex;
    let spaceBelow = 300;

    while (spaceBelowIdx < Object.keys(items).length) {
      const item = items[spaceBelowIdx];
      const itemHeight = item.itemHeight;

      spaceBelow += itemHeight ? itemHeight : 400;
      spaceBelowIdx++;
    }

    this.setState({
      hasMoreItems: Object.keys(items).length > endIndex,
      startIndex,
      endIndex,
      spaceAbove,
      spaceBelow,
    });
  }

  calcItemHeight(e, i) {
    const { items } = this.state;

    const item = items[i];
    const itemHeight = e.getBoundingClientRect().height;

    item.itemHeight = itemHeight;

    this.setState({
      items,
    });
  }

  render() {
    const {
      items,
      hasMoreItems,
      spaceAbove,
      spaceBelow,
      startIndex,
      endIndex,
    } = this.state;

    let itemFeed = [];

    for (let i = startIndex; i < endIndex; i++) {
      itemFeed.push(
        <TweetContainer
          data={items[i]}
          calcItemHeight={this.calcItemHeight}
          key={items[i].id_str}
        />,
      );
    }

    return Object.keys(items).length !== 0 ? (
      <div
        ref={node => (this.node = node)}
        style={{
          paddingTop: spaceAbove,
          paddingBottom: spaceBelow,
        }}
      >
        <InfiniteScroll loadMore={this.loadItems} hasMore={hasMoreItems}>
          {itemFeed}
        </InfiniteScroll>
      </div>
    ) : null;
  }
}

VirtualScroller.propTypes = propTypes;
VirtualScroller.defaultProps = defaultProps;

export default VirtualScroller;
