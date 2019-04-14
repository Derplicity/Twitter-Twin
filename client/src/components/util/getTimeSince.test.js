import getTimeSince from './getTimeSince';

/* ********************
     GET TIME SINCE
******************** */
describe('getTimeSince()', () => {
  let testDate;

  beforeEach(() => {
    testDate = new Date('April 14, 2019 05:00:00');
  });

  /* ********************
          SECONDS
  ******************** */
  describe('Seconds', () => {
    it('should return difference in seconds', () => {
      const diff = 3;
      const date = testDate - diff * 1000;
      const expectedOutput = `${diff}s`;

      expect(getTimeSince(date, testDate).since).toEqual(expectedOutput);
    });
  });

  /* ********************
          MINUTES
  ******************** */
  describe('Minutes', () => {
    it('should return difference in minutes', () => {
      const diff = 2;
      const date = testDate - diff * 1000 * 60;
      const expectedOutput = `${diff}m`;

      expect(getTimeSince(date, testDate).since).toEqual(expectedOutput);
    });
  });

  /* ********************
           HOURS
  ******************** */
  describe('Hours', () => {
    it('should return difference in hours', () => {
      const diff = 6;
      const date = testDate - diff * 1000 * 60 * 60;
      const expectedOutput = `${diff}h`;

      expect(getTimeSince(date, testDate).since).toEqual(expectedOutput);
    });
  });

  /* ********************
           DAYS
  ******************** */
  describe('Days', () => {
    it('should return month + day created', () => {
      const diff = 8;
      const date = testDate - diff * 1000 * 60 * 60 * 24;
      const expectedOutput = {
        createdStr: '5:00 AM • Apr 6, 2019',
        since: 'Apr 6',
      };

      expect(getTimeSince(date, testDate)).toEqual(expectedOutput);
    });
  });

  /* ********************
           MONTHS
  ******************** */
  describe('Months', () => {
    it('should return month + day created', () => {
      const diff = 2;
      const date = testDate - diff * 1000 * 60 * 60 * 24 * (365 / 12);
      const expectedOutput = {
        createdStr: '8:00 AM • Feb 12, 2019',
        since: 'Feb 12',
      };

      expect(getTimeSince(date, testDate)).toEqual(expectedOutput);
    });
  });

  /* ********************
             YEARS
    ******************** */
  describe('Years', () => {
    it('should return month + day created', () => {
      const diff = 1;
      const date = testDate - diff * 1000 * 60 * 60 * 24 * 365;
      const expectedOutput = {
        createdStr: '5:00 AM • Apr 14, 2018',
        since: 'Apr 14, 2018',
      };

      expect(getTimeSince(date, testDate)).toEqual(expectedOutput);
    });
  });

  /* ********************
            FUTURE
    ******************** */
  describe('Future instead of past', () => {
    it('should return 0 seconds', () => {
      const date = new Date('April 14, 2020 05:00:00');
      const expectedOutput = {
        createdStr: '5:00 AM • Apr 14, 2020',
        since: '0s',
      };

      expect(getTimeSince(date, testDate)).toEqual(expectedOutput);
    });
  });
});
